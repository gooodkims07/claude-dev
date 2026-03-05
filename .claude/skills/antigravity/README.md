# 안티그래비티 (Antigravity) - VB6 마이그레이션 스킬

VB6 레거시 애플리케이션을 **React + Vite + Node.js + Oracle/MyBatis** 스택으로 마이그레이션하는 Claude Code 스킬입니다.

## 대상 기술 스택

### Frontend
- React 18
- Vite 5
- TypeScript 5
- Axios
- Material-UI (MUI)

### Backend
- Node.js 20
- Express 4
- TypeScript 5
- MyBatis Mapper (mybatis-mapper)
- Oracle DB (oracledb)

## 명령어

### 1. VB6 분석
```bash
/antigravity analyze ./legacy/LoginForm.frm
/antigravity analyze ./legacy/Project.vbp
```
VB6 폼, 클래스, 모듈의 구조와 의존성을 분석합니다.

### 2. SQL 추출
```bash
/antigravity extract-sql ./legacy/DataModule.bas --output ./sql
```
VB6 코드에서 임베디드 SQL을 추출하고 MyBatis 형식으로 변환합니다.

### 3. 프론트엔드 생성
```bash
/antigravity frontend ./legacy/LoginForm.frm --output ./frontend
```
VB6 폼을 React + Vite 컴포넌트로 변환합니다.

### 4. 백엔드 생성
```bash
/antigravity backend ./legacy/DataModule.bas --output ./backend
```
VB6 모듈/클래스를 Node.js + MyBatis API로 변환합니다.

### 5. 전체 마이그레이션
```bash
/antigravity migrate ./legacy/Project.vbp --output ./migrated
```
VB6 프로젝트 전체를 한 번에 마이그레이션합니다.

## VB6 → React 변환 매핑

| VB6 | React (MUI) |
|-----|-------------|
| Form | Component + CSS |
| CommandButton | `<Button>` |
| TextBox | `<TextField>` |
| ComboBox | `<Select>` |
| DataGrid | `<DataGrid>` |
| Label | `<Typography>` |
| CheckBox | `<Checkbox>` |
| OptionButton | `<Radio>` |
| Frame | `<Box>` or `<Card>` |

## VB6 → Node.js 변환 매핑

| VB6 | Node.js |
|-----|---------|
| Class (.cls) | TypeScript Class |
| Module (.bas) | Service/Controller |
| Property | Interface |
| Sub | `async function` |
| Function | `async function` with return |
| ADO Connection | Oracle Pool |
| ADO Command | Mapper method |
| ADO Recordset | Query Result |

## 출력 구조

```
migrated/
├── frontend/
│   ├── src/
│   │   ├── components/     # VB6 Form → React
│   │   ├── pages/          # 라우트 페이지
│   │   ├── hooks/          # useQuery hooks
│   │   ├── services/       # API client (axios)
│   │   └── types/          # TypeScript types
│   ├── package.json
│   └── vite.config.ts
│
└── backend/
    ├── src/
    │   ├── routes/         # Express routes
    │   ├── controllers/    # Request handlers
    │   ├── services/       # Business logic
    │   ├── mappers/        # MyBatis mapper (TS)
    │   └── db/             # Oracle connection
    ├── mappers/            # MyBatis XML files
    ├── package.json
    └── tsconfig.json
```

## MyBatis XML 예시

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="UserMapper">
  <select id="selectUser" resultType="User">
    SELECT * FROM USERS WHERE ID = #{id}
  </select>
</mapper>
```

## 주의사항

- VB6의 동적 SQL은 수동 검증이 필요할 수 있습니다.
- Oracle 특화 SQL은 그대로 유지됩니다.
- 트랜잭션 처리는 별도로 구현해야 합니다.
