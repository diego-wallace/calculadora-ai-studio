/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Copy, Check, Download, GitBranch, Github, Terminal } from 'lucide-react';

const README_CONTENT = `# 🧮 Calculadora em Python (Didática & 100% Documentada)

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

- ➕ **Adição (\`+\`)**: Soma de números inteiros ou decimais (\`float\`).
- ➖ **Subtração (\`-\`)**: Subtração com precisão decimal.
- ✖️ **Multiplicação (\`*\`)**: Produto entre dois valores.
- ➗ **Divisão (\`/\`)**: Divisão real com **prevenção de divisão por zero** (\`ZeroDivisionError\`).
- 🛡️ **Validação de Entrada (\`try/except\`)**: Se o usuário digitar letras ou símbolos inválidos, o programa avisa educadamente e solicita nova digitação em vez de travar (\`ValueError\`).
- 🔄 **Menu Interativo Contínuo (\`while True\`)**: Realize múltiplos cálculos em sequência até escolher explicitamente sair (\`0\`).
- 📦 **Múltiplos Níveis de Estudo**:
  - \`calculadora_basica.py\`: Modo procedural clássico (ideal para iniciantes).
  - \`calculadora_modular.py\`: Modo com funções de primeira classe, dicionário de operadores, potência (\`**\`) e resto (\`%\`).
  - \`calculadora_poo.py\`: Programação Orientada a Objetos com classe \`Calculadora\` e histórico de operações.

---

## 💡 Conceitos de Python Abordados no Código

Cada parte do código foi documentada para ensinar as melhores práticas oficiais da linguagem (**PEP 8**):

- **\`def\` e \`return\`**: Funções matemáticas modulares.
- **Type Hints (\`a: float\`)**: Tipagem estática para legibilidade.
- **\`float(input())\`**: Conversão explícita de texto para número.
- **\`try / except ValueError\`**: Tratamento de exceção de entrada de dados.
- **Prevenção de \`ZeroDivisionError\`**: Checagem de segurança condicional antes da divisão.
- **\`while True\` e \`break\`**: Laço de repetição com saída controlada.
- **\`f-strings\`**: Interpolação moderna de variáveis.
- **\`if __name__ == "__main__":\`**: Ponto de entrada canônico de módulos Python.

---

## 💻 Como Executar no seu Computador

\`\`\`bash
# 1. Verificar instalação do Python 3
python --version

# 2. Executar o script no terminal
python calculadora_basica.py
\`\`\`

---

## 🐙 Como Subir para o seu Repositório no GitHub

\`\`\`bash
# 1. Conecte ao seu repositório remoto no GitHub (substitua pela sua URL)
git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git

# 2. Envie o código e o README para a branch principal
git push -u origin main
\`\`\`
`;

export const ReadmeViewer: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [copiedGitCmd, setCopiedGitCmd] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(README_CONTENT);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleDownloadReadme = () => {
    const blob = new Blob([README_CONTENT], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'README.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const gitPushCommand = `git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git\ngit push -u origin main`;

  const handleCopyGitCmd = async () => {
    try {
      await navigator.clipboard.writeText(gitPushCommand);
      setCopiedGitCmd(true);
      setTimeout(() => setCopiedGitCmd(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <section className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sky-400 font-mono text-xs font-semibold">
            <Github className="w-4 h-4" />
            <span>Repositório Git Inicializado · Branch main</span>
          </div>
          <h3 className="text-base font-bold text-white tracking-tight mt-1">
            Arquivo README.md Criado & Commitado
          </h3>
          <p className="text-xs text-slate-400 mt-0.5 max-w-2xl">
            O arquivo <code className="text-emerald-400 font-mono">README.md</code> foi gerado com sucesso na raiz do projeto e já está comitado no histórico do repositório Git local.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copiado!' : 'Copiar README.md'}</span>
          </button>
          <button
            onClick={handleDownloadReadme}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-sm transition-all cursor-pointer whitespace-nowrap shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Baixar README.md</span>
          </button>
        </div>
      </div>

      {/* GitHub Sync Instruction Card */}
      <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold">
          <GitBranch className="w-4 h-4" />
          <span>Comando para Enviar ao seu GitHub Remoto:</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Como o repositório Git local já foi inicializado e os arquivos commitados na branch <code className="text-emerald-400 font-mono">main</code>, basta conectar a URL do seu repositório no GitHub:
        </p>
        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between font-mono text-xs text-slate-200">
          <pre className="overflow-x-auto whitespace-pre">
            <code>{gitPushCommand}</code>
          </pre>
          <button
            onClick={handleCopyGitCmd}
            className="ml-3 px-2 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition-colors cursor-pointer shrink-0"
          >
            {copiedGitCmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Markdown Preview Canvas */}
      <div className="bg-slate-950 rounded-xl border border-slate-800 shadow-xl overflow-hidden">
        <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
          <span className="text-slate-300 font-medium">README.md · Pré-visualização</span>
          <span className="text-slate-500">Markdown Format</span>
        </div>
        <pre className="p-5 font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed select-text whitespace-pre-wrap max-h-[600px] overflow-y-auto">
          {README_CONTENT}
        </pre>
      </div>
    </section>
  );
};
