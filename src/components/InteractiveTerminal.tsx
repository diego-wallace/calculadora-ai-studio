/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Terminal, RotateCcw, Play, CornerDownLeft, Sparkles } from 'lucide-react';
import { executePythonCalculation } from '../utils/pythonRunner';

interface InteractiveTerminalProps {
  currentFilename: string;
}

type StepState =
  | 'idle'
  | 'awaiting_option'
  | 'awaiting_num1'
  | 'awaiting_num2'
  | 'awaiting_continue';

interface LogItem {
  id: string;
  type: 'stdout' | 'stdin' | 'stderr' | 'prompt' | 'info';
  text: string;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({ currentFilename }) => {
  const [logs, setLogs] = useState<LogItem[]>([]);
  const [step, setStep] = useState<StepState>('idle');
  const [inputValue, setInputValue] = useState('');
  const [currentOption, setCurrentOption] = useState<string>('');
  const [firstNum, setFirstNum] = useState<number>(0);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const startScript = () => {
    const initialLogs: LogItem[] = [
      { id: '1', type: 'info', text: `$ python3 ${currentFilename}` },
      { id: '2', type: 'stdout', text: 'Seja bem-vindo(a) à sua Calculadora em Python!' },
      { id: '3', type: 'stdout', text: '\n========================================' },
      { id: '4', type: 'stdout', text: '       CALCULADORA EM PYTHON' },
      { id: '5', type: 'stdout', text: '========================================' },
      { id: '6', type: 'stdout', text: ' [ 1 ] Somar (+)' },
      { id: '7', type: 'stdout', text: ' [ 2 ] Subtrair (-)' },
      { id: '8', type: 'stdout', text: ' [ 3 ] Multiplicar (*)' },
      { id: '9', type: 'stdout', text: ' [ 4 ] Dividir (/)' },
      { id: '10', type: 'stdout', text: ' [ 0 ] Sair do Programa' },
      { id: '11', type: 'stdout', text: '========================================' },
    ];
    setLogs(initialLogs);
    setStep('awaiting_option');
    setInputValue('');
  };

  useEffect(() => {
    startScript();
  }, [currentFilename]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (step !== 'idle') {
      inputRef.current?.focus();
    }
  }, [logs, step]);

  const handleInputSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const val = inputValue.trim();
    if (!val && step !== 'awaiting_continue') return;

    if (step === 'awaiting_option') {
      // User entered an option
      const newLogs: LogItem[] = [
        ...logs,
        { id: Date.now() + '-in', type: 'stdin', text: `Escolha a operação desejada (0 a 4): ${val}` },
      ];

      if (val === '0') {
        newLogs.push({
          id: Date.now() + '-out',
          type: 'stdout',
          text: '\nObrigado por utilizar a calculadora. Bons estudos em Python!\n[Processo Python finalizado com código 0]',
        });
        setLogs(newLogs);
        setStep('idle');
        setInputValue('');
        return;
      }

      if (!['1', '2', '3', '4'].includes(val)) {
        newLogs.push({
          id: Date.now() + '-err',
          type: 'stderr',
          text: '\nOpção inválida! Escolha um número de 0 a 4.',
        });
        newLogs.push({
          id: Date.now() + '-menu',
          type: 'stdout',
          text: ' [ 1 ] Somar (+) | [ 2 ] Subtrair (-) | [ 3 ] Multiplicar (*) | [ 4 ] Dividir (/) | [ 0 ] Sair',
        });
        setLogs(newLogs);
        setInputValue('');
        return;
      }

      setCurrentOption(val);
      newLogs.push({
        id: Date.now() + '-sep',
        type: 'stdout',
        text: '\n--- Digite os valores para o cálculo ---',
      });
      setLogs(newLogs);
      setStep('awaiting_num1');
      setInputValue('');
      return;
    }

    if (step === 'awaiting_num1') {
      const parsed = parseFloat(val.replace(',', '.'));
      if (isNaN(parsed)) {
        const newLogs: LogItem[] = [
          ...logs,
          { id: Date.now() + '-in', type: 'stdin', text: `Digite o 1º número: ${val}` },
          { id: Date.now() + '-err', type: 'stderr', text: 'Entrada inválida! Digite apenas números válidos (ex: 10 ou 3.14).' },
        ];
        setLogs(newLogs);
        setInputValue('');
        return;
      }

      setFirstNum(parsed);
      setLogs([
        ...logs,
        { id: Date.now() + '-in', type: 'stdin', text: `Digite o 1º número: ${parsed}` },
      ]);
      setStep('awaiting_num2');
      setInputValue('');
      return;
    }

