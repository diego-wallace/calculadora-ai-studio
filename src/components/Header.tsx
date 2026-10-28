/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Download, Terminal } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  onDownloadCode: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onSelectTab, onDownloadCode }) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Terminal className="w-4 h-4" />
          </div>
          <a
            href="#codigo"
            onClick={(e) => {
              e.preventDefault();
              onSelectTab('codigo');
            }}
            className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:text-emerald-400 transition-colors"
          >
            PyCalc <span className="text-emerald-400 font-mono text-sm font-semibold">.py</span>
          </a>
        </div>

        {/* Zone 2: 4-5 single-line navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => onSelectTab('codigo')}
            className={`whitespace-nowrap shrink-0 hover:text-white transition-colors cursor-pointer ${
              activeTab === 'codigo' ? 'text-emerald-400 font-semibold' : 'text-slate-400'
            }`}
          >
            Código Documentado
          </button>
          <button
            onClick={() => onSelectTab('terminal')}
            className={`whitespace-nowrap shrink-0 hover:text-white transition-colors cursor-pointer ${
              activeTab === 'terminal' ? 'text-emerald-400 font-semibold' : 'text-slate-400'
            }`}
          >
            Terminal Interativo
          </button>
          <button
            onClick={() => onSelectTab('simulador')}
            className={`whitespace-nowrap shrink-0 hover:text-white transition-colors cursor-pointer ${
              activeTab === 'simulador' ? 'text-emerald-400 font-semibold' : 'text-slate-400'
            }`}
          >
            Simulador de Execução
          </button>
          <button
            onClick={() => onSelectTab('operadores')}
            className={`whitespace-nowrap shrink-0 hover:text-white transition-colors cursor-pointer ${
              activeTab === 'operadores' ? 'text-emerald-400 font-semibold' : 'text-slate-400'
            }`}
          >
            Guia de Operadores
          </button>
          <button
            onClick={() => onSelectTab('quiz')}
            className={`whitespace-nowrap shrink-0 hover:text-white transition-colors cursor-pointer ${
              activeTab === 'quiz' ? 'text-emerald-400 font-semibold' : 'text-slate-400'
            }`}
          >
            Desafios Python
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onDownloadCode}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-sm hover:shadow-emerald-500/20 transition-all cursor-pointer whitespace-nowrap shrink-0 active:scale-95"
            title="Baixar arquivo calculadora_basica.py pronto para rodar"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Baixar .py</span>
          </button>
        </div>
      </div>
    </header>
  );
};
