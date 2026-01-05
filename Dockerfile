FROM node:24

# 設置工作目錄
WORKDIR /app

# 安裝系統依賴和工具
RUN apt-get update && apt-get install -y --no-install-recommends \
    bash-completion \
    curl \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# 安裝 pnpm
RUN curl -fsSL https://get.pnpm.io/install.sh | bash -s -- --version 10.20.0 \
    && export PNPM_HOME="/root/.local/share/pnpm" \
    && export PATH="$PNPM_HOME:$PATH" \
    && pnpm config set store-dir /pnpm

# 設置環境變數
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# 啟用 pnpm 補全功能
RUN pnpm completion bash > ~/completion-for-pnpm.bash \
    && echo 'source ~/completion-for-pnpm.bash' >> ~/.bashrc

# 安裝 Starship
RUN curl -sS https://starship.rs/install.sh | sh -s -- --yes \
    && echo 'eval "$(starship init bash)"' >> ~/.bashrc

# 複製應用程式文件
COPY . .

# 暴露應用程式的埠
ARG buildtime_CONTAINER_PORT=3000
EXPOSE ${buildtime_CONTAINER_PORT}

# 設置默認 Shell 為 bash
SHELL ["/bin/bash", "-c"]

# 設置容器啟動時的默認命令
CMD ["bash"]