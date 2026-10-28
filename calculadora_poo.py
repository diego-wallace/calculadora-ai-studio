"""
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
        print(f"\nHistórico de Cálculos de {self.proprietario}:")
        for i, item in enumerate(self.historico, 1):
            print(f"  {i}. {item}")


if __name__ == "__main__":
    calc = Calculadora(proprietario="Lucas")
    print(f"Calculadora criada para {calc.proprietario}!")

    r1 = calc.somar(10, 5)
    r2 = calc.multiplicar(r1, 2)
    r3 = calc.dividir(r2, 3)

    calc.ver_historico()
