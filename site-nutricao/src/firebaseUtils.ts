import { addDoc, collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from './firebaseConfig';

export interface Subject {
  id: string;
  title: string;
}

export interface Question {
  id: string;
  subjectId: string;
  questionText: string;
  answers: Answer[];
}

export interface Answer {
  text: string;
  isCorrect: boolean;
}

export interface QuizResult {
  userId: string;
  quizData: QuizQuestion[];
  correctAnswersCount: number;
  totalQuestions: number;
  duration: number;
  timestamp: Date;
}

interface QuizQuestion extends Question {
  selectedAnswer: string;
}

export interface QuizHistoryItem {
  id: string;
  userId: string;
  date: Date;
  subject: string;
  score: number;
  totalQuestions: number;
  duration: number;
}

// Função para obter todas as matérias
export async function getSubjects(): Promise<Subject[]> {
  const subjectsCollection = collection(db, 'subjects');
  const subjectsSnapshot = await getDocs(subjectsCollection);
  return subjectsSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Subject));
}

// Função para obter questões de uma matéria específica
export async function getQuestionsBySubject(subjectId: string): Promise<Question[]> {
  const questionsCollection = collection(db, 'questions');
  const q = query(questionsCollection, where("subjectId", "==", subjectId));
  const questionsSnapshot = await getDocs(q);
  return questionsSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Question));
}

// Função para enviar resultados do quiz
export async function submitQuiz(userId: string, quizData: QuizQuestion[], duration: number): Promise<number> {
  const correctAnswersCount = quizData.reduce((count, question) => {
    const correctAnswer = question.answers.find(answer => answer.isCorrect);
    return count + (question.selectedAnswer === correctAnswer?.text ? 1 : 0);
  }, 0);

  const resultsCollection = collection(db, 'results');
  await addDoc(resultsCollection, {
    userId,
    quizData,
    correctAnswersCount,
    totalQuestions: quizData.length,
    duration,
    timestamp: new Date()
  });

  return correctAnswersCount;
}

// Função para adicionar o resultado do quiz ao histórico
export async function addQuizToHistory(quizResult: QuizResult): Promise<void> {
  const historyCollection = collection(db, 'quizHistory');
  await addDoc(historyCollection, {
    userId: quizResult.userId,
    date: new Date(),
    subject: quizResult.quizData[0].subjectId, // Assumindo que todas as questões são do mesmo assunto
    score: quizResult.correctAnswersCount,
    totalQuestions: quizResult.totalQuestions,
    duration: quizResult.duration,
  });
}

// Função para obter o histórico de quizzes de um usuário
export async function getQuizHistory(userId: string): Promise<QuizHistoryItem[]> {
  const historyCollection = collection(db, 'quizHistory');
  const q = query(historyCollection, where("userId", "==", userId), orderBy("date", "desc"));
  const historySnapshot = await getDocs(q);
  return historySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as QuizHistoryItem));
}

// Função para obter os detalhes de um quiz específico
export async function getQuizDetails(quizId: string): Promise<QuizResult | null> {
  // Implementação temporária
  console.log(`Buscando detalhes do quiz com ID: ${quizId}`);
  
  // Simula uma busca no banco de dados
  const mockQuizResult: QuizResult = {
    userId: 'user123',
    quizData: [
      {
        id: 'q1',
        subjectId: 'subject1',
        questionText: 'Pergunta de exemplo',
        answers: [
          { text: 'Resposta 1', isCorrect: false },
          { text: 'Resposta 2', isCorrect: true },
        ],
        selectedAnswer: 'Resposta 2'
      }
    ],
    correctAnswersCount: 1,
    totalQuestions: 1,
    duration: 60,
    timestamp: new Date()
  };

  // Simula um delay de rede
  await new Promise(resolve => setTimeout(resolve, 1000));

  return mockQuizResult;
}