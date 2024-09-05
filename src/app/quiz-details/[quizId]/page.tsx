import React from 'react';
import QuizDetailsClient from '../../../components/QuizDetailsClient';
import { QuizResult, getQuizDetails } from '../../../firebaseUtils';

export async function generateStaticParams() {
  // Aqui você deve retornar um array de objetos com os possíveis valores para quizId
  // Por enquanto, vamos usar alguns valores de exemplo
  return [
    { quizId: 'example1' },
    { quizId: 'example2' },
    { quizId: 'example3' },
  ];
}

export default async function QuizDetails({ params }: { params: { quizId: string } }) {
  const quizDetails: QuizResult | null = await getQuizDetails(params.quizId);

  if (!quizDetails) {
    return <div>Carregando...</div>;
  }

  return <QuizDetailsClient quizDetails={quizDetails} />;
}