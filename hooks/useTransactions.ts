"use client";

import { useState, useEffect } from "react";

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
}

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("transactions");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction: Transaction) => {
    setTransactions((prev) => [transaction, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const monthlyData = transactions.reduce((acc: any[], transaction) => {
    const month = new Date(transaction.date).toLocaleString('default', { month: 'short' });
    const existingMonth = acc.find((data) => data.month === month);
    
    if (existingMonth) {
      existingMonth.amount += transaction.amount;
    } else {
      acc.push({ month, amount: transaction.amount });
    }
    
    return acc;
  }, []);

  const categoryData = transactions.reduce((acc: any[], transaction) => {
    const existingCategory = acc.find((data) => data.category === transaction.category);
    
    if (existingCategory) {
      existingCategory.amount += transaction.amount;
    } else {
      acc.push({ category: transaction.category, amount: transaction.amount });
    }
    
    return acc;
  }, []);

  const totalExpenses = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);

  return {
    transactions,
    addTransaction,
    deleteTransaction,
    monthlyData,
    categoryData,
    totalExpenses,
  };
}