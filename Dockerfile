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

# ========================
# Tahap kedua: image akhir
# ========================
FROM node:20-alpine

# Set working directory di dalam container
WORKDIR /app

# Salin package.json dan package-lock.json ke dalam container
COPY package*.json ./

# Install hanya dependensi utama (tanpa dev dependencies)
RUN npm install --omit=dev

# Salin hasil build dari tahap pertama ke dalam container
COPY --from=builder /app/dist ./dist

# Expose port yang akan digunakan oleh aplikasi
EXPOSE 3000

# Command yang akan dijalankan saat container dijalankan
CMD ["node", "dist/src/server.js"]