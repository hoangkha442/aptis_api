# Dockerfile

FROM node:20-alpine

# Tạo thư mục làm việc
WORKDIR /app

# Copy file package và cài đặt Yarn
COPY package.json yarn.lock ./
RUN yarn install

# Copy toàn bộ project
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Nếu bạn đã migrate DB từ local, thì dùng:
RUN npx prisma migrate deploy

# Build project NestJS
RUN yarn build

# Lắng nghe port (Railway inject PORT env)
EXPOSE 3000

CMD ["node", "dist/main"]
