# Gunakan image Node.js 20 Alpine sebagai base image untuk build
FROM node:20-alpine AS builder

# Set working directory di dalam container
WORKDIR /app

# Salin package.json dan package-lock.json ke dalam container
COPY package*.json ./

# Install semua dependensi (termasuk dev dependencies) untuk proses build
RUN npm install

# Salin seluruh kode aplikasi ke dalam container
COPY . .

# Build aplikasi NestJS
RUN npm run build

EXPOSE 3000

# Command yang akan dijalankan saat container dijalankan
CMD ["node", "dist/src/server.js"]