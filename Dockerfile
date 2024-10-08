# 빌드 단계
FROM node:18 AS build

WORKDIR /usr/src/app

# 패키지 파일 복사
COPY package*.json ./
RUN npm install --production --legacy-peer-deps

# 소스 코드 복사
COPY . .

# 애플리케이션 빌드
RUN npx nx run-many --target=build --all

# 실행 단계
FROM node:18 AS runtime

WORKDIR /usr/src/app

# dist 폴더에서 빌드 결과물 복사
COPY --from=build /usr/src/app/dist/apps/api-crm ./dist/apps/api-crm
COPY package*.json ./

# npm 의존성 설치
RUN npm install --production --legacy-peer-deps

# 포트 설정
EXPOSE 3000

# 애플리케이션 실행
CMD ["node", "./dist/apps/api-crm/main.js"]
