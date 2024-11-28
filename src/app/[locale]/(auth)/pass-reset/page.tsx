'use client';

import AuthLayout from '@/components/layout/AuthLayout';
import PasswordReset from '@/components/pages/auth/PasswordReset';
import React from 'react';

const PasswordResetPage = () => {
  return (
    <AuthLayout title="Reset Password">
      <PasswordReset />
    </AuthLayout>
  );
};

export default PasswordResetPage;
