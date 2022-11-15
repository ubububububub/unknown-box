# 서비스 소개

랜덤박스 쇼핑몰 프로젝트입니다.

https://user-images.githubusercontent.com/116259958/201844619-5996f185-b304-4222-b744-3a30b94e4f1a.mp4

# 기술 스택

## 프론트엔드

- HTML5
- CSS
- Javascript

## 백엔드

- Express
- mongodb
- mongoose
- redis

## 공통

- eslint
- prettier

# 멤버

## 이상조(팀장)

- 바닐라 JS SPA 프로젝트 세팅(Routing, Protected Routing, Class Component … )
- 재사용 컴포넌트 및 함수(Form, AddressForm, ImageUploadForm, Toast, validationFn … ) 작성
- Login, SignIn, MyPage, MyOrder, MyOrderEdit, NotFound 페이지 구현

## 김유범

- 프론트엔드: 랜덤박스, 장바구니, 주문, 주문 완료 페이지 구현
- 백엔드: 로그인, 카카오 OAUTH 로그인, 회원가입 메일 인증 구현

## 김지택

- 김유범님에 이은 나머지 api 구현

## 고나현

- 어드민 페이지 구현

## 조혜인

- 메인, QNA, 상품 상세 페이지 구현

# 폴더 구조

```bash
├── frontend
│   ├── apis
│   ├── assets
│   ├── components
│   ├── constants
│   ├── core
│   ├── pages
│   ├── router
│   ├── store
│   ├── styles
│   ├── utils
│   ├── App.js
│   └── index.html
├── backend
│   ├── controllers
│   ├── db
│   │   ├── models
│   │   └── schemas
│   ├── middlewares
│   ├── services
│   ├── utils
│   ├── app.js
│   └── index.js
├── .eslintrc.js
├── .gitignore
├── .prettierrc.js
├── babel.config.json
├── package.json
├── README.md
└── temp.txt
```

# 실행 방법

## 1. git에서 파일 받아오기

> git clone https://github.com/ubububububub/unknown-box.git

## 2. 라이브러리 설치

> npm install

## 3. .env 파일 설정

> .env 설정

## 4. 프로그램 실행

> npm start
