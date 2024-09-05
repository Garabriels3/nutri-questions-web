import Results from '../page';

export function generateStaticParams() {
  return [{ params: ['dummy'] }];
}

export default function ResultsPage() {
  return <Results />;
}