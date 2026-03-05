import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import { use{{FormName}} } from '@/hooks/use{{FormName}}';
import { {{FormName}}Props } from './types';

export const {{FormName}}: React.FC<{{FormName}}Props> = () => {
  const {
    // 상태
    loading,
    error,
    // 핸들러
    handleSubmit,
    handleCancel,
  } = use{{FormName}}();

  return (
    <Box sx={{ p: 3, maxWidth: 600 }}>
      <Typography variant="h5" gutterBottom>
        {{FormCaption}}
      </Typography>

      {/* VB6 Controls will be mapped here */}

      <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
        <Button variant="contained" onClick={handleSubmit}>
          확인
        </Button>
        <Button variant="outlined" onClick={handleCancel}>
          취소
        </Button>
      </Box>
    </Box>
  );
};
