# VB6 마이그레이션 분석 보고서

## 프로젝트 정보
- **원본 프로젝트**: TestProject.vbp
- **분석일**: 2026-02-07
- **대상 스택**: React + Vite + Node.js + Oracle/MyBatis

## 파일 분석 결과

### 1. LoginForm.frm → LoginPage.tsx
| VB6 요소 | 변환 결과 | 비고 |
|---------|----------|------|
| frmLogin (Form) | LoginPage 컴포넌트 | React 함수형 컴포넌트 |
| Caption="로그인" | Typography variant="h4" | MUI 컴포넌트 |
| txtUserID (TextBox) | TextField | 상태: useState |
| txtPassword (TextBox) | TextField type="password" | PasswordChar → type="password" |
| btnLogin (CommandButton) | Button variant="contained" | Default → onKeyPress Enter 처리 |
| btnCancel (CommandButton) | Button variant="outlined" | Unload Me → window.close() |
| Form_Load | useEffect | 초기화 로직 |
| btnLogin_Click | handleLogin 함수 | async/await 변환 |
| btnCancel_Click | handleCancel 함수 | - |

### 2. UserService.cls → UserService.ts
| VB6 요소 | 변환 결과 | 비고 |
|---------|----------|------|
| mUserID, mUserName... | private userData | 클래스 프로퍼티 |
| Property Get/Let | getter/setter | TypeScript accessor |
| ValidateUser | validateUser() | async 메서드 |
| UpdateLastLogin | updateLastLogin() | private 메서드 |
| GetUserList | getUserList() | Recordset → Promise<array> |
| ADO Recordset | mybatisMapper | SQL 실행 결과 |

### 3. DBUtil.bas → connection.ts + queries
| VB6 요소 | 변환 결과 | 비고 |
|---------|----------|------|
| gConn (전역) | Oracle Pool | 연결 풀링 |
| OpenConnection | initializePool() | oracledb.createPool |
| CloseConnection | closePool() | - |
| ExecuteQuery | getConnection() + execute | SELECT용 |
| ExecuteNonQuery | conn.execute() | UPDATE/INSERT/DELETE |
| ExecuteScalar | execute() + rows[0][0] | 단일 값 반환 |
| ExecuteProcedure | 명시적 파라미터 바인딩 | 저장 프로시저 |
| GetUserCount | getUserCount() | 동적 SQL 변환 |

## SQL 추출 및 변환

### 추출된 쿼리: 4개

1. **validateUser** (SELECT)
   - VB6: 문자열 연결로 동적 SQL
   - MyBatis: `#{param}` 파라미터 바인딩
   - 보안: SQL Injection 방지

2. **updateLastLogin** (UPDATE)
   - VB6: `SYSDATE` 그대로 사용
   - MyBatis: Oracle 구문 유지

3. **selectUserList** (SELECT with JOIN)
   - VB6: INNER JOIN T_DEPT
   - MyBatis: JOIN 구문 그대로 유지
   - 컬럼 매핑: resultMap 자동 생성

4. **countUser** (SELECT with 동적 조건)
   - VB6: `If Not includeInactive Then` 조건
   - MyBatis: `<if test="!includeInactive">` 태그

## 의존성 변환

```
VB6                                    Node.js/React
─────────────────────────────────────────────────────────
ADODB.Connection    →    oracledb (Oracle Driver)
ADODB.Recordset     →    SQL 결과 (rows array)
ADODB.Command       →    mybatis-mapper
MsgBox              →    alert() 또는 MUI Dialog
Unload Me           →    navigate() 또는 window.close()
frmMain.Show        →    navigate('/main')
```

## 마이그레이션 완료 체크리스트

- [x] LoginForm → LoginPage 컴포넌트
- [x] UserService 클래스 → TypeScript 클래스
- [x] DBUtil 모듈 → 서비스 계층 + 연결 관리
- [x] SQL 추출 (4개)
- [x] MyBatis 매퍼 생성
- [x] Oracle 연결 설정
- [x] API 라우트 설정
- [x] React Query 적용 (useState로 대체)
- [x] MUI 컴포넌트 매핑

## 주의사항 및 추가 작업

1. **보안**: 실제 환경에서는
   - 비밀번호 해싱 (bcrypt)
   - JWT 토큰 인증
   - 입력값 검증 추가 필요

2. **트랜잭션**: ValidateUser에서 UPDATE 트랜잭션 처리됨

3. **오류 처리**: VB6 On Error → try/catch 변환 완료

4. **타입 정의**: User, UserListItem 인터페이스 정의됨
