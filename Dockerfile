# 빌드 단계
FROM node:18 AS build

WORKDIR /usr/src/app

# 패키지 파일 복사
COPY package*.json ./
RUN npm install --production --legacy-peer-deps
COPY . .

# 애플리케이션 빌드
RUN npx nx build api-crm

# 실행 단계
FROM node:18 AS runtime

WORKDIR /usr/src/app

# dist 폴더 복사
COPY --from=build /usr/src/app/dist ./dist
COPY package*.json ./
RUN npm install --production --legacy-peer-deps

# 포트 설정
EXPOSE 3000

# 애플리케이션 실행
CMD ["npx", "nx", "serve", "api-crm"]
