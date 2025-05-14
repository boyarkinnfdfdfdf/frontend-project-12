.PHONY: build start

build:
 cd frontend && npm install && npm run build

start:
 npx chat-server --client-path=./frontend/dist
 