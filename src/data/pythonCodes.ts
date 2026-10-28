/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface LineAnnotation {
  lines: number[];
  title: string;
  concept: string;
  explanation: string;
  pep8Tip?: string;
  commonMistake?: string;
}

export interface PythonCodeVariant {
  id: 'iniciante' | 'modular' | 'poo';
  title: string;
  subtitle: string;
  level: string;
  filename: string;
  code: string;
  annotations: LineAnnotation[];
}

export const pythonCalculatorCodes: PythonCodeVariant[] = [
  {
    id: 'iniciante',
    title: 'Modo Iniciante (Estruturado & Funções)',
    subtitle: 'O formato clássico ideal para quem está começando a aprender Python.',
    level: 'Iniciante',
    filename: 'calculadora_basica.py',
    code: `"""
=============================================================================
PROJETO: Calculadora Básica em Python
OBJETIVO: Praticar funções, operadores matemáticos, condicionais e laços.
AUTOR: Estudante de Python
VERSÃO: Python 3.8+
=============================================================================
"""

# ===========================================================================
# 1. DEFINIÇÃO DAS FUNÇÕES MATEMÁTICAS
# ===========================================================================
# Em Python, usamos a palavra-chave 'def' para criar uma função.
# As funções recebem 'parâmetros' (entradas) e utilizam 'return' para
# devolver o resultado calculado para quem chamou a função.

def somar(a: float, b: float) -> float:
    """
    Recebe dois números reais (float) e retorna a soma de a + b.
    """
    return a + b


def subtrair(a: float, b: float) -> float:
    """
    Recebe dois números reais e retorna a diferença de a - b.
    """
    return a - b


def multiplicar(a: float, b: float) -> float:
    """
    Recebe dois números reais e retorna o produto de a * b.
    """
    return a * b


def dividir(a: float, b: float):
    """
    Recebe dois números reais e calcula a divisão a / b.
    IMPORTANTE: Na matemática e na programação, não é possível dividir por zero!
    Fazemos uma verificação prévia para evitar o erro ZeroDivisionError.
    """
    if b == 0:
        # Retorna uma mensagem de aviso se o divisor for zero
        return "Erro: Não é possível dividir nenhum número por zero!"
    return a / b


# ===========================================================================
# 2. FUNÇÃO PARA EXIBIR O MENU DE OPÇÕES
# ===========================================================================
def exibir_menu() -> None:
    """
    Imprime na tela as opções disponíveis para o usuário.
    Separar a interface (menu) da lógica torna o código muito mais limpo.
    """
    print("\\n" + "=" * 40)
    print("       CALCULADORA EM PYTHON")
    print("=" * 40)
    print(" [ 1 ] Somar (+)")
    print(" [ 2 ] Subtrair (-)")
    print(" [ 3 ] Multiplicar (*)")
    print(" [ 4 ] Dividir (/)")
    print(" [ 0 ] Sair do Programa")
    print("=" * 40)


# ===========================================================================
# 3. FUNÇÃO AUXILIAR PARA LEITURA SEGURA DE NÚMEROS
# ===========================================================================
def ler_numero(mensagem: str) -> float:
    """
    Solicita um número ao usuário e trata possíveis erros de digitação.
    Se o usuário digitar texto ('abc'), o 'try/except' captura o ValueError
    e pede a digitação novamente em vez de encerrar o programa de forma abrupta.
    """
    while True:
        try:
            # input() lê o que o usuário digita como texto (string).
            # float() converte esse texto em um número decimal.
            entrada = input(mensagem)
            return float(entrada)
        except ValueError:
            print("Entrada inválida! Digite apenas números válidos (ex: 10 ou 3.14).")


# ===========================================================================
# 4. FLUXO PRINCIPAL DO PROGRAMA
# ===========================================================================
def main():
    """
    Função principal que orquestra o laço de repetição da calculadora.
    """
    print("Seja bem-vindo(a) à sua Calculadora em Python!")

    # 'while True' cria um laço infinito que só encerra quando executamos 'break'
    while True:
        exibir_menu()
        opcao = input("Escolha a operação desejada (0 a 4): ").strip()

        # Verifica se o usuário escolheu sair
        if opcao == "0":
            print("\\nObrigado por utilizar a calculadora. Bons estudos em Python!")
            break  # Interrompe o laço while e finaliza o programa

        # Verifica se a opção digitada está entre as opções válidas
        if opcao not in ("1", "2", "3", "4"):
            print("\\nOpção inválida! Escolha um número de 0 a 4.")
            continue  # Volta para o início do laço while

        # Se a opção for válida, solicita os dois números
        print("\\n--- Digite os valores para o cálculo ---")
        num1 = ler_numero("Digite o 1º número: ")
        num2 = ler_numero("Digite o 2º número: ")

        # Estrutura condicional (if / elif) para decidir qual função executar
        if opcao == "1":
            resultado = somar(num1, num2)
            operador = "+"
        elif opcao == "2":
            resultado = subtrair(num1, num2)
            operador = "-"
        elif opcao == "3":
            resultado = multiplicar(num1, num2)
            operador = "*"
        elif opcao == "4":
            resultado = dividir(num1, num2)
            operador = "/"

        # Exibição elegante do resultado usando f-strings (format string)
        print("\\n" + "-" * 40)
        if isinstance(resultado, str):
            # Se 'resultado' for string, significa que foi uma mensagem de erro
            print(f"Resultado: {resultado}")
        else:
            # {num1:g} remove zeros desnecessários (ex: 5.0 vira 5)
            print(f"Cálculo: {num1:g} {operador} {num2:g} = {resultado:g}")
        print("-" * 40)

        # Pausa para o usuário ler antes do próximo ciclo
        input("\\nPressione ENTER para continuar...")


# ===========================================================================
# 5. PONTO DE ENTRADA DO ARQUIVO PYTHON
# ===========================================================================
# Esta verificação garante que main() só é chamada se o arquivo for executado
# diretamente pelo comando: python calculadora_basica.py
if __name__ == "__main__":
    main()
`,
    annotations: [
      {
        lines: [1, 2, 3, 4, 5, 6, 7, 8],
        title: 'Docstring do Módulo',
        concept: 'Documentação Inicial',
        explanation: 'Três aspas duplas (""") abrem uma docstring em Python. Serve para explicar o propósito geral do arquivo, requisitos e informações do autor.',
        pep8Tip: 'Coloque sempre docstrings no topo de arquivos e funções importantes (PEP 257).'
      },
      {
        lines: [17, 18, 19, 20, 21],
        title: 'Definição da Função somar()',
        concept: 'Funções e Parâmetros',
        explanation: "'def' cria a função. Os parâmetros 'a: float, b: float' indicam que a função espera números decimais. '-> float' indica que ela devolverá um número decimal.",
        pep8Tip: 'Nomes de funções e variáveis em Python devem seguir snake_case (letras minúsculas separadas por underline).',
        commonMistake: 'Esquecer os dois pontos (:) no final da linha def gera um erro de sintaxe imediato (SyntaxError).'
      },
      {
        lines: [38, 39, 40, 41, 42, 43, 44, 45, 46, 47],
        title: 'Prevenção de Divisão por Zero',
        concept: 'Validação e Controle de Fluxo',
        explanation: 'Se tentar fazer 10 / 0, o interpretador Python lança uma exceção chamada ZeroDivisionError e interrompe o programa. Por isso, checamos if b == 0: antes.',
        commonMistake: 'Nunca confie que o usuário não digitará zero no denominador. Trate sempre esse caso especial!'
      },
      {
        lines: [68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79],
        title: 'Tratamento de Exceções com try / except',
        concept: 'Robustez de Entrada de Dados',
        explanation: "input() sempre devolve texto (str). Ao tentar fazer float('texto'), o Python lança ValueError. O bloco try/except captura esse erro e permite que o programa continue rodando sem travar.",
        pep8Tip: 'Nunca use um "except:" genérico sem especificar a exceção. Aqui usamos especificamente "except ValueError:".'
      },
      {
        lines: [90, 91, 92, 93],
        title: 'Laço Infinito Controlado com while True',
        concept: 'Estruturas de Repetição',
        explanation: "'while True' mantém a calculadora ativa repetidamente até que o usuário decida sair explicitamente através do comando 'break'.",
        commonMistake: 'Se esquecer de incluir um "break" acessível, o usuário fica preso em um loop infinito.'
      },
      {
        lines: [129, 130, 131, 132, 133, 134, 135, 136, 137],
        title: 'Formatação Moderna com f-strings',
        concept: 'Interpolação de Strings',
        explanation: "O prefixo f antes das aspas (f'...') permite injetar variáveis e expressões diretamente dentro das chaves {num1} e {resultado:g}, deixando o código muito mais legível.",
        pep8Tip: 'f-strings (introduzidas no Python 3.6) são a forma recomendada oficial da linguagem, mais rápida que % e .format().'
      },
      {
        lines: [145, 146, 147],
        title: 'A Construção if __name__ == "__main__":',
        concept: 'Modularidade e Padrão Python',
        explanation: 'Garante que o código de main() só executa se o arquivo for rodado diretamente no terminal, e não se for importado por outro módulo Python.',
        pep8Tip: 'Este é o padrão canônico adotado por todos os desenvolvedores profissionais de Python.'
      }
    ]
  },
  {
    id: 'modular',
    title: 'Modo Dicionário & Operadores Expandidos',
    subtitle: 'Código avançado utilizando dicionário de funções e operadores como potência e resto.',
    level: 'Intermediário',
    filename: 'calculadora_modular.py',
    code: `"""
=============================================================================
PROJETO: Calculadora Modular com Dicionário de Operações
CONCEITOS: Funções de primeira classe, type hints, operadores extras
VERSÃO: Python 3.10+
=============================================================================
"""
from typing import Callable, Dict, Tuple


def somar(a: float, b: float) -> float:
    """Retorna a soma de a e b."""
    return a + b


def subtrair(a: float, b: float) -> float:
    """Retorna a subtração de a menos b."""
    return a - b


def multiplicar(a: float, b: float) -> float:
    """Retorna o produto de a multiplicado por b."""
    return a * b


def dividir(a: float, b: float) -> float:
    """Retorna a divisão real. Lança ZeroDivisionError se b for 0."""
    if b == 0:
        raise ZeroDivisionError("Divisor não pode ser zero.")
    return a / b


def potenciacao(a: float, b: float) -> float:
    """Retorna a elevado à potência b (operador **)."""
    return a ** b


def modulo(a: float, b: float) -> float:
    """Retorna o resto da divisão de a por b (operador %)."""
    if b == 0:
        raise ZeroDivisionError("Módulo por zero é indefinido.")
    return a % b


def divisao_inteira(a: float, b: float) -> float:
    """Retorna a parte inteira do quociente (operador //)."""
    if b == 0:
        raise ZeroDivisionError("Divisão inteira por zero é indefinida.")
    return a // b


# ===========================================================================
# DICIONÁRIO DE OPERAÇÕES (First-Class Functions em Python)
# Em Python, funções são objetos! Podemos guardá-las dentro de dicionários.
# ===========================================================================
OPERACOES: Dict[str, Tuple[str, Callable[[float, float], float]]] = {
    "+":  ("Adição", somar),
    "-":  ("Subtração", subtrair),
    "*":  ("Multiplicação", multiplicar),
    "/":  ("Divisão Real", dividir),
    "//": ("Divisão Inteira", divisao_inteira),
    "%":  ("Resto / Módulo", modulo),
    "**": ("Potenciação", potenciacao),
}


def executar_calculo(operador: str, a: float, b: float):
    """Localiza a função no dicionário e executa de forma dinâmica."""
    if operador not in OPERACOES:
        return f"Operador '{operador}' desconhecido."

    nome_op, funcao = OPERACOES[operador]
    try:
        resultado = funcao(a, b)
        return resultado
    except ZeroDivisionError as erro:
        return f"Erro Matemático: {erro}"


def main():
    print("Calculadora Modular em Python")
    print("Operadores suportados:", "  ".join(OPERACOES.keys()))
    
    # Exemplo interativo rápido
    while True:
        op = input("\\nDigite o operador desejado (ou 'sair'): ").strip()
        if op.lower() == "sair":
            print("Até logo!")
            break
            
        if op not in OPERACOES:
            print("Operador inválido! Escolha entre:", ", ".join(OPERACOES.keys()))
            continue

        try:
            v1 = float(input("Primeiro valor: "))
            v2 = float(input("Segundo valor: "))
            res = executar_calculo(op, v1, v2)
            print(f"\\n>>> Resultado de {v1} {op} {v2} = {res}")
        except ValueError:
            print("Erro: digite apenas valores numéricos!")


if __name__ == "__main__":
    main()
`,
    annotations: [
      {
        lines: [49, 50, 51, 52, 53, 54, 55, 56, 57],
        title: 'First-Class Functions & Dicionários',
        concept: 'Funções de Primeira Classe',
        explanation: 'Em Python, funções podem ser passadas como argumentos ou armazenadas em listas e dicionários sem parênteses. Ao chamar funcao(a, b), executamos a função armazenada!',
        pep8Tip: 'Constantes de módulo devem ser nomeadas em MAIÚSCULAS_COM_UNDERSCORE (como OPERACOES).'
      },
      {
        lines: [35, 36, 37, 38, 39],
        title: 'Operador de Potenciação (**)',
        concept: 'Operadores Matemáticos Python',
        explanation: 'Em muitas linguagens usa-se Math.pow(a, b) ou ^. Em Python o operador nativo de potência é ** (dois asteriscos), como em 2 ** 3 = 8.'
      }
    ]
  },
  {
    id: 'poo',
    title: 'Modo Orientado a Objetos (Classe Calculadora)',
    subtitle: 'Estruturação com classes, métodos, encapsulamento e histórico de operações.',
    level: 'Avançado',
    filename: 'calculadora_poo.py',
    code: `"""
=============================================================================
PROJETO: Calculadora Orientada a Objetos (POO)
CONCEITOS: Classes, Instâncias, Métodos, Histórico em Lista
VERSÃO: Python 3.8+
=============================================================================
"""
from typing import List


class Calculadora:
    """
    Classe que representa uma calculadora com memória e histórico.
    """

    def __init__(self, proprietario: str = "Estudante"):
        """
        Método construtor. Inicializa os atributos da instância.
        'self' refere-se ao próprio objeto sendo criado na memória.
        """
        self.proprietario = proprietario
        self.historico: List[str] = []
        self.memoria: float = 0.0

    def somar(self, a: float, b: float) -> float:
        resultado = a + b
        self._registrar(a, "+", b, resultado)
        return resultado

    def subtrair(self, a: float, b: float) -> float:
        resultado = a - b
        self._registrar(a, "-", b, resultado)
        return resultado

    def multiplicar(self, a: float, b: float) -> float:
        resultado = a * b
        self._registrar(a, "*", b, resultado)
        return resultado

    def dividir(self, a: float, b: float) -> float:
        if b == 0:
            raise ZeroDivisionError("Divisão por zero não é permitida.")
        resultado = a / b
        self._registrar(a, "/", b, resultado)
        return resultado

    def _registrar(self, a: float, op: str, b: float, res: float) -> None:
        """Método auxiliar interno (prefixo _) para registrar no histórico."""
        registro = f"{a:g} {op} {b:g} = {res:g}"
        self.historico.append(registro)
        self.memoria = res

    def ver_historico(self) -> None:
        """Exibe todas as operações já realizadas nesta sessão."""
        if not self.historico:
            print("Histórico vazio.")
            return
        print(f"\\nHistórico de Cálculos de {self.proprietario}:")
        for i, item in enumerate(self.historico, 1):
            print(f"  {i}. {item}")


# Exemplo de uso da classe:
if __name__ == "__main__":
    calc = Calculadora(proprietario="Lucas")
    print(f"Calculadora criada para {calc.proprietario}!")
    
    r1 = calc.somar(10, 5)
    r2 = calc.multiplicar(r1, 2)
    r3 = calc.dividir(r2, 3)
    
    calc.ver_historico()
`,
    annotations: [
      {
        lines: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        title: 'A Classe e o Método __init__',
        concept: 'Programação Orientada a Objetos',
        explanation: "'class Calculadora:' cria o molde. O método '__init__' é o construtor executado quando instanciamos a classe. 'self' vincula as variáveis à instância criada.",
        pep8Tip: 'Nomes de classes usam CamelCase (PrimeiraLetraMaiuscula), enquanto funções usam snake_case.'
      },
      {
        lines: [44, 45, 46, 47, 48],
        title: 'Métodos Internos com Prefixo _',
        concept: 'Encapsulamento e Convenção',
        explanation: "Em Python, prefixar um método com sublinhado simples (_registrar) é a convenção que avisa outros programadores que se trata de um método interno ou protegido.",
        pep8Tip: 'Evite chamar métodos que começam com _ diretamente de fora da classe.'
      }
    ]
  }
];

