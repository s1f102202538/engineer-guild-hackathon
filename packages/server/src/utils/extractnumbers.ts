const extractNumbers = (str: string): number => {
  const numberStr = str.replace(/[^0-9.]/g, '');

  return numberStr ? parseFloat(numberStr) : 0;
};

export default extractNumbers;
