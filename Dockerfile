FROM oven/bun:1

# Set application directory
WORKDIR /usr/src/app

COPY package*.json bun.lock ./

RUN bun install --frozen-lockfile --production

COPY . .

CMD ["bun", "index.ts"]
