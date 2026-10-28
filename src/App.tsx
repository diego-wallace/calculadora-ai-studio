/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { CodeViewer } from './components/CodeViewer';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { VisualSimulator } from './components/VisualSimulator';
import { OperatorGuide } from './components/OperatorGuide';
import { LocalExecutionGuide } from './components/LocalExecutionGuide';
import { QuizSection } from './components/QuizSection';
import { pythonCalculatorCodes, PythonCodeVariant } from './data/pythonCodes';
import { Terminal, Download, Code2, Cpu, Calculator, CheckCircle2, BookOpen } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('codigo');
  const [selectedVariantId, setSelectedVariantId] = useState<'iniciante' | 'modular' | 'poo'>('iniciante');

  const currentVariant =
    pythonCalculatorCodes.find((v) => v.id === selectedVariantId) || pythonCalculatorCodes[0];

  const handleDownloadCode = (variantToDownload: PythonCodeVariant = currentVariant) => {
    const blob = new Blob([variantToDownload.code], { type: 'text/x-python;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = variantToDownload.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleRunInTerminal = (variant: PythonCodeVariant) => {
    setSelectedVariantId(variant.id);
    setActiveTab('terminal');
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Strict 3-zone Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={(tabId) => setActiveTab(tabId)}
        onDownloadCode={() => handleDownloadCode(currentVariant)}
      />

      {/* Main Educational Workspace Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900/50 rounded-2xl border border-slate-800 p-6 sm:p-8 relative overflow-hidden">
          {/* Left Column: Headlines & Concept Meta */}
          <div className="lg:col-span-7 space-y-5">
            {/* Unboxed Metadata Line with typographic separators (anti-slop rule) */}
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
              <span>Python 3.8+</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Operações Básicas</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>100% Comentado Passo a Passo</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Material para Estudantes</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white" style={{ textWrap: 'balance' }}>
              Calculadora em Python: Código Limpo & Documentado
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              Desenvolvida especialmente para quem está estudando programação. Domine na prática o funcionamento de funções com <code className="text-emerald-400 font-mono">def</code>, entrada de dados com <code className="text-emerald-400 font-mono">float(input())</code>, prevenção de erros como divisão por zero (<code className="text-rose-400 font-mono">ZeroDivisionError</code>) e controle de repetição com <code className="text-emerald-400 font-mono">while True</code>.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setActiveTab('codigo')}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-sm hover:shadow-emerald-500/20 transition-all cursor-pointer whitespace-nowrap shrink-0"
              >
                <Code2 className="w-4 h-4" />
                <span>Explorar Código Comentado</span>
              </button>

              <button
                onClick={() => setActiveTab('terminal')}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0"
              >
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>Testar no Console Interativo</span>
              </button>

              <button
                onClick={() => handleDownloadCode(currentVariant)}
                className="inline-flex items-center gap-2 px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <Download className="w-4 h-4" />
                <span>Baixar .py</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Graphic */}
          <div className="lg:col-span-5 relative rounded-xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950 aspect-video lg:aspect-auto lg:h-72">
            <img
              src="/src/assets/images/python_study_banner_1793218873706.jpg"
              alt="Ambiente de estudo com código Python e operações matemáticas"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Resilient CSS Fallback if image fails
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            {/* Scrim Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none flex items-end p-4">
              <span className="text-xs font-mono text-emerald-400/90 font-medium">
                Soma (+) · Subtração (-) · Multiplicação (*) · Divisão (/)
              </span>
            </div>
          </div>
        </div>

        {/* Feature Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-900/80 rounded-xl border border-slate-800 overflow-x-auto">
          <button
            onClick={() => setActiveTab('codigo')}
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'codigo'
                ? 'bg-slate-800 text-emerald-400 shadow-sm border border-slate-700/80'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Código Documentado</span>
          </button>

          <button
            onClick={() => setActiveTab('terminal')}
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'terminal'
                ? 'bg-slate-800 text-emerald-400 shadow-sm border border-slate-700/80'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Terminal Interativo</span>
          </button>

          <button
            onClick={() => setActiveTab('simulador')}
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'simulador'
                ? 'bg-slate-800 text-emerald-400 shadow-sm border border-slate-700/80'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>Simulador de Execução</span>
          </button>

          <button
            onClick={() => setActiveTab('operadores')}
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'operadores'
                ? 'bg-slate-800 text-emerald-400 shadow-sm border border-slate-700/80'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>Guia de Operadores</span>
          </button>

          <button
            onClick={() => setActiveTab('guia_local')}
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'guia_local'
                ? 'bg-slate-800 text-emerald-400 shadow-sm border border-slate-700/80'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Como Rodar no seu PC</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'quiz'
                ? 'bg-slate-800 text-emerald-400 shadow-sm border border-slate-700/80'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Desafios Python</span>
          </button>
        </div>

        {/* Dynamic Section Render */}
        <div className="pt-2">
          {activeTab === 'codigo' && (
            <CodeViewer
              variants={pythonCalculatorCodes}
              currentVariantId={selectedVariantId}
              onSelectVariant={(id) => setSelectedVariantId(id)}
              onRunInTerminal={handleRunInTerminal}
              onDownloadCode={handleDownloadCode}
            />
          )}

          {activeTab === 'terminal' && (
            <InteractiveTerminal currentFilename={currentVariant.filename} />
          )}

          {activeTab === 'simulador' && <VisualSimulator />}

          {activeTab === 'operadores' && <OperatorGuide />}

          {activeTab === 'guia_local' && (
            <LocalExecutionGuide onDownloadCode={() => handleDownloadCode(currentVariant)} />
          )}

          {activeTab === 'quiz' && <QuizSection />}
        </div>
      </main>

      {/* Quiet, unpretentious footer conforming to Anti-Slop section */}
      <footer className="mt-16 border-t border-slate-900 bg-slate-950 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">PyCalc Doc</span>
            <span>·</span>
            <span>Guia Prático e Didático para Estudantes de Python</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Compatível com Python 3.8, 3.10, 3.11 e 3.12+</span>
            <span>·</span>
            <span>Código Aberto</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
