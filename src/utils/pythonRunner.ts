/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TerminalLine {
  id: string;
  type: 'stdout' | 'stdin' | 'stderr' | 'system' | 'prompt';
  text: string;
  timestamp: number;
}

export interface CalculationTrace {
  operation: string;
  num1: number;
  num2: number;
  operatorSymbol: string;
  rawPythonCode: string;
  steps: string[];
  result: number | string;
  isError: boolean;
  errorType?: string;
}

export function executePythonCalculation(
  op: 'soma' | 'subtracao' | 'multiplicacao' | 'divisao' | 'potencia' | 'modulo' | 'divisao_inteira',
  a: number,
  b: number
): CalculationTrace {
  const steps: string[] = [];
  steps.push(`1. Recebidos parâmetros de entrada: a = ${a} (float), b = ${b} (float)`);

  let result: number | string = 0;
  let isError = false;
  let errorType: string | undefined = undefined;
  let operatorSymbol = '+';
  let rawCode = '';

  switch (op) {
    case 'soma':
      operatorSymbol = '+';
      rawCode = `def somar(a: float, b: float) -> float:\n    return a + b\n\nresultado = somar(${a}, ${b})`;
      steps.push(`2. Invocando função def somar(a, b)`);
      steps.push(`3. Executando operação binária nativa: ${a} + ${b}`);
      result = a + b;
      steps.push(`4. Comando 'return' devolve ${result}`);
      break;

    case 'subtracao':
      operatorSymbol = '-';
      rawCode = `def subtrair(a: float, b: float) -> float:\n    return a - b\n\nresultado = subtrair(${a}, ${b})`;
      steps.push(`2. Invocando função def subtrair(a, b)`);
      steps.push(`3. Executando operação binária nativa: ${a} - ${b}`);
      result = a - b;
      steps.push(`4. Comando 'return' devolve ${result}`);
      break;

    case 'multiplicacao':
      operatorSymbol = '*';
      rawCode = `def multiplicar(a: float, b: float) -> float:\n    return a * b\n\nresultado = multiplicar(${a}, ${b})`;
      steps.push(`2. Invocando função def multiplicar(a, b)`);
      steps.push(`3. Executando operação binária nativa: ${a} * ${b}`);
      result = a * b;
      steps.push(`4. Comando 'return' devolve ${result}`);
      break;

    case 'divisao':
      operatorSymbol = '/';
      rawCode = `def dividir(a: float, b: float):\n    if b == 0:\n        return "Erro: Divisão por zero!"\n    return a / b\n\nresultado = dividir(${a}, ${b})`;
      steps.push(`2. Invocando função def dividir(a, b)`);
      steps.push(`3. Checagem de segurança condicional: 'if b == 0:' (b = ${b})`);
      if (b === 0) {
        steps.push(`⚠️ ATENÇÃO: Condição satisfeita (b == 0). Em Python puro ocorreria ZeroDivisionError!`);
        steps.push(`4. Nossa função preveniu o travamento retornando mensagem amigável.`);
        result = 'Erro: Não é possível dividir por zero!';
        isError = true;
        errorType = 'ZeroDivisionError';
      } else {
        steps.push(`4. Denominador válido (${b} != 0). Executando divisão de ponto flutuante.`);
        result = a / b;
        steps.push(`5. Comando 'return' devolve ${result} (tipo float)`);
      }
      break;

    case 'potencia':
      operatorSymbol = '**';
      rawCode = `def potenciacao(a: float, b: float) -> float:\n    return a ** b\n\nresultado = potenciacao(${a}, ${b})`;
      steps.push(`2. Invocando operador nativo de potência em Python: ${a} ** ${b}`);
      result = Math.pow(a, b);
      steps.push(`3. Retorno: ${result}`);
      break;

    case 'modulo':
      operatorSymbol = '%';
      rawCode = `def modulo(a: float, b: float):\n    if b == 0:\n        raise ZeroDivisionError("Módulo por zero")\n    return a % b\n\nresultado = modulo(${a}, ${b})`;
      steps.push(`2. Checagem de divisor nulo: 'if b == 0:'`);
      if (b === 0) {
        isError = true;
        errorType = 'ZeroDivisionError';
        result = 'Erro: Módulo por zero é indefinido';
        steps.push(`⚠️ Divisão por zero em operador de módulo (%)`);
      } else {
        result = ((a % b) + b) % b; // Python modulo behavior for negative numbers
        steps.push(`3. Operador % calcula o resto: ${result}`);
      }
      break;

    case 'divisao_inteira':
      operatorSymbol = '//';
      rawCode = `def divisao_inteira(a: float, b: float):\n    if b == 0:\n        raise ZeroDivisionError("Divisão inteira por zero")\n    return a // b\n\nresultado = divisao_inteira(${a}, ${b})`;
      steps.push(`2. Checagem de divisor nulo: 'if b == 0:'`);
      if (b === 0) {
        isError = true;
        errorType = 'ZeroDivisionError';
        result = 'Erro: Divisão inteira por zero!';
      } else {
        result = Math.floor(a / b);
        steps.push(`3. Operador // descarta decimais e arredonda para baixo: ${result}`);
      }
      break;
  }

  return {
    operation: op,
    num1: a,
    num2: b,
    operatorSymbol,
    rawPythonCode: rawCode,
    steps,
    result,
    isError,
    errorType
  };
}
