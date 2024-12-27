# Sử dụng Node.js làm base image
FROM node:20

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Copy package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Copy toàn bộ mã nguồn vào container
COPY . .

# Mở port mà server của bạn sẽ chạy (thường là 3000)
EXPOSE 3000

# Khởi động server Node.js khi container chạy
CMD ["npm", "start"]
