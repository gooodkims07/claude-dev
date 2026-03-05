# VB6 코드 분석 프롬프트

## 목적
VB6 소스 코드를 분석하여 구조, 컴포넌트, 이벤트, SQL 사용 패턴을 파악합니다.

## 입력
VB6 파일 경로: {{path}}

## 분석 대상 파일 유형
- .frm (폼)
- .cls (클래스)
- .bas (모듈)
- .vbp (프로젝트)

## 분석 항목

### 1. 폼 (.frm) 분석
```
폼 정보:
- Name: 폼 이름
- Caption: 제목
- Size: 폼 크기
- Controls: 컨트롤 목록
  - Name, Type, Position, Size, Properties
- Events: 이벤트 핸들러 목록
  - Form_Load, Form_Unload, Button_Click 등
- DataBindings: 데이터 바인딩 정보
```

### 2. 클래스 (.cls) 분석
```
클래스 정보:
- Name: 클래스 이름
- Properties: 속성 (Get/Let/Set)
- Methods: 메서드 목록
- Events: 이벤트 (Public/Private)
- Dependencies: 의존성
```

### 3. 모듈 (.bas) 분석
```
모듈 정보:
- Name: 모듈 이름
- GlobalVars: 전역 변수
- Enums/Types: 열거형/타입 정의
- Functions: 함수 목록
- Subs: 서브루틴 목록
- SQLQueries: SQL 쿼리 목록
- ADOUsage: ADO 사용 패턴
```

### 4. SQL 패턴 식별
```
SQL 정보:
- Query: SQL 문자열
- Type: SELECT/INSERT/UPDATE/DELETE/PROCEDURE
- Table: 대상 테이블
- Parameters: 파라미터 목록
- Dynamic: 정적/동적 SQL 여부
- Source: 소스 코드 위치
```

## 출력 형식
```json
{
  "fileType": "frm|cls|bas|vbp",
  "name": "파일명",
  "analysis": {
    "forms": [...],
    "classes": [...],
    "modules": [...],
    "sqlQueries": [...],
    "dependencies": [...],
    "complexity": "low|medium|high"
  },
  "migrationHints": {
    "reactComponents": [...],
    "apiEndpoints": [...],
    "mybatisMappers": [...]
  }
}
```

## 지시사항
1. VB6 코드에서 GUI 요소와 비즈니스 로직을 분리
2. SQL 쿼리는 따로 추출하여 목록화
3. 이벤트 핸들러는 React hook 대응 방식 제안
4. ADO 데이터 접근은 MyBatis 매퍼 대응 방식 제안
