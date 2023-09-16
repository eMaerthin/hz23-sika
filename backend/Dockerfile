FROM python:3.9-alpine

RUN apk add --no-cache curl --repository=http://dl-cdn.alpinelinux.org/alpine/v3.10/main

WORKDIR /opt/app

COPY . .

RUN --mount=type=secret,id=my_env source /run/secrets/my_env

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000

CMD ["python3", "-m", "flask", "run", "--host=0.0.0.0 --port 5000"]
CMD ["sh", "-c", "uvicorn app:app --host 0.0.0.0 --port 5000"]
