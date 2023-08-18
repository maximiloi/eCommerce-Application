const validateDateBirth: (value: string | null) => true | string = (
  value: string | null
): true | string => {
  const today = new Date();
  const birthDate = new Date(value);
  const age = today.getFullYear() - birthDate.getFullYear();

  if (age < 13) {
    return 'Your age must be over 13 years old';
  }

  return true;
};

export default validateDateBirth;
