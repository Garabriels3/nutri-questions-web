'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '../../../components/Button';
import { Container } from '../../../components/Container';
import { Header } from '../../../components/Header';
import { QuizResult, getQuizDetails } from '../../../firebaseUtils';

export default function QuizDetails({ params }: { params: { quizId: string } }) {
  const [quizDetails, setQuizDetails] = useState<QuizResult | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchQuizDetails = async () => {
      const details = await getQuizDetails(params.quizId);
      setQuizDetails(details);
    };
    fetchQuizDetails();
  }, [params.quizId]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (!quizDetails) {
    return <Container><Header title="Carregando..." /></Container>;
  }

  return (
    <Container>
      <Header title="Detalhes do Quiz" subtitle={`Realizado em ${new Date(quizDetails.timestamp).toLocaleDateString('pt-BR')}`} />
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <p className="text-2xl font-bold text-pink-600 mb-4">Pontuação: {quizDetails.correctAnswersCount} de {quizDetails.totalQuestions}</p>
        <p className="text-xl text-gray-700 mb-4">Tempo total: {formatTime(quizDetails.duration)}</p>
      </div>
      <div className="space-y-6">
        {quizDetails.quizData.map((question, index) => (
          <div key={index} className={`bg-white rounded-lg shadow-md p-6 ${question.selectedAnswer === question.answers.find(a => a.isCorrect)?.text ? 'border-green-500' : 'border-red-500'} border-2`}>
            <p className="text-lg font-semibold mb-2 text-gray-800">{question.questionText}</p>
            <p className="mb-2 text-gray-700">
              Sua resposta: <span className={question.selectedAnswer === question.answers.find(a => a.isCorrect)?.text ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>{question.selectedAnswer}</span>
            </p>
            {question.selectedAnswer !== question.answers.find(a => a.isCorrect)?.text && (
              <p className="text-green-600 font-semibold">
                Resposta correta: {question.answers.find(a => a.isCorrect)?.text}
              </p>
            )}
            <div className="mt-2">
              {question.selectedAnswer === question.answers.find(a => a.isCorrect)?.text ? (
                <span className="text-3xl" role="img" aria-label="Correct">😄</span>
              ) : (
                <span className="text-3xl" role="img" aria-label="Incorrect">😢</span>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 space-y-4">
        <Button onClick={() => router.push('/history')}>Voltar para o Histórico</Button>
        <Button onClick={() => router.push('/')} variant="secondary">
          Voltar para o Início
        </Button>
      </div>
    </Container>
  );
}