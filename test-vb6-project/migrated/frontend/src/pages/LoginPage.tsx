import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { userService } from '../services/userService';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Form Load 초기화
  React.useEffect(() => {
    setUserId('');
    setPassword('');
  }, []);

  // btnLogin_Click 변환
  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const isValid = await userService.validateUser(userId, password);

      if (isValid) {
        alert('로그인 성공!');
        navigate('/main'); // frmMain.Show
      } else {
        setError('아이디 또는 비밀번호가 올바르지 않습니다.');
      }
    } catch (err) {
      setError('로그인 처리 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // btnCancel_Click 변환
  const handleCancel = () => {
    window.close(); // Unload Me
  };

  return (
    <Box sx={{ p: 3, maxWidth: 500, mx: 'auto', mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        로그인
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {/* txtUserID → TextField */}
      <TextField
        label="사용자ID"
        fullWidth
        margin="normal"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        autoFocus
      />

      {/* txtPassword → TextField with password type */}
      <TextField
        label="비밀번호"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
      />

      <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
        {/* btnLogin → Button */}
        <Button
          variant="contained"
          size="large"
          onClick={handleLogin}
          disabled={loading}
          sx={{ flex: 1 }}
        >
          {loading ? '로그인 중...' : '로그인'}
        </Button>

        {/* btnCancel → Button */}
        <Button
          variant="outlined"
          size="large"
          onClick={handleCancel}
          sx={{ flex: 1 }}
        >
          취소
        </Button>
      </Box>
    </Box>
  );
};
