/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { executePythonCalculation, CalculationTrace } from '../utils/pythonRunner';
import { Play, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

export const VisualSimulator: React.FC = () => {
  const [num1, setNum1] = useState<number>(10);
  const [num2, setNum2] = useState<number>(2);
  const [selectedOp, setSelectedOp] = useState<'soma' | 'subtracao' | 'multiplicacao' | 'divisao' | 'potencia' | 'modulo' | 'divisao_inteira'>('soma');

  const trace: CalculationTrace = executePythonCalculation(selectedOp, num1, num2);

  const operationButtons = [
    { id: 'soma', label: '+ Adição', symbol: '+', fn: 'somar(a, b)' },
    { id: 'subtracao', label: '- Subtração', symbol: '-', fn: 'subtrair(a, b)' },
    { id: 'multiplicacao', label: '* Multiplicação', symbol: '*', fn: 'multiplicar(a, b)' },
    { id: 'divisao', label: '/ Divisão', symbol: '/', fn: 'dividir(a, b)' },
    { id: 'potencia', label: '** Potência', symbol: '**', fn: 'potenciacao(a, b)' },
    { id: 'modulo', label: '% Resto', symbol: '%', fn: 'modulo(a, b)' },
    { id: 'divisao_inteira', label: '// Inteira', symbol: '//', fn: 'divisao_inteira(a, b)' },
  ] as const;

  return (
    <section className="space-y-6">
      {/* Introduction Card */}
      <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight">
            Simulador Visual de Execução Python
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Altere os valores ou clique nos operadores para ver como o interpretador Python processa as variáveis, chama a respectiva função e retorna o resultado em tempo real.
          </p>
        </div>

        {/* Quick Simulation Presets */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setSelectedOp('divisao');
              setNum1(12);
              setNum2(0);
            }}
            className="px-3 py-1.5 text-xs font-semibold text-rose-300 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/40 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            Testar Divisão por 0
          </button>
          <button
            onClick={() => {
              setSelectedOp('potencia');
              setNum1(2);
              setNum2(8);
            }}
            className="px-3 py-1.5 text-xs font-semibold text-amber-300 bg-amber-950/40 hover:bg-amber-900/60 border border-amber-800/40 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            Testar Potência (2 ** 8)
          </button>
        </div>
      </div>

      {/* Main Interactive Stage & Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Interactive Stage (5 cols) */}
        <div className="lg:col-span-5 bg-slate-950 p-5 rounded-xl border border-slate-800 shadow-xl space-y-5">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Painel de Entrada de Parâmetros
          </div>

          {/* Value Inputs */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-medium flex items-center justify-between">
                <span>Variável <code className="text-emerald-400 font-mono">a</code></span>
                <span className="text-[11px] text-slate-500 font-mono">float</span>
              </label>
              <input
                type="number"
                step="any"
                value={num1}
                onChange={(e) => setNum1(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-900 border border-slate-700 focus:border-emerald-500 rounded-lg px-3 py-2 text-sm text-white font-mono outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-medium flex items-center justify-between">
                <span>Variável <code className="text-emerald-400 font-mono">b</code></span>
                <span className="text-[11px] text-slate-500 font-mono">float</span>
              </label>
              <input
                type="number"
                step="any"
                value={num2}
                onChange={(e) => setNum2(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-900 border border-slate-700 focus:border-emerald-500 rounded-lg px-3 py-2 text-sm text-white font-mono outline-none"
              />
            </div>
          </div>

          {/* Operation Selector Buttons */}
          <div className="space-y-2">
            <label className="text-xs text-slate-300 font-medium block">
              Operador Matemático Python
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {operationButtons.map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setSelectedOp(btn.id)}
                  className={`p-2.5 rounded-lg text-xs font-mono font-medium transition-all text-left border cursor-pointer ${
                    selectedOp === btn.id
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-sm'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <div className="text-sm font-bold text-white">{btn.symbol}</div>
                  <div className="text-[11px] text-slate-400 truncate">{btn.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Big Result Card */}
          <div className={`p-4 rounded-xl border ${trace.isError ? 'bg-rose-950/20 border-rose-800/60' : 'bg-slate-900/80 border-slate-800'}`}>
            <div className="text-xs text-slate-400 font-medium flex items-center justify-between">
              <span>Resultado da Operação:</span>
              <span className="font-mono text-[11px] text-emerald-400">
                {trace.isError ? 'Erro Tratado' : 'Sucesso'}
              </span>
            </div>

            <div className="mt-2 text-2xl font-bold font-mono tracking-tight text-white flex items-center gap-2">
              {trace.isError ? (
                <div className="flex items-center gap-2 text-rose-400 text-base">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{trace.result}</span>
                </div>
              ) : (
                <div className="flex items-baseline gap-2">
                  <span className="text-emerald-400 tabular-nums">{trace.result}</span>
                  <span className="text-xs font-normal text-slate-400">
                    (retorno de {trace.operation}())
                  </span>
                </div>
              )}
            </div>

            <div className="mt-3 pt-3 border-t border-slate-800/80 text-xs font-mono text-slate-400">
              f-string: <span className="text-sky-300">f"{num1} {trace.operatorSymbol} {num2} = {trace.result}"</span>
            </div>
          </div>
        </div>

        {/* Right Code & Step Trace Deck (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Real Python Code Box */}
          <div className="bg-slate-950 rounded-xl border border-slate-800 shadow-xl overflow-hidden">
            <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
              <span className="text-emerald-400 font-medium flex items-center gap-1.5">
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Código Python Executado</span>
              </span>
              <span className="text-slate-400">execução sob demanda</span>
            </div>
            <pre className="p-4 text-xs sm:text-sm font-mono text-slate-200 overflow-x-auto leading-relaxed bg-slate-950">
              <code>{trace.rawPythonCode}</code>
            </pre>
          </div>

          {/* Execution Trace Steps */}
          <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800 space-y-3">
            <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Rastreamento Passo a Passo no Interpretador</span>
            </div>

            <div className="space-y-2">
              {trace.steps.map((stepDesc, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 text-xs text-slate-300 p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/60 font-mono"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{stepDesc}</span>
                </div>
              ))}
            </div>

            {/* Educational Takeaway */}
            <div className="mt-4 p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/40 text-xs text-emerald-200/90 leading-relaxed">
              <strong>Dica de Estudo:</strong> Em Python, todas as variáveis armazenam ponteiros para objetos na memória. Ao passar <code>a</code> e <code>b</code> para uma função, o Python passa as referências desses objetos por valor.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
