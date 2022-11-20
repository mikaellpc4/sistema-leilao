const normalizeMoney = (value: number) => {
  const options = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };
  const normalizedValue = Number(new Intl.NumberFormat('pt-BR', options).format((value)).replace(/[^0-9]/g, ''));
  return normalizedValue;
};

export default normalizeMoney;
