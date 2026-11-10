import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <>
      <h1>Página não encontrada</h1>
      <Link to="/">Voltar para o catálogo</Link>
    </>
  );
}
