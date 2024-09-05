import React from 'react';
import Results from '../page';

export function generateStaticParams() {
  return [{ params: ['dummy'] }];
}

export default function ResultsPage({ params }: { params: string[] }) {
  return <Results />;
}