    if (step === 'awaiting_num2') {
      const parsed = parseFloat(val.replace(',', '.'));
      if (isNaN(parsed)) {
        const newLogs: LogItem[] = [
          ...logs,
          { id: Date.now() + '-in', type: 'stdin', text: `Digite o 2º número: ${val}` },
          { id: Date.now() + '-err', type: 'stderr', text: 'Entrada inválida! Digite apenas números válidos (ex: 10 ou 3.14).' },
        ];
        setLogs(newLogs);
        setInputValue('');
        return;
      }

      const opMap: Record<string, 'soma' | 'subtracao' | 'multiplicacao' | 'divisao'> = {
        '1': 'soma',
        '2': 'subtracao',
        '3': 'multiplicacao',
        '4': 'divisao',
      };

      const trace = executePythonCalculation(opMap[currentOption] || 'soma', firstNum, parsed);

      const newLogs: LogItem[] = [
        ...logs,
        { id: Date.now() + '-in', type: 'stdin', text: `Digite o 2º número: ${parsed}` },
        { id: Date.now() + '-div1', type: 'stdout', text: '\n----------------------------------------' },
      ];

      if (trace.isError) {
        newLogs.push({
          id: Date.now() + '-res',
          type: 'stderr',
          text: `Resultado: ${trace.result}`,
        });
      } else {
        newLogs.push({
          id: Date.now() + '-res',
          type: 'stdout',
          text: `Cálculo: ${firstNum} ${trace.operatorSymbol} ${parsed} = ${trace.result}`,
        });
      }

      newLogs.push({
        id: Date.now() + '-div2',
        type: 'stdout',
        text: '----------------------------------------',
      });

      setLogs(newLogs);
      setStep('awaiting_continue');
      setInputValue('');
      return;
    }

