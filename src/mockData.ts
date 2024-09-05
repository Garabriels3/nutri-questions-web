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

interface Answer {
  text: string;
  isCorrect: boolean;
}

export const mockSubjects: Subject[] = [
  { id: 'nutricao-basica', title: 'Nutrição Básica' },
  { id: 'bioquimica', title: 'Bioquímica' },
  { id: 'nutricao-esportiva', title: 'Nutrição Esportiva' },
];

export const mockQuestions: Question[] = [
  {
    id: '1',
    subjectId: 'nutricao-basica',
    questionText: 'Qual vitamina é conhecida como "vitamina do sol"?',
    answers: [
      { text: 'A) Vitamina A', isCorrect: false },
      { text: 'B) Vitamina B', isCorrect: false },
      { text: 'C) Vitamina C', isCorrect: false },
      { text: 'D) Vitamina D', isCorrect: true },
    ],
  },
  {
    id: '2',
    subjectId: 'nutricao-basica',
    questionText: 'Qual destes alimentos é uma boa fonte de proteína vegetal?',
    answers: [
      { text: 'A) Maçã', isCorrect: false },
      { text: 'B) Lentilha', isCorrect: true },
      { text: 'C) Batata', isCorrect: false },
      { text: 'D) Alface', isCorrect: false },
    ],
  },
  {
    id: '3',
    subjectId: 'bioquimica',
    questionText: 'Qual é a função principal das fibras na alimentação?',
    answers: [
      { text: 'A) Fornecer energia', isCorrect: false },
      { text: 'B) Construir músculos', isCorrect: false },
      { text: 'C) Melhorar a digestão', isCorrect: true },
      { text: 'D) Hidratar o corpo', isCorrect: false },
    ],
  },
  {
    id: '4',
    subjectId: 'bioquimica',
    questionText: 'Qual dos seguintes é um aminoácido essencial?',
    answers: [
      { text: 'A) Glicina', isCorrect: false },
      { text: 'B) Alanina', isCorrect: false },
      { text: 'C) Lisina', isCorrect: true },
      { text: 'D) Tirosina', isCorrect: false },
    ],
  },
  {
    id: '5',
    subjectId: 'nutricao-esportiva',
    questionText: 'Qual é o principal combustível para exercícios de alta intensidade e curta duração?',
    answers: [
      { text: 'A) Gordura', isCorrect: false },
      { text: 'B) Proteína', isCorrect: false },
      { text: 'C) Carboidrato', isCorrect: true },
      { text: 'D) Vitaminas', isCorrect: false },
    ],
  },
];