'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { Container } from '../../components/Container';
import { Header } from '../../components/Header';
import { QuizHistoryItem, getQuizHistory } from '../../firebaseUtils';

export default function History() {
  const [historyData, setHistoryData] = useState<QuizHistoryItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Simula a chamada para o Firestore
    const fetchHistory = async () => {
      const history = await getQuizHistory('user123'); // Substitua 'user123' pelo ID real do usuário
      setHistoryData(history);
    };
    fetchHistory();
  }, []);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleQuizClick = (quizId: string) => {
    router.push(`/quiz-details/${quizId}`);
  };

  return (
    <Container>
      <Header title="Histórico de Quizzes" subtitle="Veja seu progresso ao longo do tempo!" />
      <div className="space-y-6">
        {historyData.map((item) => (
          <div 
            key={item.id} 
            className="bg-white rounded-lg shadow-md p-6 border-2 border-pink-300 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleQuizClick(item.id)}
          >
            <h3 className="text-xl font-bold text-pink-600 mb-2">{item.subject}</h3>
            <p className="text-gray-700">Data: {formatDate(item.date)}</p>
            <p className="text-gray-700">Pontuação: {item.score} de {item.totalQuestions}</p>
            <p className="text-gray-700">Duração: {formatDuration(item.duration)}</p>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <Button onClick={() => router.push('/')}>Voltar para o Início</Button>
      </div>
    </Container>
  );
}