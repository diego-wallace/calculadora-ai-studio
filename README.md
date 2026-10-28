# 🧮 Calculadora em Python (Didática & 100% Documentada)

> Projeto de uma calculadora completa em Python desenvolvida especialmente para fins de estudo e fixação dos conceitos fundamentais da linguagem: funções, tipos de dados, condicionais, laços de repetição e tratamento de erros.

---

## 📌 Sumário
- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Conceitos de Python Abordados](#-conceitos-de-python-abordados)
- [Estrutura dos Arquivos](#-estrutura-dos-arquivos)
- [Como Executar no seu Computador](#-como-executar-no-seu-computador)
- [Exemplo de Uso no Terminal](#-exemplo-de-uso-no-terminal)
- [Como Subir para o seu Repositório no GitHub](#-como-subir-para-o-seu-repositório-no-github)
- [Licença](#-licença)

---

## 🚀 Sobre o Projeto

Este repositório contém implementações de uma calculadora em Python com comentários explicativos em cada linha do código. Ele foi projetado para estudantes iniciantes e intermediários que desejam compreender não apenas *o que* o código faz, mas *por que* e *como* o interpretador Python executa cada instrução.

Além dos scripts Python puros prontos para rodar no terminal, o repositório inclui uma **interface web interativa com console embutido, simulador visual passo a passo e quiz de fixação**.

---

## ⚙️ Funcionalidades

- ➕ **Adição (`+`)**: Soma de números inteiros ou decimais (`float`).
- ➖ **Subtração (`-`)**: Subtração com precisão decimal.
- ✖️ **Multiplicação (`*`)**: Produto entre dois valores.
- ➗ **Divisão (`/`)**: Divisão real com **prevenção de divisão por zero** (`ZeroDivisionError`).
- 🛡️ **Validação de Entrada (`try/except`)**: Se o usuário digitar letras ou símbolos inválidos, o programa avisa educadamente e solicita nova digitação em vez de travar (`ValueError`).
- 🔄 **Menu Interativo Contínuo (`while True`)**: Realize múltiplos cálculos em sequência até escolher explicitamente sair (`0`).
- 📦 **Múltiplos Níveis de Estudo**:
  - `calculadora_basica.py`: Modo procedural clássico (ideal para iniciantes).
  - `calculadora_modular.py`: Modo com funções de primeira classe, dicionário de operadores, potência (`**`) e resto (`%`).
  - `calculadora_poo.py`: Programação Orientada a Objetos com classe `Calculadora` e histórico de operações.

---

## 💡 Conceitos de Python Abordados no Código

Cada parte do código foi documentada para ensinar as melhores práticas oficiais da linguagem (**PEP 8**):

| Conceito Python | Onde é usado | Por que é importante? |
| :--- | :--- | :--- |
| **`def` e `return`** | Funções matemáticas | Modulariza o código em blocos reutilizáveis com responsabilidade única. |
| **Type Hints (`a: float`)** | Assinatura das funções | Indica claramente aos desenvolvedores quais tipos de dados a função espera e retorna. |
| **`float(input())`** | Função `ler_numero` | `input()` sempre retorna texto (`str`). A conversão para `float` permite operações aritméticas. |
| **`try / except ValueError`** | Validação de entrada | Impede travamento abrupto do programa caso o usuário digite texto em vez de números. |
| **Prevenção de `ZeroDivisionError`** | Função `dividir` | No Python, dividir qualquer número por `0` gera uma exceção fatal. Checamos `if b == 0:` antes da operação. |
| **`while True` e `break`** | Laço principal | Mantém o menu ativo em repetição contínua até o usuário escolher `0` (sair). |
| **`f-strings` (`f"{a} + {b} = {res}"`)** | Exibição na tela | Padrão moderno e eficiente do Python para interpolação de variáveis em textos. |
| **`if __name__ == "__main__":`** | Ponto de entrada | Garante que o programa só execute quando chamado diretamente pelo terminal. |

---

## 📁 Estrutura dos Arquivos

```text
├── calculadora_basica.py    # Script principal documentado (Iniciante)
├── calculadora_modular.py   # Versão modular com dicionário e operadores extras
├── calculadora_poo.py       # Versão com Orientação a Objetos (Classes e Métodos)
├── README.md                # Documentação completa do projeto
├── package.json             # Dependências da interface web de apoio
└── src/                     # Interface web interativa (React + Tailwind)
```

---

## 💻 Como Executar no seu Computador

### 1. Pré-requisitos
Certifique-se de ter o **Python 3.8 ou superior** instalado em seu computador. Para verificar:

```bash
python --version
# ou no macOS / Linux:
python3 --version
```

### 2. Baixar ou Clonar o Repositório
```bash
git clone https://github.com/SEU_USUARIO/calculadora-python.git
cd calculadora-python
```

### 3. Executar o Script no Terminal
Basta rodar o comando:

```bash
# Versão básica (recomendada para estudo):
python calculadora_basica.py

# Versão modular (com dicionário de funções):
python calculadora_modular.py

# Versão orientada a objetos:
python calculadora_poo.py
```

*(No macOS ou Linux, utilize `python3` no lugar de `python`)*.

---

## 🖥️ Exemplo de Uso no Terminal

```text
Seja bem-vindo(a) à sua Calculadora em Python!

========================================
       CALCULADORA EM PYTHON
========================================
 [ 1 ] Somar (+)
 [ 2 ] Subtrair (-)
 [ 3 ] Multiplicar (*)
 [ 4 ] Dividir (/)
 [ 0 ] Sair do Programa
========================================
Escolha a operação desejada (0 a 4): 1

--- Digite os valores para o cálculo ---
Digite o 1º número: 15.5
Digite o 2º número: 4.5

----------------------------------------
Cálculo: 15.5 + 4.5 = 20
----------------------------------------

Pressione ENTER para continuar...
```

---

## 🐙 Como Subir para o seu Repositório no GitHub

Se você já possui um repositório criado no GitHub (por exemplo, `https://github.com/seu-usuario/calculadora-python`), siga os passos abaixo para enviar todos os arquivos:

```bash
# 1. Inicialize o repositório Git local (caso ainda não esteja inicializado)
git init

# 2. Adicione todos os arquivos ao controle de versão
git add .

# 3. Crie o primeiro commit com uma mensagem descritiva
git commit -m "feat: calculadora em python documentada e README explicativo"

# 4. Renomeie a branch principal para main
git branch -M main

# 5. Conecte ao seu repositório remoto no GitHub (substitua pela sua URL)
git remote add origin https://github.com/seu-usuario/calculadora-python.git

# 6. Envie o código para o GitHub
git push -u origin main
```

---

## 📄 Licença

Este projeto é de código aberto sob a licença **MIT** — sinta-se à vontade para utilizar, modificar e expandir nos seus estudos de programação!
