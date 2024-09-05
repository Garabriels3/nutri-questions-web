import React from 'react';
import { mockSubjects } from '../../../mockData';
import QuizClient from './QuizClient';

export async function generateStaticParams() {
  return mockSubjects.map((subject) => ({
    subjectId: subject.id,
  }));
}

export default function QuizPage({ params }: { params: { subjectId: string } }) {
  return <QuizClient subjectId={params.subjectId} />;
}