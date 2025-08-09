FROM node:22-slim

RUN apt-get update && \
    apt-get install -y git curl sudo bash python3 python3-pip && \
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

# nodeユーザー用のnpmグローバルディレクトリを設定
RUN mkdir -p ~/.npm-global && \
    npm config set prefix '~/.npm-global' && \
    echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc

# Claude Codeをnodeユーザーでインストール
RUN npm install -g @anthropic-ai/claude-code

# Python uvをnodeユーザーでインストール（Serena MCP用）
RUN curl -LsSf https://astral.sh/uv/install.sh | sh

# nodeユーザーのPATHにuvとnpm globalを追加
ENV PATH="/home/node/.npm-global/bin:/home/node/.local/bin:$PATH"
RUN echo 'export PATH="/home/node/.npm-global/bin:/home/node/.local/bin:$PATH"' >> /home/node/.bashrc