export interface OperatorInfo {
  symbol: string;
  name: string;
  pythonSyntax: string;
  example: string;
  result: string;
  description: string;
  tip: string;
}

export const pythonOperators: OperatorInfo[] = [
  {
    symbol: '+',
    name: 'Adição',
    pythonSyntax: 'a + b',
    example: '15.5 + 4.5',
    result: '20.0',
    description: 'Soma dois números. Se usado com textos (strings), realiza concatenação ("Python" + "3" -> "Python3").',
    tip: 'Lembre-se: em Python, somar número com string diretamente gera TypeError.'
  },
  {
    symbol: '-',
    name: 'Subtração',
    pythonSyntax: 'a - b',
    example: '20 - 7',
    result: '13',
    description: 'Subtrai o segundo valor do primeiro. Também pode ser usado como operador unário de negação (-x).',
    tip: 'Subtrações com float podem ter pequenas imprecisões de ponto flutuante (ex: 0.3 - 0.1 ≈ 0.19999999999999998).'
  },
  {
    symbol: '*',
    name: 'Multiplicação',
    pythonSyntax: 'a * b',
    example: '6 * 7',
    result: '42',
    description: 'Multiplica dois números. Se usado com uma string e um número inteiro, repete a string ("=" * 10 -> "==========").',
    tip: 'Muito útil para criar linhas divisórias em menus de console com print("-" * 30).'
  },
  {
    symbol: '/',
    name: 'Divisão Real',
    pythonSyntax: 'a / b',
    example: '10 / 2',
    result: '5.0',
    description: 'Divide dois números. No Python 3, a barra única sempre devolve um número float (decimal), mesmo se a divisão for exata.',
    tip: 'Divisão por zero lança ZeroDivisionError e precisa ser prevenida ou tratada.'
  },
  {
    symbol: '//',
    name: 'Divisão Inteira',
    pythonSyntax: 'a // b',
    example: '10 // 3',
    result: '3',
    description: 'Realiza a divisão e descarta a parte fracionária (arredonda para baixo para o menor inteiro).',
    tip: 'Ideal quando você quer saber quantas vezes um valor cabe inteiramente em outro.'
  },
  {
    symbol: '%',
    name: 'Módulo (Resto)',
    pythonSyntax: 'a % b',
    example: '10 % 3',
    result: '1',
    description: 'Retorna o resto da divisão de a por b. Essencial para verificar se um número é par (n % 2 == 0) ou ímpar.',
    tip: 'Se o resto da divisão por 2 for 0, o número é par; se for 1, é ímpar.'
  },
  {
    symbol: '**',
    name: 'Potenciação',
    pythonSyntax: 'a ** b',
    example: '2 ** 3',
    result: '8',
    description: 'Eleva a base ao expoente. Em Python não usamos ^ para potência (o símbolo ^ é o operador binário XOR).',
    tip: 'Para calcular raiz quadrada em Python, você pode usar expoente fracionário: 16 ** 0.5 = 4.0!'
  }
];

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const pythonQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Em Python 3, qual é o tipo de dado retornado pela operação 10 / 2?',
    options: ['int (inteiro)', 'float (ponto flutuante / decimal)', 'str (texto)', 'bool (booleano)'],
    correctIndex: 1,
    explanation: 'No Python 3, a divisão comum com barra única (/) sempre resulta em um float (neste caso, 5.0), mesmo quando a divisão é exata. Para obter um inteiro, usa-se a divisão inteira (//).'
  },
  {
    id: 2,
    question: 'O que acontece no Python se tentarmos executar 15 / 0 sem nenhum tratamento de erro?',
    options: [
      'Retorna infinito (inf)',
      'Retorna zero (0)',
      'Lança a exceção ZeroDivisionError e interrompe o programa',
      'Retorna None'
    ],
    correctIndex: 2,
    explanation: 'Diferente de algumas linguagens que retornam Infinity, o Python interrompe a execução com a exceção ZeroDivisionError, tornando fundamental a validação if b == 0: ou bloco try/except.'
  },
  {
    id: 3,
    question: 'Qual é o operador nativo do Python para calcular a potência (ex: 2 elevado a 3)?',
    options: ['^ (circunflexo)', 'pow (apenas função)', '** (dois asteriscos)', '^^ (dois circunflexos)'],
    correctIndex: 2,
    explanation: 'O operador nativo de exponenciação em Python é ** (dois asteriscos). O símbolo ^ em Python é o operador bit a bit XOR.'
  },
  {
    id: 4,
    question: 'Por que usamos float(input("Digite um número: ")) em vez de apenas input()?',
    options: [
      'Porque a função input() retorna sempre uma string (texto) e não podemos fazer contas aritméticas diretamente com strings.',
      'Porque float() acelera a memória do computador.',
      'Porque input() só aceita números inteiros por padrão.',
      'Porque o Python não permite variáveis sem definir float antes.'
    ],
    correctIndex: 0,
    explanation: 'A função input() sempre lê dados como texto (string). Se tentarmos somar "10" + "5", teremos "105" (concatenação) em vez de 15. A conversão explícita com float() transforma o texto em número decimal.'
  }
];
