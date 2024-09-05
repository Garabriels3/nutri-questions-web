'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { Container } from '../../components/Container';
import { Header } from '../../components/Header';
import { mockQuestions, Question } from '../../mockData';

interface QuizResult {
  question: Question;
  selectedAnswer: string;
  isCorrect: boolean;
}

interface AnswerData {
  questionId: string;
  selectedAnswer: string;
}

export default function Results() {
  const [results, setResults] = useState<QuizResult[]>([]);
  const [score, setScore] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const subjectId = searchParams.get('subjectId');
    const answersParam = searchParams.get('answers');
    const timeParam = searchParams.get('time');

    if (subjectId && answersParam && timeParam) {
      const answerData: AnswerData[] = JSON.parse(decodeURIComponent(answersParam));
      const questions = mockQuestions.filter(q => q.subjectId === subjectId);
      
      const quizResults = questions.map(question => {
        const answerForQuestion = answerData.find(a => a.questionId === question.id);
        const selectedAnswer = answerForQuestion ? answerForQuestion.selectedAnswer : '';
        const isCorrect = question.answers.find(a => a.isCorrect)?.text === selectedAnswer;
        
        return {
          question,
          selectedAnswer,
          isCorrect
        };
      });

      setResults(quizResults);
      setScore(quizResults.filter(r => r.isCorrect).length);
      setTotalTime(parseInt(timeParam));
    }
  }, [searchParams]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Container>
      <Header title="Resultados do Quiz" subtitle="Veja como você se saiu!" />
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <p className="text-2xl font-bold text-pink-600 mb-4">Pontuação: {score} de {results.length}</p>
        <p className="text-xl text-gray-700 mb-4">Tempo total: {formatTime(totalTime)}</p>
      </div>
      <div className="space-y-6">
        {results.map((result, index) => (
          <div key={index} className={`bg-white rounded-lg shadow-md p-6 ${result.isCorrect ? 'border-green-500' : 'border-red-500'} border-2`}>
            <p className="text-lg font-semibold mb-2 text-gray-800">{result.question.questionText}</p>
            <p className="mb-2 text-gray-700">
              Sua resposta: <span className={result.isCorrect ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>{result.selectedAnswer}</span>
            </p>
            {!result.isCorrect && (
              <p className="text-green-600 font-semibold">
                Resposta correta: {result.question.answers.find(a => a.isCorrect)?.text}
              </p>
            )}
            <div className="mt-2">
              {result.isCorrect ? (
                <span className="text-3xl" role="img" aria-label="Correct">😄</span>
              ) : (
                <span className="text-3xl" role="img" aria-label="Incorrect">😢</span>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 space-y-4">
        <Button onClick={() => router.push('/')}>Voltar para o Início</Button>
        <Button onClick={() => router.push('/history')} variant="secondary">
          Ver Histórico de Quizzes
        </Button>
      </div>
    </Container>
  );
}