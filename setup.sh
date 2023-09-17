cd backend/chatgpt-retrieval-plugin
docker build -t retrieval .
docker run -p 8080:8080 retrieval &
sleep 30
cd ".."
if [ -f "venv" ];
then
  echo "venv exists"
else
  python -m venv venv
  echo "venv exists"
fi
. venv/bin/activate
# upsert some docs
python upsert_docs.py

uvicorn app:app --host=0.0.0.0 --port=5000 &

#now we can go to frontend
cd "../frontend/"
# brew install npm
npm -i
#BetterChatGPT-main"