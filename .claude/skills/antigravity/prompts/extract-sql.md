# SQL 추출 프롬프트

## 목적
VB6 코드에서 SQL 쿼리를 추출하고 MyBatis 형식으로 변환합니다.

## 입력
- VB6 파일 경로: {{path}}
- 출력 디렉토리: {{output}}

## SQL 추출 패턴

### 1. 문자열 리터럴 SQL
```vb
' 직접 SQL 문자열
sql = "SELECT * FROM USERS WHERE ID = 'admin'"
```

### 2. 동적 SQL (문자열 연결)
```vb
' 동적 SQL
sql = "SELECT * FROM " & tableName & " WHERE " & whereClause
```

### 3. ADO Command SQL
```vb
' Command 객체
Set cmd = New ADODB.Command
cmd.CommandText = "SP_GET_USER"
cmd.CommandType = adCmdStoredProc
```

### 4. Recordset SQL
```vb
' Recordset 오픈
rs.Open "SELECT * FROM ORDERS", conn
```

## SQL 변환 규칙

### Oracle 특화
- 파라미터: `#{paramName}` (MyBatis 스타일)
- 날짜: `TO_DATE(#{date}, 'YYYY-MM-DD')`
- 문자열 연결: `||` 연산자 사용
- ROWNUM → LIMIT 대체

### 예시 변환
```vb
' VB6 원본
sql = "SELECT * FROM EMP WHERE DEPT = '" & deptCode & "' AND SAL > " & minSal
```

```xml
<!-- MyBatis 변환 -->
<select id="selectEmp" resultType="Emp">
  SELECT * FROM EMP
  WHERE DEPT = #{deptCode}
  AND SAL > #{minSal}
</select>
```

## 출력 파일

### 1. SQL 목록 (JSON)
```json
{
  "queries": [
    {
      "id": "query-001",
      "original": "SELECT * FROM USERS WHERE ID = 'admin'",
      "type": "SELECT",
      "table": "USERS",
      "parameters": [],
      "isDynamic": false,
      "location": "Form1.frm:45"
    }
  ]
}
```

### 2. MyBatis 매퍼 (XML)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="ExtractedMapper">
  <!-- 추출된 쿼리들 -->
</mapper>
```

## 주의사항
1. 동적 SQL은 `<if>`, `<choose>`, `<foreach>`로 변환
2. 저장 프로시저는 `<select>` with `statementType="CALLABLE"`
3. Oracle 힌트는 그대로 유지
4. ROWID, ROWNUM 등 Oracle 특화 문법 보존
