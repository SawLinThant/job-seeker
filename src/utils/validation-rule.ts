export const validateEmail = (value: string) => {
  // Custom email validation logic
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value) || 'Invalid email format';
};

export const validatePassword = (value: string) => {
  if (value.length < 8 || value.length > 15) {
    return 'Password must be between 8 and 15 characters';
  }
  const hasNumber = /[0-9]/.test(value);
  const hasLowercase = /[a-z]/.test(value);
  const hasUppercase = /[A-Z]/.test(value);
  const hasSpecialChar = /[!@#$%^&*]/.test(value);

  if (!hasLowercase) {
    return 'Password must contain at least one lowercase letter';
  } else if (!hasUppercase) {
    return 'Password must contain at least one uppercase letter';
  } else if (!hasNumber) {
    return 'Password must contain at least one digit letter';
  } else if (!hasSpecialChar) {
    return 'Password must contain at least one special character (!, @, #, $, % etc.)';
  }

  return undefined; // No error if all conditions met
};

export const validateConfirmPassword = (value: string, { password }: { password: string }) => {
  if (value !== password) {
    return 'Passwords do not match';
  }
  return undefined; // No error if passwords match
};
