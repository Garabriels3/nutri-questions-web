'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Fireworks, Trombone } from '../../../components/Animations';
import { Button } from '../../../components/Button';
import { Container } from '../../../components/Container';
import { Header } from '../../../components/Header';
import { Sound } from '../../../components/Sound';
import { Timer } from '../../../components/Timer';
import { mockQuestions, Question } from '../../../mockData';

export default function Quiz({ params }: { params: { subjectId: string } }) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerConfirmed, setIsAnswerConfirmed] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [showFireworks, setShowFireworks] = useState(false);
  const [showTrombone, setShowTrombone] = useState(false);
  const [fadeState, setFadeState] = useState<'in' | 'out'>('in');
  const [playSound, setPlaySound] = useState(false);
  const [startTime] = useState<number>(Date.now());
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const router = useRouter();

  useEffect(() => {
    const filteredQuestions = mockQuestions.filter(q => q.subjectId === params.subjectId);
    setQuestions(filteredQuestions);
  }, [params.subjectId]);

  const handleAnswerSelect = (answerText: string) => {
    if (!isAnswerConfirmed) {
      setSelectedAnswer(answerText);
      setSelectedAnswers({...selectedAnswers, [question.id]: answerText});
    }
  };

  const handleConfirmAnswer = () => {
    if (selectedAnswer) {
      const correctAnswer = question.answers.find(answer => answer.isCorrect);
      const isCorrect = selectedAnswer === correctAnswer?.text;
      setIsCorrect(isCorrect);
      setIsAnswerConfirmed(true);
      if (isCorrect) {
        setScore(score + 1);
        setShowFireworks(true);
        setPlaySound(true);
        setTimeout(() => {
          setShowFireworks(false);
          setPlaySound(false);
        }, 2000);
      } else {
        setShowTrombone(true);
        setTimeout(() => setShowTrombone(false), 2000);
      }
    }
  };

  const handleNextQuestion = () => {
    setFadeState('out');
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setIsAnswerConfirmed(false);
        setFadeState('in');
      } else {
        finishQuiz();
      }
    }, 300);
  };

  const finishQuiz = () => {
    if (!isQuizFinished) {
      setIsQuizFinished(true);
      const quizDuration = Math.floor((Date.now() - startTime) / 1000);
      const quizData = questions.map((q) => ({
        questionId: q.id,
        selectedAnswer: selectedAnswers[q.id] || ''
      }));
      const encodedAnswers = encodeURIComponent(JSON.stringify(quizData));
      router.push(`/results?subjectId=${params.subjectId}&answers=${encodedAnswers}&time=${quizDuration}`);
    }
  };

  const handleCancelQuiz = () => {
    if (confirm('Tem certeza que deseja cancelar o quiz? Seu progresso será perdido.')) {
      router.push('/');
    }
  };

  if (questions.length === 0) {
    return <Container><Header title="Nenhuma questão encontrada para esta matéria." /></Container>;
  }

  const question = questions[currentQuestion];

  return (
    <Container>
      <Header title={`Questão ${currentQuestion + 1} de ${questions.length}`} />
      <div className="flex justify-center mb-4">
        <Timer startTime={startTime} />
      </div>
      <div className={`w-full max-w-2xl relative fade-${fadeState}`} style={{transition: 'opacity 0.3s ease-in-out'}}>
        <Fireworks show={showFireworks} />
        <Trombone show={showTrombone} />
        <Sound play={playSound} />
        <p className="text-xl mb-4 text-gray-800 font-semibold">{question.questionText}</p>
        <div className="space-y-4">
          {question.answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(answer.text)}
              className={`w-full p-4 text-left rounded transition-colors duration-300 ${
                selectedAnswer === answer.text
                  ? isAnswerConfirmed
                    ? isCorrect
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                    : 'bg-blue-200 text-gray-800'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }`}
              disabled={isAnswerConfirmed}
            >
              {answer.text}
            </button>
          ))}
        </div>
        <div className="mt-8 space-y-4">
          {!isAnswerConfirmed ? (
            <Button onClick={handleConfirmAnswer} disabled={!selectedAnswer}>
              Confirmar Resposta
            </Button>
          ) : (
            <Button onClick={handleNextQuestion}>
              {currentQuestion === questions.length - 1 ? 'Finalizar Quiz' : 'Próxima Pergunta'}
            </Button>
          )}
          <Button onClick={handleCancelQuiz} variant="secondary">
            Cancelar Quiz
          </Button>
        </div>
      </div>
    </Container>
  );
}