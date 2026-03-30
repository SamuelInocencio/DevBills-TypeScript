import { AlertCircle, ArrowDown, ArrowUp, Plus, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';
import MonthYearSelect from '../components/MonthYearSelect';
import { getTransactions } from '../services/transactionService';
import { type Transaction, TransactionType } from '../types/transactions';

const Transactions = () => {
  const currentDate = new Date();
  const [year, setYear] = useState<number>(currentDate.getFullYear());
  const [month, setMonth] = useState<number>(currentDate.getMonth());
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async (): Promise<void> => {
      try {
        setLoading(true);
        setError('');
        const data = await getTransactions({ month, year });
        setTransactions(data);
      } catch (err) {
        setError('Não foi possível carregar as transações, tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [month, year]);

  return (
    <div className="container-app py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Transações</h1>
        <Link
          to="/transacoes/nova"
          className="bg-primary-500 text-[#051626] font-semibold px-4 py-2.5 rounded-xl flex items-center justify-center hover:bg-primary-600 transition-all"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nova Transação
        </Link>
      </div>
      <Card className="mb-6">
        <MonthYearSelect
          month={month}
          year={year}
          onMonthChange={setMonth}
          onYearChange={setYear}
        />
      </Card>
      <Card className="mb-6">
        <Input
          id
          placeholder="Buscar transações..."
          icon={<Search className="w-4 h-4" />}
          fullWidth
          rror="Erro de pesquisa"
        />
      </Card>

      <Card className="overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p>{error}</p>
            <Button onClick={fetchTransactions} className="mx-auto mt-6">
              Tentar Novamente
            </Button>
          </div>
        ) : transactions?.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">Nenhuma transação encontrada.</p>
            <Link
              to="/transacoes/nova"
              className="w-fit mx-auto mt-6 bg-primary-500 text-[#051626] font-semibold px-4 py-2.5 rounded-xl flex items-center justify-center hover:bg-primary-600 transition-all"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nova Transação
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="divide-y divide-gray-700 min-h-full">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase"
                  >
                    Descrição
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase"
                  >
                    Data
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase"
                  >
                    Categoria
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase"
                  >
                    Valor
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase"
                  >
                    {' '}
                  </th>
                </tr>
              </thead>
              <tbody divide-y divide-gray-700>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-800">
                    <td className='px-6 py-4 text-sm text-gray-400 whitespace-nowrap'>
                      <div className='flex items-center'>
                        <div className='mr-2'>
                          {transaction.type === TransactionType.INCOME ? (
                            <ArrowUp className="w-4 h-4 text-primary-500" />
                          ) : (
                            <ArrowDown className="w-4 h-4 text-red-500" />
                          )}
                        </div>
                        <span className='text-sm font-medium text-gray-50'>
                          {transaction.description}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Transactions;
