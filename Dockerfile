FROM node:22-slim AS development

RUN apt update && \
    apt install -y git curl sudo bash python3 && \
    rm -rf /var/lib/apt/lists/*

# 作業ディレクトリの所有者とグループを変更
WORKDIR /workspace
RUN chown node:node /workspace

# nodeユーザーがパスワードなしでsudoを使えるように設定
# /etc/sudoers.d/nodeファイルを作成し、NOPASSWD: ALL を設定
RUN echo "node ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/node && \
    chmod 0440 /etc/sudoers.d/node

# ユーザー変更（イメージの中の既存ユーザー）
USER node

RUN mkdir -p node_modules && chown -R node:node node_modules

# Python uvをnodeユーザーでインストール（Serena MCP用）
RUN curl -LsSf https://astral.sh/uv/install.sh | sh

# nodeユーザーのPATHにuvを追加
ENV PATH="/home/node/.local/bin:$PATH"

# Gemini CLIをグローバルインストール
USER root
RUN npm install -g @google/gemini-cli

# パッケージバージョンアップデート
RUN npm install -g npm-check-updates

# 元のnodeユーザーに戻す
USER node

RUN mkdir -p $HOME/.claude $HOME/.gemini && chown -R node:node $HOME/.claude $HOME/.gemini

# ====================================
# 本番環境: ビルドステージ
# ====================================
FROM node:22-slim AS production-builder

WORKDIR /build

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm ci

# ソースコードをコピー
COPY . .

# 本番用ビルド
RUN npm run build

# ====================================
# 本番環境: 実行ステージ（nginx）
# ====================================
FROM nginx:alpine AS production

# ビルド成果物をnginxのルートディレクトリにコピー
COPY --from=production-builder /build/dist /usr/share/nginx/html

# カスタムnginx設定（SPAルーティング対応）
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
