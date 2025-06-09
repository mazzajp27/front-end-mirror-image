export const maskCPF = (value: string): string => {
  // Remove tudo que não é número
  const cleanValue = value.replace(/\D/g, '');
  
  // Limita a 11 dígitos
  const cpf = cleanValue.slice(0, 11);
  
  // Se estiver vazio, retorna vazio (permite apagar)
  if (!cpf) return '';
  
  // Aplica a máscara: XXX.XXX.XXX-XX
  if (cpf.length <= 3) return cpf;
  if (cpf.length <= 6) return cpf.replace(/(\d{3})/, '$1.');
  if (cpf.length <= 9) return cpf.replace(/(\d{3})(\d{3})/, '$1.$2.');
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
};

export const maskPhone = (value: string): string => {
  // Remove tudo que não é número
  const cleanValue = value.replace(/\D/g, '');
  
  // Se estiver vazio, retorna vazio (permite apagar)
  if (!cleanValue) return '';
  
  // Limita a 11 dígitos (com DDD)
  const phone = cleanValue.slice(0, 11);
  
  // Aplica a máscara progressivamente
  if (phone.length <= 2) return phone;
  if (phone.length <= 6) return `(${phone.slice(0, 2)}) ${phone.slice(2)}`;
  if (phone.length <= 10) return `(${phone.slice(0, 2)}) ${phone.slice(2, 6)}-${phone.slice(6)}`;
  return `(${phone.slice(0, 2)}) ${phone.slice(2, 7)}-${phone.slice(7)}`;
};

export const validateCPF = (cpf: string): boolean => {
  // Remove caracteres não numéricos
  const cleanCPF = cpf.replace(/\D/g, '');

  // Se estiver vazio, retorna true (não mostra erro)
  if (!cleanCPF) return true;

  // Verifica se tem 11 dígitos
  if (cleanCPF.length !== 11) return false;

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(cleanCPF)) return false;

  // Validação do primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
  }
  let digit = 11 - (sum % 11);
  if (digit > 9) digit = 0;
  if (digit !== parseInt(cleanCPF.charAt(9))) return false;

  // Validação do segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
  }
  digit = 11 - (sum % 11);
  if (digit > 9) digit = 0;
  if (digit !== parseInt(cleanCPF.charAt(10))) return false;

  return true;
};

export const validatePhone = (phone: string): boolean => {
  // Remove caracteres não numéricos
  const cleanPhone = phone.replace(/\D/g, '');
  
  // Se estiver vazio, retorna true (não mostra erro)
  if (!cleanPhone) return true;
  
  // Verifica se tem entre 10 e 11 dígitos (com DDD)
  if (cleanPhone.length < 10 || cleanPhone.length > 11) return false;
  
  // Verifica se o DDD é válido (10-99)
  const ddd = parseInt(cleanPhone.substring(0, 2));
  if (ddd < 11 || ddd > 99) return false;
  
  return true;
}; 