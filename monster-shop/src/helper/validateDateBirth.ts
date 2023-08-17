const validateDateBirth = (value: string) => {
  const today = new Date();
  const birthDate = new Date(value);
  const age = today.getFullYear() - birthDate.getFullYear();

  if (age < 13) {
    console.log('age: ', age);
    return 'User must be 13 years old or older';
  }

  console.log('age: ', age);
  return true;
};

export default validateDateBirth;
