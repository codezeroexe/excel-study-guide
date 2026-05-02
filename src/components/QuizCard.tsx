'use client';

import { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import type { QuizQuestion } from '@/data/types';

interface QuizCardProps {
  questions: QuizQuestion[];
}

export default function QuizCard({ questions }: QuizCardProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [completed, setCompleted] = useState(false);

  const question = questions[currentQ];
  if (!question) return null;

  const handleSelect = (idx: number) => {
    if (showResult) return;
    setSelected(idx);
  };

  const handleSubmit = () => {
    if (selected === null) return;
    setShowResult(true);
    setAnswered(a => a + 1);
    if (selected === question.correctIndex) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQ + 1 >= questions.length) {
      setCompleted(true);
    } else {
      setCurrentQ(q => q + 1);
      setSelected(null);
      setShowResult(false);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelected(null);
    setShowResult(false);
    setScore(0);
    setAnswered(0);
    setCompleted(false);
  };

  if (completed) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl p-6 text-center space-y-4">
        <div className="text-4xl font-bold text-neutral-950 dark:text-neutral-50">{pct}%</div>
        <p className="text-neutral-600 dark:text-neutral-400">
          You got {score} out of {questions.length} correct
        </p>
        <p className="text-sm text-neutral-500">
          {pct >= 80 ? 'Great job! You understand this module.' : pct >= 50 ? 'Good effort! Review the lessons and try again.' : 'Keep studying! Review the lessons above and retry.'}
        </p>
        <button
          onClick={handleRestart}
          className="px-4 py-2 bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 rounded-lg text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
        >
          Retry Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-neutral-500">
          Question {currentQ + 1} of {questions.length}
        </span>
        <span className="text-sm text-neutral-600 dark:text-neutral-400">
          Score: {score}/{answered}
        </span>
      </div>

      <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
        <div
          className="bg-neutral-900 dark:bg-neutral-100 h-2 rounded-full transition-all"
          style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
        />
      </div>

      <h4 className="font-medium text-neutral-900 dark:text-neutral-100">{question.question}</h4>

      <div className="space-y-2">
        {question.options.map((option, idx) => {
          let optionClass = 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700';
          if (selected === idx && !showResult) {
            optionClass = 'border-neutral-900 bg-neutral-100 dark:border-neutral-100 dark:bg-neutral-900 ring-1 ring-neutral-900 dark:ring-neutral-100';
          }
          if (showResult) {
            if (idx === question.correctIndex) {
              optionClass = 'border-neutral-500 bg-neutral-50 dark:bg-neutral-900/20 ring-1 ring-neutral-500';
            } else if (selected === idx && idx !== question.correctIndex) {
              optionClass = 'border-neutral-500 bg-neutral-50 dark:bg-neutral-900/20 ring-1 ring-neutral-500';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={showResult}
              className={`w-full text-left p-3 rounded-lg border transition-colors flex items-center gap-3 ${optionClass}`}
            >
              {showResult && idx === question.correctIndex && (
                <CheckCircle2 className="w-4 h-4 text-neutral-600 flex-shrink-0" />
              )}
              {showResult && selected === idx && idx !== question.correctIndex && (
                <XCircle className="w-4 h-4 text-neutral-600 flex-shrink-0" />
              )}
              {!showResult && (
                <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${selected === idx ? 'border-neutral-900 bg-neutral-900 dark:border-neutral-100 dark:bg-neutral-100' : 'border-neutral-300 dark:border-neutral-600'}`} />
              )}
              <span className="text-sm text-neutral-900 dark:text-neutral-100">{option}</span>
            </button>
          );
        })}
      </div>

      {showResult && (
        <div className={`p-3 rounded-lg text-sm ${selected === question.correctIndex ? 'bg-neutral-50 dark:bg-neutral-900/20 text-neutral-700 dark:text-neutral-300' : 'bg-neutral-50 dark:bg-neutral-900/20 text-neutral-700 dark:text-neutral-300'}`}>
          <div className="flex items-center gap-2 mb-1">
            {selected === question.correctIndex ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <XCircle className="w-4 h-4" />
            )}
            <span className="font-medium">{selected === question.correctIndex ? 'Correct!' : 'Incorrect'}</span>
          </div>
          <p className="text-neutral-600 dark:text-neutral-400">{question.explanation}</p>
        </div>
      )}

      <div className="flex justify-end gap-2">
        {!showResult ? (
          <button
            onClick={handleSubmit}
            disabled={selected === null}
            className="px-4 py-2 bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 rounded-lg text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Check Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 rounded-lg text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
          >
            {currentQ + 1 >= questions.length ? 'See Results' : 'Next Question'}
          </button>
        )}
      </div>
    </div>
  );
}
