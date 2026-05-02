'use client';

import { useState } from 'react';

type Topic = 'combinatorics' | 'bayes' | 'distributions' | 'hypothesis';
type Difficulty = 'standard' | 'advanced';

interface Problem {
  question: string;
  solution: string;
  answer: string;
}

function rand(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randFloat(min: number, max: number, decimals = 2): number {
  return Number((Math.random() * (max - min) + min).toFixed(decimals));
}

function factorial(n: number): number {
  if (n <= 1) return 1;
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}

function nCr(n: number, r: number): number {
  return factorial(n) / (factorial(r) * factorial(n - r));
}

function nPr(n: number, r: number): number {
  return factorial(n) / factorial(n - r);
}

function generateCombinatorics(diff: Difficulty): Problem {
  const isPerm = Math.random() > 0.5;
  if (isPerm) {
    const n = rand(5, diff === 'advanced' ? 12 : 8);
    const r = rand(2, Math.min(n - 1, diff === 'advanced' ? 6 : 4));
    const answer = nPr(n, r);
    const contexts = [
      `arrange ${r} books from a shelf of ${n}`,
      `seat ${r} people from ${n} in a row`,
      `assign ${r} different roles to ${r} people chosen from ${n}`,
      `create a ${r}-digit code from ${n} distinct digits (no repetition)`,
    ];
    return {
      question: `How many ways to ${contexts[rand(0, contexts.length - 1)]}?`,
      solution: `P(${n},${r}) = ${n}! / (${n}-${r})! = ${n}! / ${n - r}!\n= ${Array.from({ length: r }, (_, i) => n - i).join(' × ')}\n= ${answer.toLocaleString()}`,
      answer: answer.toLocaleString(),
    };
  } else {
    const n = rand(5, diff === 'advanced' ? 15 : 10);
    const r = rand(2, Math.min(n - 1, diff === 'advanced' ? 7 : 5));
    const answer = nCr(n, r);
    const contexts = [
      `choose ${r} students from a class of ${n} for a team`,
      `select ${r} items from a menu of ${n}`,
      `pick ${r} cards from a set of ${n}`,
      `form a committee of ${r} from ${n} candidates`,
    ];
    return {
      question: `How many ways to ${contexts[rand(0, contexts.length - 1)]}?`,
      solution: `C(${n},${r}) = ${n}! / (${r}! × ${n - r}!)\n= ${Array.from({ length: r }, (_, i) => n - i).join(' × ')} / ${r}!\n= ${answer.toLocaleString()}`,
      answer: answer.toLocaleString(),
    };
  }
}

function generateBayes(diff: Difficulty): Problem {
  const prior = diff === 'advanced' ? randFloat(0.001, 0.1, 3) : randFloat(0.01, 0.3, 2);
  const sensitivity = randFloat(0.85, 0.99, 2);
  const fpr = diff === 'advanced' ? randFloat(0.01, 0.15, 3) : randFloat(0.02, 0.1, 2);
  const notA = 1 - prior;
  const evidence = sensitivity * prior + fpr * notA;
  const posterior = evidence > 0 ? (sensitivity * prior) / evidence : 0;

  const contexts = [
    { disease: 'a rare disease', test: 'a diagnostic test' },
    { disease: 'a manufacturing defect', test: 'a quality check' },
    { disease: 'spam email', test: 'a spam filter' },
  ];
  const ctx = contexts[rand(0, contexts.length - 1)];

  return {
    question: `${(prior * 100).toFixed(1)}% of population has ${ctx.disease}. ${ctx.test.charAt(0).toUpperCase() + ctx.test.slice(1)} is ${(sensitivity * 100).toFixed(0)}% sensitive and has ${(fpr * 100).toFixed(1)}% false positive rate. If a person tests positive, what is P(${ctx.disease}|positive)?`,
    solution: `P(A) = ${prior} (prior)\nP(B|A) = ${sensitivity} (sensitivity)\nP(B|¬A) = ${fpr} (false positive)\n\nP(B) = P(B|A)×P(A) + P(B|¬A)×P(¬A)\n= ${sensitivity} × ${prior} + ${fpr} × ${notA.toFixed(3)}\n= ${(sensitivity * prior).toFixed(4)} + ${(fpr * notA).toFixed(4)} = ${evidence.toFixed(4)}\n\nP(A|B) = ${sensitivity} × ${prior} / ${evidence.toFixed(4)}\n= ${(sensitivity * prior).toFixed(4)} / ${evidence.toFixed(4)}\n= ${(posterior * 100).toFixed(2)}%`,
    answer: `${(posterior * 100).toFixed(2)}%`,
  };
}

function generateDistribution(diff: Difficulty): Problem {
  const type = rand(0, 2);
  if (type === 0) {
    // Binomial
    const n = diff === 'advanced' ? rand(10, 20) : rand(5, 10);
    const p = randFloat(0.2, 0.8, 1);
    const x = rand(0, n);
    const prob = nCr(n, x) * Math.pow(p, x) * Math.pow(1 - p, n - x);
    return {
      question: `In ${n} coin flips with P(heads) = ${p}, what is P(exactly ${x} heads)? (Binomial)`,
      solution: `P(X=${x}) = C(${n},${x}) × ${p}^${x} × ${(1 - p).toFixed(1)}^${n - x}\n= ${nCr(n, x)} × ${Math.pow(p, x).toFixed(4)} × ${Math.pow(1 - p, n - x).toFixed(4)}\n= ${prob.toFixed(4)}`,
      answer: prob.toFixed(4),
    };
  } else if (type === 1) {
    // Poisson
    const lambda = diff === 'advanced' ? randFloat(2, 10, 1) : randFloat(1, 5, 1);
    const x = rand(0, Math.ceil(lambda * 2));
    let fact = 1;
    for (let i = 2; i <= x; i++) fact *= i;
    const prob = (Math.exp(-lambda) * Math.pow(lambda, x)) / fact;
    return {
      question: `A call center receives λ = ${lambda} calls/min on average. What is P(exactly ${x} calls in one minute)? (Poisson)`,
      solution: `P(X=${x}) = e^(-${lambda}) × ${lambda}^${x} / ${x}!\n= ${Math.exp(-lambda).toFixed(4)} × ${Math.pow(lambda, x).toFixed(2)} / ${fact}\n= ${prob.toFixed(4)}`,
      answer: prob.toFixed(4),
    };
  } else {
    // Normal
    const mu = rand(50, 100);
    const sigma = rand(5, 20);
    const x = mu + rand(-2, 2) * sigma;
    const z = (x - mu) / sigma;
    return {
      question: `X ~ N(${mu}, ${sigma}²). Find the Z-score for X = ${x}.`,
      solution: `Z = (X - μ) / σ\n= (${x} - ${mu}) / ${sigma}\n= ${x - mu} / ${sigma}\n= ${z.toFixed(4)}`,
      answer: z.toFixed(4),
    };
  }
}

function generateHypothesis(diff: Difficulty): Problem {
  const mu = rand(50, 100);
  const xBar = mu + rand(-10, 10);
  const sigma = rand(5, 20);
  const n = diff === 'advanced' ? rand(15, 25) : rand(30, 100);
  const se = sigma / Math.sqrt(n);
  const z = (xBar - mu) / se;

  return {
    question: `Test H₀: μ = ${mu} vs H₁: μ ≠ ${mu}. Sample: x̄ = ${xBar}, σ = ${sigma}, n = ${n}. Calculate the test statistic and determine if H₀ is rejected at α = 0.05.`,
    solution: `H₀: μ = ${mu}, H₁: μ ≠ ${mu}\nSE = σ/√n = ${sigma}/√${n} = ${se.toFixed(4)}\nZ = (x̄ - μ)/SE = (${xBar} - ${mu})/${se.toFixed(4)} = ${z.toFixed(4)}\nCritical Z (α=0.05, two-tailed) = ±1.96\n|Z| = ${Math.abs(z).toFixed(4)} ${Math.abs(z) > 1.96 ? '>' : '≤'} 1.96\n→ ${Math.abs(z) > 1.96 ? 'Reject H₀' : 'Fail to reject H₀'}`,
    answer: `Z = ${z.toFixed(4)}, ${Math.abs(z) > 1.96 ? 'Reject' : 'Fail to reject'} H₀`,
  };
}

const generators: Record<Topic, (d: Difficulty) => Problem> = {
  combinatorics: generateCombinatorics,
  bayes: generateBayes,
  distributions: generateDistribution,
  hypothesis: generateHypothesis,
};

export default function WorksheetGenerator() {
  const [topic, setTopic] = useState<Topic>('combinatorics');
  const [difficulty, setDifficulty] = useState<Difficulty>('standard');
  const [problems, setProblems] = useState<(Problem & { show: boolean })[]>([]);
  const [count, setCount] = useState(3);

  const generate = () => {
    const gen = generators[topic];
    const newProblems = Array.from({ length: count }, () => ({
      ...gen(difficulty),
      show: false,
    }));
    setProblems(newProblems);
  };

  const toggleSolution = (idx: number) => {
    setProblems(prev => prev.map((p, i) => i === idx ? { ...p, show: !p.show } : p));
  };

  const topicLabels: Record<Topic, string> = {
    combinatorics: 'Combinatorics',
    bayes: "Bayes' Theorem",
    distributions: 'Distributions',
    hypothesis: 'Hypothesis Testing',
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex gap-2">
          {(Object.entries(topicLabels) as [Topic, string][]).map(([key, label]) => (
            <button key={key} onClick={() => setTopic(key)} className={`px-2 py-1 text-[10px] font-bold rounded border transition-all ${topic === key ? 'bg-neutral-100 dark:bg-neutral-900/30 border-neutral-400 text-neutral-700 dark:text-neutral-300' : 'border-border dark:border-border text-neutral-400'}`}>
              {label}
            </button>
          ))}
        </div>
        <div className="flex gap-1">
          {(['standard', 'advanced'] as Difficulty[]).map(d => (
            <button key={d} onClick={() => setDifficulty(d)} className={`px-2 py-1 text-[10px] font-bold rounded border transition-all ${difficulty === d ? 'bg-accent text-accent-text border-neutral-600' : 'border-border dark:border-border text-neutral-400'}`}>
              {d.charAt(0).toUpperCase() + d.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs text-neutral-500">#:</label>
          <select value={count} onChange={e => setCount(Number(e.target.value))} className="px-2 py-1 bg-white dark:bg-neutral-800 border border-border dark:border-border rounded text-xs font-mono">
            {[1, 2, 3, 5].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <button onClick={generate} className="px-3 py-1.5 text-xs font-bold bg-accent text-accent-text rounded-lg hover:bg-neutral-700 transition-colors">
          Generate
        </button>
      </div>

      {/* Problems */}
      {problems.length > 0 && (
        <div className="space-y-3">
          {problems.map((p, i) => (
            <div key={i} className="bg-white dark:bg-neutral-900 rounded-lg border border-border dark:border-border overflow-hidden">
              <div className="p-4">
                <div className="flex items-start gap-2">
                  <span className="text-xs font-bold text-neutral-500 mt-0.5">Q{i + 1}.</span>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300">{p.question}</p>
                </div>
                <div className="mt-2 text-xs font-mono text-neutral-500">
                  Answer: <span className="text-neutral-600 font-bold">{p.answer}</span>
                </div>
              </div>
              <button onClick={() => toggleSolution(i)} className="w-full px-4 py-2 text-xs font-bold bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors text-left">
                {p.show ? '▲ Hide Solution' : '▼ Show Solution'}
              </button>
              {p.show && (
                <div className="px-4 pb-4 bg-neutral-50 dark:bg-neutral-900/10">
                  <pre className="text-xs font-mono text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap">{p.solution}</pre>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {problems.length === 0 && (
        <div className="text-center py-8 text-neutral-400 text-sm">
          Select a topic and difficulty, then click Generate to create practice problems.
        </div>
      )}

      <div className="text-xs text-neutral-400 text-center bg-neutral-50 dark:bg-neutral-800 rounded-lg p-3">
        Procedurally generated problems with randomized values. Click Show Solution for step-by-step working.
      </div>
    </div>
  );
}
