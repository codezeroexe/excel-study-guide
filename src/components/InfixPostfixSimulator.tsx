'use client';

import { useState } from 'react';

type Step = {
  action: string;
  stack: string[];
  output: string;
  explanation: string;
};

const precedence: Record<string, number> = {
  '+': 1, '-': 1, '*': 2, '/': 2, '^': 3,
};

function isOperator(c: string): boolean {
  return '+-*/^'.includes(c);
}

function infixToPostfix(infix: string): Step[] {
  const steps: Step[] = [];
  const stack: string[] = [];
  let output = '';

  const chars = infix.replace(/\s+/g, '').split('');

  for (let i = 0; i < chars.length; i++) {
    const c = chars[i];

    if (c === '(') {
      stack.push(c);
      steps.push({
        action: `Push '(' to stack`,
        stack: [...stack],
        output,
        explanation: `Opening parenthesis — push to stack`,
      });
    } else if (c === ')') {
      while (stack.length > 0 && stack[stack.length - 1] !== '(') {
        const popped = stack.pop()!;
        output += popped;
        steps.push({
          action: `Pop '${popped}' (closing paren)`,
          stack: [...stack],
          output,
          explanation: `Pop operators until '(' is found`,
        });
      }
      if (stack.length > 0) stack.pop(); // remove '('
      steps.push({
        action: `Discard '('`,
        stack: [...stack],
        output,
        explanation: `Remove opening parenthesis from stack`,
      });
    } else if (isOperator(c)) {
      while (
        stack.length > 0 &&
        stack[stack.length - 1] !== '(' &&
        precedence[stack[stack.length - 1]] >= precedence[c]
      ) {
        const popped = stack.pop()!;
        output += popped;
        steps.push({
          action: `Pop '${popped}' (higher/equal precedence)`,
          stack: [...stack],
          output,
          explanation: `'${popped}' has ≥ precedence than '${c}' — pop to output`,
        });
      }
      stack.push(c);
      steps.push({
        action: `Push '${c}' to stack`,
        stack: [...stack],
        output,
        explanation: `Operator '${c}' pushed (precedence: ${precedence[c]})`,
      });
    } else {
      output += c;
      steps.push({
        action: `Append '${c}' to output`,
        stack: [...stack],
        output,
        explanation: `Operand — directly append to output`,
      });
    }
  }

  while (stack.length > 0) {
    const popped = stack.pop()!;
    output += popped;
    steps.push({
      action: `Pop '${popped}' (end of expression)`,
      stack: [...stack],
      output,
      explanation: `Empty remaining stack to output`,
    });
  }

  return steps;
}

const examples = [
  { label: 'a*(b+c)', value: 'a*(b+c)' },
  { label: 'a+b*c', value: 'a+b*c' },
  { label: 'a*(b+c+d)', value: 'a*(b+c+d)' },
  { label: '(a+b)*(c-d)', value: '(a+b)*(c-d)' },
  { label: 'a+b*c-d/e', value: 'a+b*c-d/e' },
  { label: 'a^b+c*d', value: 'a^b+c*d' },
];

export default function InfixPostfixSimulator() {
  const [input, setInput] = useState('a*(b+c)');
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [running, setRunning] = useState(false);

  const handleConvert = () => {
    const result = infixToPostfix(input);
    setSteps(result);
    setCurrentStep(0);
    setRunning(false);
  };

  const handleStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleAutoPlay = () => {
    if (running) {
      setRunning(false);
      return;
    }
    if (steps.length === 0) {
      handleConvert();
    }
    setRunning(true);
  };

  // Auto-play effect
  useState(() => {
    if (!running || currentStep >= steps.length - 1) {
      setRunning(false);
      return;
    }
    const timer = setTimeout(() => setCurrentStep(prev => prev + 1), 800);
    return () => clearTimeout(timer);
  });

  const current = currentStep >= 0 && currentStep < steps.length ? steps[currentStep] : null;
  const finalResult = steps.length > 0 ? steps[steps.length - 1].output : '';

  return (
    <div className="space-y-4">
      {/* Input */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-500">Infix Expression</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleConvert()}
            className="flex-1 px-3 py-2 text-sm font-mono bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="e.g. a*(b+c)"
          />
          <button
            onClick={handleConvert}
            className="px-4 py-2 text-sm font-bold bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Convert
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {examples.map(ex => (
            <button
              key={ex.value}
              onClick={() => { setInput(ex.value); setSteps([]); setCurrentStep(-1); }}
              className="px-2 py-1 text-xs font-mono bg-gray-100 dark:bg-gray-800 rounded hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
            >
              {ex.label}
            </button>
          ))}
        </div>
      </div>

      {/* Controls */}
      {steps.length > 0 && (
        <div className="flex gap-2">
          <button
            onClick={handleStep}
            disabled={currentStep >= steps.length - 1}
            className="px-3 py-1.5 text-xs font-bold bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-40 transition-colors"
          >
            Step →
          </button>
          <button
            onClick={handleAutoPlay}
            className="px-3 py-1.5 text-xs font-bold bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
          >
            {running ? '⏸ Pause' : '▶ Auto Play'}
          </button>
          <span className="text-xs text-gray-400 self-center">
            Step {currentStep + 1} / {steps.length}
          </span>
        </div>
      )}

      {/* Result */}
      {finalResult && (
        <div className="flex items-center gap-3">
          <div className="font-mono text-sm bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded border border-gray-200 dark:border-gray-700">
            Infix: <span className="text-gray-600 dark:text-gray-400">{input}</span>
          </div>
          <span className="text-gray-400">→</span>
          <div className="font-mono text-sm bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded border border-green-200 dark:border-green-800">
            Postfix: <span className="text-green-700 dark:text-green-400 font-bold">{finalResult}</span>
          </div>
        </div>
      )}

      {/* Current Step Visualization */}
      {current && (
        <div className="grid grid-cols-2 gap-4">
          {/* Stack */}
          <div>
            <h4 className="text-xs font-bold text-gray-500 mb-2">Stack (Top →)</h4>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 min-h-[120px]">
              {current.stack.length === 0 ? (
                <span className="text-xs text-gray-400">Empty</span>
              ) : (
                <div className="space-y-1">
                  {[...current.stack].reverse().map((item, i) => (
                    <div
                      key={i}
                      className={`px-2 py-1 text-sm font-mono font-bold rounded text-center ${
                        i === 0
                          ? 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-700'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                      }`}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Output */}
          <div>
            <h4 className="text-xs font-bold text-gray-500 mb-2">Output String</h4>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 min-h-[120px]">
              <div className="font-mono text-lg font-bold text-green-600 dark:text-green-400 break-all">
                {current.output || <span className="text-gray-400 text-sm">Empty</span>}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step explanation */}
      {current && (
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800">
          <div className="text-xs font-bold text-blue-700 dark:text-blue-300 mb-1">{current.action}</div>
          <div className="text-xs text-blue-600 dark:text-blue-400">{current.explanation}</div>
        </div>
      )}

      {/* Precedence reference */}
      <div className="text-xs text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
        <span className="font-bold">Operator Precedence:</span> + - (1) &lt; * / (2) &lt; ^ (3) &nbsp;|&nbsp; ( ) highest
      </div>
    </div>
  );
}
