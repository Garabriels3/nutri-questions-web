import React from 'react';
import { QuizResult } from '../firebaseUtils';

interface QuizDetailsClientProps {
  quizDetails: QuizResult;
}

const QuizDetailsClient: React.FC<QuizDetailsClientProps> = ({ quizDetails }) => {
  return (
    <div>
      <h2>Detalhes do Quiz</h2>
      <p>Usuário: {quizDetails.userId}</p>
      <p>Pontuação: {quizDetails.correctAnswersCount} de {quizDetails.totalQuestions}</p>
      <p>Duração: {quizDetails.duration} segundos</p>
      <h3>Perguntas:</h3>
      <ul>
        {quizDetails.quizData.map((question, index) => (
          <li key={index}>
            <p>{question.questionText}</p>
            <p>Resposta selecionada: {question.selectedAnswer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizDetailsClient;