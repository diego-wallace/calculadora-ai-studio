"""
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

    while True:
        op = input("\nDigite o operador desejado (ou 'sair'): ").strip()
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
            print(f"\n>>> Resultado de {v1} {op} {v2} = {res}")
        except ValueError:
            print("Erro: digite apenas valores numéricos!")


if __name__ == "__main__":
    main()
