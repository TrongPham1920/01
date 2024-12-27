# Sử dụng Node.js làm base image
FROM node:20 AS build

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Copy package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Copy toàn bộ mã nguồn vào container
COPY . .

# Build ứng dụng React
RUN npm run build

# Sử dụng một image nhẹ hơn để phục vụ ứng dụng
FROM nginx:alpine

# Copy build đã tạo ở bước trước vào thư mục public của nginx
COPY --from=build /app/build /usr/share/nginx/html

# Mở port 80 cho Nginx
EXPOSE 80

# Khởi động Nginx khi container chạy
CMD ["nginx", "-g", "daemon off;"]
