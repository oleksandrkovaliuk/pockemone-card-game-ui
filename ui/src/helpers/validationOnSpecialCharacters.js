export function isIncludeSpecialCharacters(input) {
  const regex = /[0-9!@#$%^&*(),.?":{}|<>]/;
  return regex.test(input);
}
