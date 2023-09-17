from langchain.chat_models import ChatOpenAI
from langchain.schema import HumanMessage, SystemMessage
from langchain.agents import OpenAIFunctionsAgent
from langchain.agents import load_tools
from langchain.retrievers import ChatGPTPluginRetriever
from langchain.agents import AgentExecutor
from langchain.tools import AIPluginTool
from langchain.requests import RequestsWrapper
from langchain.agents import create_openapi_agent
from langchain.llms.openai import OpenAI
from langchain.agents.agent_toolkits import OpenAPIToolkit
from langchain.tools.json.tool import JsonSpec
import requests
from langchain.tools import StructuredTool
from langchain.memory import ConversationBufferMemory

from langchain.prompts import MessagesPlaceholder

from langchain.agents import AgentType, initialize_agent

from langchain.agents.agent_toolkits import PlayWrightBrowserToolkit
from langchain.tools.playwright.utils import (
    create_async_playwright_browser,
    create_sync_playwright_browser, # A synchronous browser is available, though it isn't compatible with jupyter.
)
from langchain.agents import initialize_agent, Tool


from dotenv import load_dotenv
import os, yaml

import uvicorn
from fastapi import FastAPI, File, Form, HTTPException, Body, UploadFile
from loguru import logger
from fastapi.middleware.cors import CORSMiddleware

from models.models import (
    UserPrompt, AssistantAnswer
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow requests from all origins (you can restrict this to specific domains)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all HTTP headers
)

load_dotenv()  # take environment variables from .env.
RETRIEVER = ChatGPTPluginRetriever(url="http://0.0.0.0:8080", bearer_token=os.getenv("BEARER_TOKEN"), top_k=10)
references = []

def find_knowledge(input:str) -> str:
    """
    Returns top_k=10 closest matches from the sika database given the user_prompt.
    :param input: user question. The user might be a customer (construction engineer) or sales person
    :return: content of 10 closes matches from the Sika Knowledge database to the given {input}.
    """
    global references
    ret_val = ""
    for i, elem in enumerate(RETRIEVER.get_relevant_documents(input), 1):
        ret_val += f"##Match{i}: {elem.page_content}##\n"
        references.append(f'{elem.metadata["source"]}: {elem.metadata["document_id"]}')
    return ret_val

tools = [
    Tool(
        name="Intermediate Answer",
        func=find_knowledge,
        description="useful for when you need to ask with search",
    )
]
llm = ChatOpenAI(temperature=0, streaming=True, model="gpt-3.5-turbo-16k-0613")

self_ask_with_search = initialize_agent(
    tools, llm, agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION, verbose=True
)
def process_prompt(prompt):
    global references
    references = []
    ret_val = self_ask_with_search.run(prompt)
    return ret_val, list(set(references))


@app.post(
    "/query",
    response_model=AssistantAnswer,
)
async def post_question(
    prompt: UserPrompt
):
    try:
        text, references = process_prompt(prompt)
        return AssistantAnswer(text=text, references=references)
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500, detail=f"str({e})")


def start():
    uvicorn.run("server.main:app", host="0.0.0.0", port=5000, reload=True)

