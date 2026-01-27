import { CreditCard, List, TrendingUp, Wallet } from 'lucide-react';

const Home = () => {
  const features: ReadonlyArray<Feature> = [
    {
      icon: <Wallet className="w-8 h-8 text-primary-700" />,
      title: 'Controle Financeiro',
      desccription:
        'Monitore suas despesas e receitas em um só lugar, com uma interface intuitiva e fácil de usar.',
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-primary-700" />,
      title: 'Relatórios',
      desccription:
        'Visualize graficamente seus gastos e entenda para onde seu dinheiro está indo.',
    },
    {
      icon: <List className="w-8 h-8 text-primary-700" />,
      title: 'Categorias Personalizadas',
      desccription:
        'Organize suas transações em categorias para melhor análise.',
    },
    {
      icon: <CreditCard className="w-8 h-8 text-primary-700" />,
      title: 'Transações Ilimitadas',
      desccription:
        'Adicione quantas transações quiser e mantenha um histórico completo de suas finanças.',
    },
  ];

  return <div></div>;
};

export default Home;
