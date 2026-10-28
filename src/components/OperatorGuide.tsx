/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { pythonOperators, OperatorInfo } from '../data/pythonCodes';
import { BookOpen, Sparkles, Lightbulb, Check } from 'lucide-react';

export const OperatorGuide: React.FC = () => {
  const [selectedOp, setSelectedOp] = useState<OperatorInfo>(pythonOperators[0]);
  const [customA, setCustomA] = useState<number>(10);
  const [customB, setCustomB] = useState<number>(3);

  const calculateCustom = (symbol: string, a: number, b: number) => {
    switch (symbol) {
      case '+':
        return (a + b).toString();
      case '-':
        return (a - b).toString();
      case '*':
        return (a * b).toString();
      case '/':
        return b === 0 ? 'ZeroDivisionError' : (a / b).toString();
      case '//':
        return b === 0 ? 'ZeroDivisionError' : Math.floor(a / b).toString();
      case '%':
        return b === 0 ? 'ZeroDivisionError' : (((a % b) + b) % b).toString();
      case '**':
        return Math.pow(a, b).toString();
      default:
        return 'N/A';
    }
  };

  return (
    <section className="space-y-6">
      {/* Header Info */}
      <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight">
            Guia Completo dos Operadores Aritméticos em Python
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Tabela de referência rápida de todos os operadores fundamentais do Python, suas sintaxes oficiais, peculiaridades e ordem de precedência.
          </p>
        </div>
      </div>

      {/* Grid of Operators */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {pythonOperators.map((op) => {
          const isSelected = selectedOp.symbol === op.symbol;
          return (
            <button
              key={op.symbol}
              onClick={() => setSelectedOp(op)}
              className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                isSelected
                  ? 'bg-emerald-500/15 border-emerald-400 text-white shadow-md'
                  : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <div className="text-2xl font-mono font-bold text-emerald-400">
                {op.symbol}
              </div>
              <div className="text-xs font-semibold text-slate-200 whitespace-nowrap">
                {op.name}
              </div>
              <div className="text-[11px] font-mono text-slate-500">
                {op.example}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Operator Deep-Dive Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Operator Explanations (7 cols) */}
        <div className="lg:col-span-7 bg-slate-950 p-5 rounded-xl border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-mono font-bold text-emerald-400">
                {selectedOp.symbol}
              </span>
              <div>
                <h4 className="text-base font-bold text-white">
                  Operador de {selectedOp.name}
                </h4>
                <span className="text-xs font-mono text-slate-400">
                  Sintaxe: <code className="text-sky-300">{selectedOp.pythonSyntax}</code>
                </span>
              </div>
            </div>
            <div className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-emerald-400">
              Exemplo: {selectedOp.example} = {selectedOp.result}
            </div>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>{selectedOp.description}</p>
          </div>

          <div className="p-3.5 bg-slate-900/80 rounded-lg border border-slate-800/80 space-y-1.5">
            <div className="flex items-center gap-1.5 text-amber-400 text-xs font-semibold">
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Dica de Ouro em Python</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedOp.tip}
            </p>
          </div>
        </div>

        {/* Live Playground for this operator (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/60 p-5 rounded-xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800 text-slate-300">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Teste ao Vivo ({selectedOp.symbol})
            </h4>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-mono">Valor A</label>
              <input
                type="number"
                value={customA}
                onChange={(e) => setCustomA(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-mono">Valor B</label>
              <input
                type="number"
                value={customB}
                onChange={(e) => setCustomB(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono outline-none"
              />
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-[11px] text-slate-400 font-mono">Expressão em Python:</div>
            <div className="font-mono text-sm text-emerald-400 font-bold">
              {customA} {selectedOp.symbol} {customB}
            </div>
            <div className="text-[11px] text-slate-400 font-mono pt-1 border-t border-slate-900">
              Resultado retornado:
            </div>
            <div className="text-lg font-mono font-bold text-white">
              {calculateCustom(selectedOp.symbol, customA, customB)}
            </div>
          </div>
        </div>
      </div>

      {/* Operator Precedence Card */}
      <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-slate-300">
          <BookOpen className="w-4 h-4 text-emerald-400" />
          <h4 className="text-sm font-bold text-white">
            Precedência de Operadores em Python (Ordem de Avaliação)
          </h4>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          Quando múltiplos operadores aparecem na mesma expressão (ex: <code className="text-sky-300">2 + 3 * 4</code>), o Python segue uma ordem rígida de prioridade matemática (conhecida como PEMDAS):
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2">
          <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800 space-y-1">
            <span className="text-[11px] text-emerald-400 font-bold uppercase tracking-wider">1ª Prioridade</span>
            <div className="font-mono text-sm font-semibold text-white">( ) Parênteses</div>
            <p className="text-[11px] text-slate-400">Forçam a execução prioritária de qualquer cálculo interno.</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800 space-y-1">
            <span className="text-[11px] text-emerald-400 font-bold uppercase tracking-wider">2ª Prioridade</span>
            <div className="font-mono text-sm font-semibold text-white">** Potenciação</div>
            <p className="text-[11px] text-slate-400">Avaliado da direita para a esquerda (2 ** 3 ** 2 = 512).</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800 space-y-1">
            <span className="text-[11px] text-emerald-400 font-bold uppercase tracking-wider">3ª Prioridade</span>
            <div className="font-mono text-sm font-semibold text-white">* , / , // , %</div>
            <p className="text-[11px] text-slate-400">Multiplicações e divisões da esquerda para a direita.</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800 space-y-1">
            <span className="text-[11px] text-emerald-400 font-bold uppercase tracking-wider">4ª Prioridade</span>
            <div className="font-mono text-sm font-semibold text-white">+ , - Adição e Subtração</div>
            <p className="text-[11px] text-slate-400">Executadas por último na ordem sequencial.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
