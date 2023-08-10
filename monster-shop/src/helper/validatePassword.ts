const validatePassword = (value: string) => {
  if (value.trim() !== value) {
    return 'Password must not contain leading or trailing whitespace.';
  }

  if (value.length < 8) {
    return 'Password must be at least 8 characters long.';
  }

  if (!/[A-Z]/.test(value)) {
    return 'Password must contain at least one uppercase letter (A-Z).';
  }

  if (!/[a-z]/.test(value)) {
    return 'Password must contain at least one lowercase letter (a-z).';
  }

  if (!/\d/.test(value)) {
    return 'Password must contain at least one digit (0-9).';
  }

  if (!/[!@#$%^&*]/.test(value)) {
    return 'Password must contain at least one special character (!@#$%^&*).';
  }

  return true; // Если пароль прошел все проверки
};

export default validatePassword;
