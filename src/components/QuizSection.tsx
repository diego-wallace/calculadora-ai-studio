/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { pythonQuizQuestions, QuizQuestion } from '../data/pythonCodes';
import { CheckCircle2, XCircle, RotateCcw, Award } from 'lucide-react';

export const QuizSection: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (showResults) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const calculateScore = () => {
    let score = 0;
    pythonQuizQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const score = calculateScore();
  const allAnswered = pythonQuizQuestions.every((q) => selectedAnswers[q.id] !== undefined);

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight">
            Desafios de Fixação: Conceitos do Código
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Teste seu entendimento sobre os principais pontos da calculadora: tipos primitivos, divisão por zero, sintaxe de funções e operadores aritméticos.
          </p>
        </div>

        {showResults ? (
          <div className="flex items-center gap-3">
            <div className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-emerald-500/30">
              Pontuação: {score} de {pythonQuizQuestions.length}
            </div>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Refazer Quiz</span>
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowResults(true)}
            disabled={!allAnswered}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              allAnswered
                ? 'bg-emerald-400 hover:bg-emerald-300 text-slate-950 shadow-sm'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            {allAnswered ? 'Verificar Respostas' : `Responda todas (${Object.keys(selectedAnswers).length}/${pythonQuizQuestions.length})`}
          </button>
        )}
      </div>

      {/* Questions List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pythonQuizQuestions.map((q, idx) => {
          const userChoice = selectedAnswers[q.id];
          const isCorrect = userChoice === q.correctIndex;

          return (
            <div
              key={q.id}
              className="bg-slate-950 p-5 rounded-xl border border-slate-800 shadow-xl flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-900">
                  <span className="font-mono text-emerald-400 font-semibold">Questão 0{idx + 1}</span>
                  {showResults && (
                    <span className="flex items-center gap-1 font-medium">
                      {isCorrect ? (
                        <span className="text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Correto
                        </span>
                      ) : (
                        <span className="text-rose-400 flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5" /> Incorreto
                        </span>
                      )}
                    </span>
                  )}
                </div>

                <h4 className="text-sm font-semibold text-white mt-3 leading-snug">
                  {q.question}
                </h4>

                <div className="mt-4 space-y-2">
                  {q.options.map((option, optIdx) => {
                    const isSelected = userChoice === optIdx;
                    let optionStyle = 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:bg-slate-900 hover:border-slate-700';

                    if (showResults) {
                      if (optIdx === q.correctIndex) {
                        optionStyle = 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300 font-medium';
                      } else if (isSelected && !isCorrect) {
                        optionStyle = 'bg-rose-950/40 border-rose-500/50 text-rose-300';
                      } else {
                        optionStyle = 'bg-slate-900/30 border-slate-900 text-slate-500 opacity-60';
                      }
                    } else if (isSelected) {
                      optionStyle = 'bg-emerald-500/15 border-emerald-400 text-white font-medium shadow-sm';
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        disabled={showResults}
                        className={`w-full text-left p-3 rounded-lg border text-xs transition-all cursor-pointer flex items-start gap-2.5 ${optionStyle}`}
                      >
                        <span className="w-5 h-5 rounded-md bg-slate-800/80 font-mono text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="leading-relaxed">{option}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Explanation after revealing */}
              {showResults && (
                <div className="pt-3 border-t border-slate-900 text-xs text-slate-300 bg-slate-900/50 p-3 rounded-lg leading-relaxed">
                  <strong className="text-emerald-400">Explicação: </strong>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
