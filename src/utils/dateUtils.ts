// src/utils/dateUtils.ts

export const parseDate = (dateStr: string): Date => {
  if (!dateStr) {
    throw new Error('Data de nascimento não fornecida');
  }

  const [day, month, year] = dateStr.split('/').map(Number);

  if (!day || !month || !year || day > 31 || month > 12) {
    throw new Error('Data de nascimento inválida');
  }

  return new Date(year, month - 1, day);
};
