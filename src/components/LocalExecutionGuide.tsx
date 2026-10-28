/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Download, Terminal, Laptop, CheckCircle2, Copy, Check } from 'lucide-react';

interface LocalExecutionGuideProps {
  onDownloadCode: () => void;
}

export const LocalExecutionGuide: React.FC<LocalExecutionGuideProps> = ({ onDownloadCode }) => {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const copyCommand = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight">
            Como Rodar a Calculadora no seu Próprio Computador
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Siga este passo a passo para executar o arquivo <code className="text-emerald-400 font-mono">calculadora_basica.py</code> localmente no Windows, macOS ou Linux.
          </p>
        </div>

        <button
          onClick={onDownloadCode}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-sm transition-all cursor-pointer whitespace-nowrap shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Baixar calculadora_basica.py</span>
        </button>
      </div>

      {/* Steps List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Step 1 */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono text-xs font-bold">
            01
          </div>
          <h4 className="text-sm font-bold text-white">Verificar o Python</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Abra seu terminal ou Prompt de Comando (CMD) e teste se o Python 3 está instalado:
          </p>
          <div className="p-2 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between font-mono text-xs text-slate-200">
            <span>python --version</span>
            <button
              onClick={() => copyCommand('python --version')}
              className="text-slate-500 hover:text-emerald-400 p-1 cursor-pointer"
              title="Copiar comando"
            >
              {copiedCmd === 'python --version' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
          <p className="text-[11px] text-slate-500">
            Se não tiver instalado, baixe gratuitamente no site oficial <strong className="text-slate-400">python.org</strong>.
          </p>
        </div>

        {/* Step 2 */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono text-xs font-bold">
            02
          </div>
          <h4 className="text-sm font-bold text-white">Salvar o Arquivo</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Baixe o arquivo <code className="text-emerald-400 font-mono">calculadora_basica.py</code> e salve em uma pasta de estudos (ex: <code className="text-slate-300 font-mono">Projetos/Python</code>).
          </p>
          <div className="p-2 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs text-slate-300">
            📁 MeusProjetos/
            <div className="pl-3 text-emerald-400">└── calculadora_basica.py</div>
          </div>
          <p className="text-[11px] text-slate-500">
            Você pode abrir e editar com VS Code, PyCharm ou qualquer editor de texto.
          </p>
        </div>

        {/* Step 3 */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono text-xs font-bold">
            03
          </div>
          <h4 className="text-sm font-bold text-white">Navegar até a Pasta</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            No terminal, navegue até a pasta onde salvou o arquivo:
          </p>
          <div className="p-2 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between font-mono text-xs text-slate-200">
            <span>cd MeusProjetos</span>
            <button
              onClick={() => copyCommand('cd MeusProjetos')}
              className="text-slate-500 hover:text-emerald-400 p-1 cursor-pointer"
              title="Copiar comando"
            >
              {copiedCmd === 'cd MeusProjetos' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
          <p className="text-[11px] text-slate-500">
            Dica: No VS Code, basta clicar com o botão direito no arquivo e escolher "Executar arquivo Python no Terminal".
          </p>
        </div>

        {/* Step 4 */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono text-xs font-bold">
            04
          </div>
          <h4 className="text-sm font-bold text-white">Executar o Script</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Execute o comando Python para iniciar a calculadora interativa:
          </p>
          <div className="p-2 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between font-mono text-xs text-emerald-400">
            <span>python calculadora_basica.py</span>
            <button
              onClick={() => copyCommand('python calculadora_basica.py')}
              className="text-slate-500 hover:text-emerald-400 p-1 cursor-pointer"
              title="Copiar comando"
            >
              {copiedCmd === 'python calculadora_basica.py' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
          <p className="text-[11px] text-slate-500">
            No macOS/Linux, utilize <code className="text-slate-400 font-mono">python3 calculadora_basica.py</code>.
          </p>
        </div>
      </div>
    </section>
  );
};
