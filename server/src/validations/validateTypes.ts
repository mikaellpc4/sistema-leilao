// Compare two objects and check if their types matches
const validateTypes = <T extends Record<string, unknown>, K extends Record<string, unknown>>
  (recievedObject: T, validObject: K) => {
  if (typeof recievedObject !== typeof validObject) return false;
  let isValid = true;
  Object.keys(recievedObject).some((key) => {
    if (typeof recievedObject[key] !== validObject[key]) {
      isValid = false;
      return true;
    }
    return null;
  });
  return isValid;
};

export default validateTypes;