    if (step === 'awaiting_continue') {
      // User pressed enter to continue
      const newLogs: LogItem[] = [
        ...logs,
        { id: Date.now() + '-next', type: 'stdout', text: '\n' + '='.repeat(40) },
        { id: Date.now() + '-m1', type: 'stdout', text: '       CALCULADORA EM PYTHON' },
        { id: Date.now() + '-m2', type: 'stdout', text: '='.repeat(40) },
        { id: Date.now() + '-m3', type: 'stdout', text: ' [ 1 ] Somar (+)' },
        { id: Date.now() + '-m4', type: 'stdout', text: ' [ 2 ] Subtrair (-)' },
        { id: Date.now() + '-m5', type: 'stdout', text: ' [ 3 ] Multiplicar (*)' },
        { id: Date.now() + '-m6', type: 'stdout', text: ' [ 4 ] Dividir (/)' },
        { id: Date.now() + '-m7', type: 'stdout', text: ' [ 0 ] Sair do Programa' },
        { id: Date.now() + '-m8', type: 'stdout', text: '='.repeat(40) },
      ];
      setLogs(newLogs);
      setStep('awaiting_option');
      setInputValue('');
    }
  };

  const runQuickTest = (scenario: 'soma' | 'divisao_zero' | 'erro_texto' | 'multiplicar') => {
    if (scenario === 'soma') {
      setLogs((prev) => [
        ...prev,
        { id: Date.now() + '-test', type: 'info', text: '>>> Executando Caso de Teste: Soma (15 + 25)' },
        { id: Date.now() + '-1', type: 'stdin', text: 'Escolha a operação: 1' },
        { id: Date.now() + '-2', type: 'stdin', text: 'Digite o 1º número: 15' },
        { id: Date.now() + '-3', type: 'stdin', text: 'Digite o 2º número: 25' },
        { id: Date.now() + '-4', type: 'stdout', text: '----------------------------------------' },
        { id: Date.now() + '-5', type: 'stdout', text: 'Cálculo: 15 + 25 = 40' },
        { id: Date.now() + '-6', type: 'stdout', text: '----------------------------------------' },
      ]);
    } else if (scenario === 'divisao_zero') {
      setLogs((prev) => [
        ...prev,
        { id: Date.now() + '-test', type: 'info', text: '>>> Executando Teste: Divisão por Zero (10 / 0)' },
        { id: Date.now() + '-1', type: 'stdin', text: 'Escolha a operação: 4' },
        { id: Date.now() + '-2', type: 'stdin', text: 'Digite o 1º número: 10' },
        { id: Date.now() + '-3', type: 'stdin', text: 'Digite o 2º número: 0' },
        { id: Date.now() + '-4', type: 'stdout', text: '----------------------------------------' },
        { id: Date.now() + '-5', type: 'stderr', text: 'Resultado: Erro: Não é possível dividir nenhum número por zero!' },
        { id: Date.now() + '-6', type: 'stdout', text: '----------------------------------------' },
      ]);
    } else if (scenario === 'erro_texto') {
      setLogs((prev) => [
        ...prev,
        { id: Date.now() + '-test', type: 'info', text: '>>> Teste: Digitar letras no lugar de número' },
        { id: Date.now() + '-1', type: 'stdin', text: 'Digite o 1º número: python' },
        { id: Date.now() + '-2', type: 'stderr', text: 'Entrada inválida! Digite apenas números válidos (ex: 10 ou 3.14).' },
        { id: Date.now() + '-3', type: 'stdout', text: 'O bloco try/except impediu que o Python travasse com ValueError!' },
      ]);
    } else if (scenario === 'multiplicar') {
      setLogs((prev) => [
        ...prev,
        { id: Date.now() + '-test', type: 'info', text: '>>> Teste: Multiplicação com decimais (7.5 * 4)' },
        { id: Date.now() + '-1', type: 'stdin', text: 'Escolha a operação: 3' },
        { id: Date.now() + '-2', type: 'stdin', text: 'Digite o 1º número: 7.5' },
        { id: Date.now() + '-3', type: 'stdin', text: 'Digite o 2º número: 4' },
        { id: Date.now() + '-4', type: 'stdout', text: '----------------------------------------' },
        { id: Date.now() + '-5', type: 'stdout', text: 'Cálculo: 7.5 * 4 = 30' },
        { id: Date.now() + '-6', type: 'stdout', text: '----------------------------------------' },
      ]);
    }
  };

  const getPromptLabel = () => {
    switch (step) {
      case 'awaiting_option':
        return 'Escolha a operação (0 a 4): ';
      case 'awaiting_num1':
        return 'Digite o 1º número: ';
      case 'awaiting_num2':
        return 'Digite o 2º número: ';
      case 'awaiting_continue':
        return 'Pressione ENTER para continuar...';
      default:
        return 'Python finalizado. Clique em Reiniciar para rodar de novo:';
    }
  };

  return (
    <section className="space-y-4">
      {/* Terminal Header & Action Strip */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-semibold text-white">Terminal Python Interativo</span>
          <span className="text-xs text-slate-400 font-mono">Python 3.12 (CLI Emulator)</span>
        </div>

        {/* Quick Simulation Buttons for Easy Learning */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-slate-400 hidden lg:inline">Testes rápidos:</span>
          <button
            onClick={() => runQuickTest('soma')}
            className="px-2.5 py-1 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            Soma (15+25)
          </button>
          <button
            onClick={() => runQuickTest('divisao_zero')}
            className="px-2.5 py-1 text-xs font-medium text-amber-300 bg-amber-950/40 hover:bg-amber-900/50 border border-amber-800/40 rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            Divisão por Zero
          </button>
          <button
            onClick={() => runQuickTest('erro_texto')}
            className="px-2.5 py-1 text-xs font-medium text-sky-300 bg-sky-950/40 hover:bg-sky-900/50 border border-sky-800/40 rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            Testar ValueError
          </button>
          <button
            onClick={startScript}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-rose-300 bg-rose-950/40 hover:bg-rose-900/50 border border-rose-800/40 rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0"
            title="Reiniciar console"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reiniciar</span>
          </button>
        </div>
      </div>

      {/* Terminal Screen */}
      <div className="bg-slate-950 rounded-xl border border-slate-800 shadow-2xl overflow-hidden font-mono text-xs sm:text-sm">
        {/* Terminal Title Bar */}
        <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
            <span className="text-xs text-slate-400 ml-2">bash - calculadora_basica.py</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400/90 font-medium">
            <Sparkles className="w-3 h-3" />
            <span>Sessão Ativa</span>
          </div>
        </div>

        {/* Console Body */}
        <div className="p-4 sm:p-5 max-h-[500px] min-h-[350px] overflow-y-auto space-y-1.5 leading-relaxed select-text">
          {logs.map((log) => {
            if (log.type === 'info') {
              return (
                <div key={log.id} className="text-emerald-400 font-semibold py-0.5">
                  {log.text}
                </div>
              );
            }
            if (log.type === 'stdin') {
              return (
                <div key={log.id} className="text-sky-300">
                  {log.text}
                </div>
              );
            }
            if (log.type === 'stderr') {
              return (
                <div key={log.id} className="text-rose-400 font-medium">
                  {log.text}
                </div>
              );
            }
            return (
              <div key={log.id} className="text-slate-200 whitespace-pre-wrap">
                {log.text}
              </div>
            );
          })}

          {/* Interactive Input Line */}
          {step !== 'idle' ? (
            <form onSubmit={handleInputSubmit} className="flex items-center gap-1 text-slate-100 pt-2 border-t border-slate-800/60 mt-3">
              <span className="text-emerald-400 font-semibold whitespace-nowrap shrink-0">
                {getPromptLabel()}
              </span>
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={step === 'awaiting_continue' ? 'Pressione Enter...' : 'Digite aqui...'}
                className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs sm:text-sm focus:ring-0 p-0"
                autoFocus
              />
              <button
                type="submit"
                className="p-1 text-slate-400 hover:text-emerald-400 rounded transition-colors cursor-pointer"
                title="Pressionar Enter"
              >
                <CornerDownLeft className="w-3.5 h-3.5" />
              </button>
            </form>
          ) : (
            <div className="pt-4 flex items-center justify-between text-xs text-slate-500 border-t border-slate-900 mt-4">
              <span>Execução finalizada.</span>
              <button
                onClick={startScript}
                className="inline-flex items-center gap-1.5 text-emerald-400 hover:underline cursor-pointer"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Executar novamente</span>
              </button>
            </div>
          )}

          <div ref={terminalEndRef} />
        </div>
      </div>
    </section>
  );
};
