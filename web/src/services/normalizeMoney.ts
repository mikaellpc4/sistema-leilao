const normalizeMoney = (value: number | string) => {
  const options = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };
  let numberValue = value
  if (typeof numberValue === 'string') {
    numberValue = Number(numberValue.replace(/[^0-9]/g, ''))
  }
  const normalizedValue = new Intl.NumberFormat('pt-BR', options).format((numberValue / 100));
  return normalizedValue;
};

export default normalizeMoney;
