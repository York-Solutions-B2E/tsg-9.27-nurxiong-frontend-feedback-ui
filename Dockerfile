# Use Debian-based Node to avoid rollup-musl issues
FROM node:22 AS build

WORKDIR /app


COPY package.json .

# ⛔ Install NO optional dependencies (fixes Rollup on Docker)
RUN npm install

COPY . .
RUN npm run build

# Use nginx to serve the built application
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
