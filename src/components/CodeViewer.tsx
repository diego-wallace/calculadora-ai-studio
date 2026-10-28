/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { PythonCodeVariant, LineAnnotation } from '../data/pythonCodes';
import { Check, Copy, Download, Play, BookOpen, Lightbulb, AlertTriangle, Sparkles } from 'lucide-react';

interface CodeViewerProps {
  variants: PythonCodeVariant[];
  currentVariantId: string;
  onSelectVariant: (id: 'iniciante' | 'modular' | 'poo') => void;
  onRunInTerminal: (codeVariant: PythonCodeVariant) => void;
  onDownloadCode: (variant: PythonCodeVariant) => void;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({
  variants,
  currentVariantId,
  onSelectVariant,
  onRunInTerminal,
  onDownloadCode
}) => {
  const currentVariant = useMemo(() => {
    return variants.find((v) => v.id === currentVariantId) || variants[0];
  }, [variants, currentVariantId]);

  const [copied, setCopied] = useState(false);
  const [selectedLineNumber, setSelectedLineNumber] = useState<number>(17); // Default to somar() definition

  // Find annotation matching current selected line
  const activeAnnotation = useMemo(() => {
    return currentVariant.annotations.find((a) => a.lines.includes(selectedLineNumber));
  }, [currentVariant, selectedLineNumber]);

  const lines = useMemo(() => {
    return currentVariant.code.split('\n');
  }, [currentVariant]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentVariant.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  // Syntax highlighting helper for individual lines
  const renderCodeLine = (lineText: string) => {
    if (lineText.trim().startsWith('#')) {
      return <span className="text-emerald-400/80 italic">{lineText}</span>;
    }
    if (lineText.trim().startsWith('"""') || lineText.trim().endsWith('"""')) {
      return <span className="text-amber-300/90">{lineText}</span>;
    }

    // Tokenizer regex
    const tokens = lineText.split(/(\bdef\b|\breturn\b|\bif\b|\belif\b|\belse\b|\bwhile\b|\btry\b|\bexcept\b|\bbreak\b|\bcontinue\b|\bfrom\b|\bimport\b|\bclass\b|\bself\b|\bTrue\b|\bFalse\b|\bNone\b|\bfloat\b|\bstr\b|\bint\b|\binput\b|\bprint\b|"[^"]*"|'[^']*'|#[^\n]*)/g);

    return tokens.map((token, idx) => {
      if (!token) return null;

      if (token.startsWith('#')) {
        return <span key={idx} className="text-emerald-400/80 italic">{token}</span>;
      }
      if (token.startsWith('"') || token.startsWith("'")) {
        return <span key={idx} className="text-amber-300">{token}</span>;
      }
      if (['def', 'class', 'from', 'import'].includes(token)) {
        return <span key={idx} className="text-purple-400 font-semibold">{token}</span>;
      }
      if (['return', 'if', 'elif', 'else', 'while', 'try', 'except', 'break', 'continue'].includes(token)) {
        return <span key={idx} className="text-rose-400 font-semibold">{token}</span>;
      }
      if (['print', 'input', 'float', 'str', 'int', 'len', 'range', 'isinstance'].includes(token)) {
        return <span key={idx} className="text-sky-400">{token}</span>;
      }
      if (['True', 'False', 'None', 'self'].includes(token)) {
        return <span key={idx} className="text-amber-400 font-medium">{token}</span>;
      }
      return <span key={idx} className="text-slate-200">{token}</span>;
    });
  };

  return (
    <section className="space-y-6">
      {/* Top Controls & Variant Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-lg border border-slate-800/80">
          {variants.map((v) => (
            <button
              key={v.id}
              onClick={() => onSelectVariant(v.id as any)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                currentVariantId === v.id
                  ? 'bg-slate-800 text-emerald-400 shadow-sm border border-slate-700/60'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {v.title.split('(')[0].trim()}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => onRunInTerminal(currentVariant)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-300 bg-emerald-950/70 border border-emerald-500/40 hover:bg-emerald-900/60 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Rodar no Terminal</span>
          </button>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copiado!' : 'Copiar Código'}</span>
          </button>

          <button
            onClick={() => onDownloadCode(currentVariant)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{currentVariant.filename}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Code Editor + Teaching Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Code Canvas (8 cols on lg) */}
        <div className="lg:col-span-8 bg-slate-950 rounded-xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          {/* File Tab Header */}
          <div className="px-4 py-3 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
              <span className="ml-2 font-mono text-xs text-slate-300 font-medium">
                {currentVariant.filename}
              </span>
            </div>
            <div className="text-xs text-slate-400">
              Clique em qualquer linha com <span className="text-amber-400 font-bold">●</span> para ver a explicação
            </div>
          </div>

          {/* Code Body with Line Numbers */}
          <div className="p-4 overflow-x-auto max-h-[700px] text-xs sm:text-sm font-mono leading-relaxed select-text">
            {lines.map((lineText, index) => {
              const lineNum = index + 1;
              const hasAnnotation = currentVariant.annotations.some((a) => a.lines.includes(lineNum));
              const isSelected = selectedLineNumber === lineNum;

              return (
                <div
                  key={lineNum}
                  onClick={() => setSelectedLineNumber(lineNum)}
                  className={`group flex items-start py-0.5 px-2 rounded cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-emerald-500/15 border-l-2 border-emerald-400'
                      : hasAnnotation
                      ? 'hover:bg-slate-900/80'
                      : 'hover:bg-slate-900/40'
                  }`}
                >
                  {/* Line Number & Annotation Indicator */}
                  <div className="w-10 shrink-0 text-right pr-3 select-none flex items-center justify-end gap-1 text-slate-600 group-hover:text-slate-400">
                    {hasAnnotation && (
                      <span className="text-amber-400 text-[10px]" title="Linha com anotação explicativa">
                        ●
                      </span>
                    )}
                    <span className="tabular-nums">{lineNum}</span>
                  </div>

                  {/* Line Content */}
                  <div className="flex-1 whitespace-pre overflow-x-auto pl-1">
                    {renderCodeLine(lineText)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Teaching Inspector Deck (4 cols on lg) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-900/70 rounded-xl border border-slate-800 p-5 shadow-lg">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800 text-slate-300">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-semibold tracking-tight text-white">
                Guia Linha a Linha (Estudo Didático)
              </h3>
            </div>

            {activeAnnotation ? (
              <div className="mt-4 space-y-4">
                <div>
                  <div className="text-xs text-emerald-400 font-mono font-medium">
                    Linhas {activeAnnotation.lines[0]} a {activeAnnotation.lines[activeAnnotation.lines.length - 1]}
                  </div>
                  <h4 className="text-base font-bold text-white mt-0.5">
                    {activeAnnotation.title}
                  </h4>
                  <div className="text-xs text-slate-400 mt-0.5 font-medium">
                    Conceito: <span className="text-slate-200">{activeAnnotation.concept}</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800/80 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {activeAnnotation.explanation}
                </div>

                {activeAnnotation.pep8Tip && (
                  <div className="p-3 bg-sky-950/30 rounded-lg border border-sky-900/40 space-y-1">
                    <div className="flex items-center gap-1.5 text-sky-400 text-xs font-semibold">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Boas Práticas PEP 8</span>
                    </div>
                    <p className="text-xs text-sky-200/90 leading-relaxed">
                      {activeAnnotation.pep8Tip}
                    </p>
                  </div>
                )}

                {activeAnnotation.commonMistake && (
                  <div className="p-3 bg-amber-950/30 rounded-lg border border-amber-900/40 space-y-1">
                    <div className="flex items-center gap-1.5 text-amber-400 text-xs font-semibold">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Cuidado! Erro Comum</span>
                    </div>
                    <p className="text-xs text-amber-200/90 leading-relaxed">
                      {activeAnnotation.commonMistake}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-4 py-8 text-center text-slate-400 space-y-3">
                <Lightbulb className="w-8 h-8 text-slate-600 mx-auto" />
                <p className="text-xs leading-relaxed max-w-xs mx-auto">
                  Linha <span className="font-mono text-emerald-400 font-bold">{selectedLineNumber}</span> selecionada.
                  Clique nas linhas marcadas com o ponto dourado <span className="text-amber-400">●</span> (como linha 17, 38, 68, 90) para ver o detalhamento pedagógico.
                </p>
              </div>
            )}
          </div>

          {/* Quick Shortcuts Box */}
          <div className="bg-slate-900/50 rounded-xl border border-slate-800/80 p-4 space-y-3">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Pontos-Chave para Estudantes
            </h4>
            <div className="space-y-1.5">
              {currentVariant.annotations.map((ann, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedLineNumber(ann.lines[0])}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors hover:bg-slate-800 flex items-center justify-between text-slate-300 group cursor-pointer"
                >
                  <span className="truncate group-hover:text-emerald-400">{ann.title}</span>
                  <span className="font-mono text-[11px] text-slate-500 tabular-nums ml-2 shrink-0">
                    L{ann.lines[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
