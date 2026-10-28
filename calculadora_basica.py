"""
=============================================================================
PROJETO: Calculadora Básica em Python
OBJETIVO: Praticar funções (def), tipos numéricos (float), condicionais
          (if/elif/else), prevenção de erros e repetição (while).
AUTOR: Estudante de Python
VERSÃO DO PYTHON: 3.8+
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
    print("\n" + "=" * 40)
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
            print("\nObrigado por utilizar a calculadora. Bons estudos em Python!")
            break  # Interrompe o laço while e finaliza o programa

        # Verifica se a opção digitada está entre as opções válidas
        if opcao not in ("1", "2", "3", "4"):
            print("\nOpção inválida! Escolha um número de 0 a 4.")
            continue  # Volta para o início do laço while

        # Se a opção for válida, solicita os dois números
        print("\n--- Digite os valores para o cálculo ---")
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
        print("\n" + "-" * 40)
        if isinstance(resultado, str):
            # Se 'resultado' for string, significa que foi uma mensagem de erro
            print(f"Resultado: {resultado}")
        else:
            # {num1:g} remove zeros desnecessários (ex: 5.0 vira 5)
            print(f"Cálculo: {num1:g} {operador} {num2:g} = {resultado:g}")
        print("-" * 40)

        # Pausa para o usuário ler antes do próximo ciclo
        input("\nPressione ENTER para continuar...")


# ===========================================================================
# 5. PONTO DE ENTRADA DO ARQUIVO PYTHON
# ===========================================================================
# Esta verificação garante que main() só é chamada se o arquivo for executado
# diretamente pelo comando: python calculadora_basica.py
if __name__ == "__main__":
    main()
