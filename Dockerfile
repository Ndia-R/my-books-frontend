FROM node:22-slim

RUN apt-get update && \
    apt-get install -y git && \
    rm -rf /var/lib/apt/lists/*

# rootユーザーで作業ディレクトリの所有者とグループを変更
USER root
WORKDIR /workspace
RUN chown node:node /workspace

# npmを最新版に更新
RUN npm install -g npm@latest

# ユーザー変更（イメージの中の既存ユーザー）
USER node

# node_modulesディレクトリはvolumeとしてバインドするので
# そのためのディレクトリをあらかじめ作成しておく
RUN mkdir -p node_modules
