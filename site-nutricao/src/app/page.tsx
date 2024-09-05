'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '../components/Button';
import { Container } from '../components/Container';
import { Header } from '../components/Header';
import { Select } from '../components/Select';
import { mockSubjects } from '../mockData';

export default function Home() {
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const router = useRouter();

  const handleStartQuiz = () => {
    if (selectedSubject) {
      router.push(`/quiz/${selectedSubject}`);
    }
  };

  const subjectOptions = [
    { value: '', label: 'Selecione uma matéria (não vale fechar os olhos)' },
    ...mockSubjects.map(subject => ({ value: subject.id, label: subject.title }))
  ];

  return (
    <Container>
      <Header
        title="Quiz da Leticia Nutri"
        subtitle="Porque decorar é mais fácil que comer brócolis!"
      />
      <Select
        id="subject-select"
        label="Escolha sua matéria favorita (ou a que você menos odeia):"
        options={subjectOptions}
        value={selectedSubject}
        onChange={(e) => setSelectedSubject(e.target.value)}
      />
      <Button onClick={handleStartQuiz} disabled={!selectedSubject}>
        Iniciar Quiz (Prometo que não dói!)
      </Button>
      <div className="mt-4">
        <Link href="/history">
          <Button variant="secondary">
            Ver Histórico de Quizzes
          </Button>
        </Link>
      </div>
    </Container>
  );
}
