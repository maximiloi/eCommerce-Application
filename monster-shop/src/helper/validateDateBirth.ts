const validateDateBirth: (value: string | null) => string | true = (
  value: string | null
): string | true => {
  const ageConsent = 13;
  const bigAge = 150;

  if (value !== null) {
    const today = new Date();
    const birthDate = new Date(value.toString());
    const age: number = today.getFullYear() - birthDate.getFullYear();

    if (age < ageConsent) {
      return `Your age must be over ${ageConsent} years old`;
    }

    if (age > 150) {
      return `You can't be more than ${bigAge} years old`;
    }
  }

  return true;
};

export default validateDateBirth;
