#!/bin/zsh

cd -- "$(dirname -- "$0")" || exit 1

if [ ! -d node_modules ]; then
  npm install || exit 1
fi

(sleep 1; open "http://127.0.0.1:5174/") &
npm run dev -- --host 127.0.0.1 --port 5174
