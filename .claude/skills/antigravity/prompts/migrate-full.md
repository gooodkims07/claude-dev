# 전체 마이그레이션 프롬프트

## 목적
VB6 프로젝트(.vbp) 전체를 React + Vite + Node.js + Oracle/MyBatis 스택으로 한 번에 마이그레이션합니다.

## 입력
- VB6 프로젝트 경로: {{vbp-path}}
- 출력 디렉토리: {{output}}

## 마이그레이션 단계

### 1단계: 프로젝트 분석
```
.vbp 파일 파싱:
- 참조된 폼 목록 (Form=...)
- 참조된 모듈 목록 (Module=...)
- 참조된 클래스 목록 (Class=...)
- 의존성 분석
- 시작 폼 식별 (Startup="...")
```

### 2단계: 아키텍처 매핑
| VB6 구조 | 마이그레이션 구조 |
|----------|-----------------|
| 시작 폼 | React Router 진입점 |
| 폼 간 이동 | React Router 라우트 |
| 전역 변수 | React Context / Zustand |
| 데이터 모듈 | API Service 계층 |
| 비즈니스 로직 | Service + Controller |
| SQL 쿼리 | MyBatis Mapper |

### 3단계: 프론트엔드 생성
```
{{output}}/frontend/
├── src/
│   ├── App.tsx                 # 루트 컴포넌트
│   ├── main.tsx                # 진입점
│   ├── router.tsx              # 라우터 설정
│   ├── pages/                  # 페이지 컴포넌트
│   │   ├── HomePage.tsx
│   │   ├── LoginPage.tsx
│   │   └── ...
│   ├── components/             # 재사용 컴포넌트
│   │   ├── common/
│   │   └── forms/
│   ├── hooks/                  # 커스텀 훅
│   ├── services/               # API 호출
│   ├── stores/                 # 상태 관리
│   └── types/                  # 타입 정의
├── package.json
└── vite.config.ts
```

### 4단계: 백엔드 생성
```
{{output}}/backend/
├── src/
│   ├── index.ts                # 서버 진입점
│   ├── app.ts                  # Express 앱 설정
│   ├── config/                 # 설정 파일
│   ├── routes/                 # 라우터
│   ├── controllers/            # 컨트롤러
│   ├── services/               # 서비스
│   ├── middleware/             # 미들웨어
│   ├── types/                  # 타입
│   └── db/                     # DB 연결
├── mappers/                    # MyBatis XML
├── .env                        # 환경변수
└── package.json
```

### 5단계: MyBatis 매퍼 생성
```
{{output}}/backend/mappers/
├── CommonMapper.xml            # 공통 쿼리
├── UserMapper.xml              # 사용자 관련
└── ...
```

## 생성 순서

1. **타입 정의** 먼저 생성 (공유 인터페이스)
2. **MyBatis 매퍼** 생성 (SQL 추출)
3. **백엔드 API** 생성 (Service → Controller → Route)
4. **프론트엔드** 생성 (Page → Component → Hook → Service)
5. **라우터** 설정 (폼 간 이동 매핑)

## 환경 설정 파일

### frontend/.env
```
VITE_API_URL=http://localhost:3000/api
```

### backend/.env
```
PORT=3000
DB_USER=scott
DB_PASSWORD=tiger
DB_CONNECTION_STRING=localhost:1521/ORCL
ORACLE_LIB_DIR=/opt/oracle/instantclient
```

## 마이그레이션 체크리스트

- [ ] 모든 폼이 React 페이지로 변환됨
- [ ] 모든 SQL이 MyBatis 매퍼로 추출됨
- [ ] ADO 연결이 Oracle Pool로 대체됨
- [ ] 폼 간 이동이 라우터로 구현됨
- [ ] 전역 상태가 Context/Store로 관리됨
- [ ] package.json에 모든 의존성 포함됨
- [ ] TypeScript 타입이 정의됨
- [ ] CORS 설정이 완료됨

## 주의사항

1. **동적 SQL**: VB6의 문자열 연결 SQL은 수동 검증 필요
2. **트랜잭션**: ADO 트랜잭션은 명시적 DB 트랜잭션으로 변환
3. **에러 핸들링**: On Error GoTo → try/catch
4. **Oracle 특화**: ROWID, ROWNUM, 시퀀스 등 유지
5. **인증**: VB6 로그인 → JWT/OAuth 고려
