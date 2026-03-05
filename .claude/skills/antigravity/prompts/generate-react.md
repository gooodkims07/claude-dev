# React + Vite 생성 프롬프트

## 목적
VB6 폼을 React + TypeScript + MUI 컴포넌트로 변환합니다.

## 입력
- VB6 폼 경로: {{path}}
- 출력 디렉토리: {{output}}

## 변환 규칙

### 폼 → 컴포넌트
```vb
' VB6
Form Name="frmLogin"
  Caption="로그인"
  Width=5000
  Height=3000
```

```tsx
// React
import { Box, Typography } from '@mui/material';

export const LoginPage: React.FC = () => {
  return (
    <Box sx={{ width: 500, height: 300, p: 2 }}>
      <Typography variant="h5">로그인</Typography>
    </Box>
  );
};
```

### 컨트롤 매핑
| VB6 | MUI 컴포넌트 | Props |
|-----|-------------|-------|
| CommandButton | Button | variant, onClick, disabled |
| TextBox | TextField | value, onChange, type, label |
| ComboBox | Select + MenuItem | value, onChange, options |
| DataGrid | DataGrid | rows, columns, onRowClick |
| Label | Typography | variant, children |
| CheckBox | Checkbox | checked, onChange |
| OptionButton | Radio + RadioGroup | value, onChange |
| Frame | Box/Card | sx styling |
| Timer | useEffect + setInterval | - |

### 이벤트 변환
```vb
' VB6
Private Sub btnLogin_Click()
  Call ValidateUser(txtID.Text, txtPW.Text)
End Sub
```

```tsx
// React
const [id, setId] = useState('');
const [password, setPassword] = useState('');

const handleLogin = async () => {
  await validateUser(id, password);
};

<Button onClick={handleLogin}>로그인</Button>
```

### 데이터 바인딩
```vb
' VB6 ADO
Set txtName.DataSource = rs
txtName.DataField = "USER_NAME"
```

```tsx
// React Query
const { data } = useQuery(['user'], fetchUser);

<TextField
  value={data?.userName || ''}
  onChange={(e) => updateUser({ userName: e.target.value })}
/>
```

## 출력 구조
```
frontend/
├── src/
│   ├── components/
│   │   └── {{FormName}}/
│   │       ├── index.tsx           # 메인 컴포넌트
│   │       ├── styles.ts           # MUI sx 스타일
│   │       └── types.ts            # 인터페이스
│   ├── hooks/
│   │   └── use{{FormName}}.ts      # 폼 상태/로직 훅
│   ├── services/
│   │   └── api.ts                  # API 호출
│   └── types/
│       └── index.ts                # 공유 타입
├── package.json
└── vite.config.ts
```

## 생성 파일 예시

### vite.config.ts
```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
});
```

### package.json
```json
{
  "name": "migrated-frontend",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@mui/material": "^5.15.0",
    "@emotion/react": "^11.11.0",
    "@emotion/styled": "^11.11.0",
    "@mui/x-data-grid": "^6.18.0",
    "axios": "^1.6.0",
    "@tanstack/react-query": "^5.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0"
  }
}
```
