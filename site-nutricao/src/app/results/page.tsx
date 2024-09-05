'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { Container } from '../../components/Container';
import { Header } from '../../components/Header';
import { mockQuestions } from '../../mockData';

interface QuizResult {
  questionId: string;
  selectedAnswer: string;
}

export default function Results() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [quizDuration, setQuizDuration] = useState(0);

  useEffect(() => {
    const subjectId = searchParams.get('subjectId');
    const answersParam = searchParams.get('answers');
    const timeParam = searchParams.get('time');

    if (subjectId && answersParam && timeParam) {
      const answers: QuizResult[] = JSON.parse(decodeURIComponent(answersParam));
      const questions = mockQuestions.filter(q => q.subjectId === subjectId);
      const correctAnswers = answers.filter((answer, index) => {
        const question = questions[index];
        const correctAnswer = question.answers.find(a => a.isCorrect);
        return answer.selectedAnswer === correctAnswer?.text;
      });

      setScore(correctAnswers.length);
      setTotalQuestions(questions.length);
      setQuizDuration(parseInt(timeParam));
    }
  }, [searchParams]);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Container>
      <Header title="Resultados do Quiz" subtitle="Veja como você se saiu!" />
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-pink-600 mb-4">Sua pontuação</h2>
        <p className="text-xl mb-2">
          Você acertou {score} de {totalQuestions} questões!
        </p>
        <p className="text-lg mb-4">
          Tempo total: {formatDuration(quizDuration)}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div
            className="bg-pink-600 h-2.5 rounded-full"
            style={{ width: `${(score / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>
      <div className="space-y-4">
        <Button onClick={() => router.push('/')}>Voltar para o Início</Button>
        <Button onClick={() => router.push('/history')} variant="secondary">
          Ver Histórico de Quizzes
        </Button>
      </div>
    </Container>
  );
}