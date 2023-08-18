const validateDateBirth: (value: string) => true | string = (
  value: string
): true | string => {
  console.log('value: ', value);
  const today = new Date();
  const birthDate = new Date(value);
  const age = today.getFullYear() - birthDate.getFullYear();

  if (age < 13) {
    return 'Your age must be over 13 years old';
  }

  return true;
};

export default validateDateBirth;
