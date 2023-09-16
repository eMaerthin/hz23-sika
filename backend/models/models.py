from pydantic import BaseModel
from typing import List


class UserPrompt(BaseModel):
    prompt: str


class AssistantAnswer(BaseModel):
    text: str
    references: List[str]
