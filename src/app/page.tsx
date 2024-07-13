// pages/index.tsx
"use client"
import { useState } from 'react';

import styles from '../styles/Home.module.css';
import { Transaction } from '../../types';
import Form from './components/Form';
import PieChart from './components/PieChart';
import LineChart from './components/LineChart';
import DataTable from './components/DataTable';

const Home: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransaction = (transaction: Transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const removeTransaction = (id: number) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  return (
    <div className={styles.container}>
      <h1>Personal Finance Tracker</h1>
      <Form addTransaction={addTransaction} />
      <div className={styles.charts}>
        <PieChart transactions={transactions} />
        <LineChart transactions={transactions} />
      </div>
      <DataTable transactions={transactions} removeTransaction={removeTransaction} />
    </div>
  );
};

export default Home;

