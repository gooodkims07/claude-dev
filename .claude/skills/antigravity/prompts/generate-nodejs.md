# Node.js + MyBatis 생성 프롬프트

## 목적
VB6 모듈/클래스를 Node.js + Express + MyBatis API로 변환합니다.

## 입력
- VB6 파일 경로: {{path}}
- 출력 디렉토리: {{output}}

## 변환 규칙

### 클래스 (.cls) → TypeScript 클래스
```vb
' VB6
Private mUserID As String
Private mUserName As String

Public Property Get UserID() As String
  UserID = mUserID
End Property

Public Sub LoadUser(id As String)
  ' ADO 코드
End Sub
```

```ts
// TypeScript
export interface User {
  userId: string;
  userName: string;
}

export class UserService {
  async loadUser(id: string): Promise<User> {
    // MyBatis 호출
  }
}
```

### 모듈 (.bas) → Express 라우터
```vb
' VB6
Public Sub GetUserList()
  Dim rs As ADODB.Recordset
  Set rs = New ADODB.Recordset
  rs.Open "SELECT * FROM USERS", gConn
  ' ...
End Sub
```

```ts
// Express Route
import { Router } from 'express';
import { UserService } from '../services/UserService';

const router = Router();
const userService = new UserService();

router.get('/users', async (req, res) => {
  const users = await userService.getUserList();
  res.json(users);
});

export default router;
```

### ADO → MyBatis
```vb
' VB6 ADO
Dim cmd As ADODB.Command
Set cmd = New ADODB.Command
With cmd
  .ActiveConnection = conn
  .CommandText = "SELECT * FROM USERS WHERE ID = ?"
  .Parameters.Append .CreateParameter("id", adVarChar, adParamInput, 20, userId)
  Set rs = .Execute
End With
```

```ts
// MyBatis Mapper
import mybatisMapper from 'mybatis-mapper';

// XML Mapper
// <select id="getUser" resultType="User">
//   SELECT * FROM USERS WHERE ID = #{id}
// </select>

const user = await mybatisMapper.getStatement('UserMapper', 'getUser', { id: userId });
const result = await connection.execute(user);
```

## 출력 구조
```
backend/
├── src/
│   ├── routes/              # Express 라우터
│   │   └── index.ts
│   ├── controllers/         # 요청 처리
│   │   └── UserController.ts
│   ├── services/            # 비즈니스 로직
│   │   └── UserService.ts
│   ├── mappers/             # MyBatis 매퍼 (TS)
│   │   └── UserMapper.ts
│   ├── db/                  # DB 설정
│   │   └── connection.ts
│   └── types/               # 타입 정의
│       └── index.ts
├── mappers/                 # MyBatis XML
│   └── UserMapper.xml
├── package.json
└── tsconfig.json
```

## Oracle 연결 설정

### db/connection.ts
```ts
import oracledb from 'oracledb';

oracledb.initOracleClient({ libDir: process.env.ORACLE_LIB_DIR });

export const createPool = async () => {
  return await oracledb.createPool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectString: process.env.DB_CONNECTION_STRING,
    poolMin: 2,
    poolMax: 10,
    poolIncrement: 2
  });
};

export const getConnection = async () => {
  return await oracledb.getConnection();
};
```

## package.json
```json
{
  "name": "migrated-backend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mybatis-mapper": "^0.9.0",
    "oracledb": "^6.3.0",
    "cors": "^2.8.5",
    "dotenv": "^16.3.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/cors": "^2.8.17",
    "@types/node": "^20.10.0",
    "@types/oracledb": "^6.5.0",
    "typescript": "^5.3.0",
    "tsx": "^4.7.0"
  }
}
```
