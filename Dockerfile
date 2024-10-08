# 1. Node.js 20을 기반으로 하는 이미지를 사용
FROM node:20

# 2. 작업 디렉토리 설정
WORKDIR /app

# 3. 루트의 package.json과 pnpm-lock.yaml을 복사
COPY package.json pnpm-lock.yaml ./

# 4. 글로벌 바이너리 디렉터리 설정
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# 5. pnpm 글로벌 설치
RUN npm install -g pnpm

# 6. @nestjs/cli 글로벌 설치
RUN pnpm add -g @nestjs/cli

# 7. pnpm을 사용하여 의존성 설치
RUN pnpm install

# 8. 전체 애플리케이션 및 라이브러리 파일을 복사
COPY . .

# 9. Nest 애플리케이션 빌드
RUN nest build shared
RUN nest build database
RUN nest build nest
RUN nest build api-crm

# 10. 컨테이너가 사용할 포트 노출
EXPOSE 3000

# 11. 애플리케이션 실행 (dist/main.js를 Node.js로 실행)
CMD ["node", "dist/apps/api-crm/main.js"]
