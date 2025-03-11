"use client";

import { useState } from "react";
import { useTransactions } from "@/hooks/useTransactions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatCurrency } from "@/lib/utils";
import { CATEGORIES } from "@/lib/constants";

export default function Transactions() {
  const { transactions, addTransaction, deleteTransaction } = useTransactions();
  const [newTransaction, setNewTransaction] = useState({
    description: "",
    amount: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTransaction.description || !newTransaction.amount || !newTransaction.category) {
      return;
    }
    
    addTransaction({
      ...newTransaction,
      amount: parseFloat(newTransaction.amount),
      id: Date.now().toString(),
    });
    
    setNewTransaction({
      description: "",
      amount: "",
      category: "",
      date: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Add Transaction</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              placeholder="Description"
              value={newTransaction.description}
              onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Amount"
              value={newTransaction.amount}
              onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
            />
            <Select
              value={newTransaction.category}
              onValueChange={(value) => setNewTransaction({ ...newTransaction, category: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="date"
              value={newTransaction.date}
              onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
            />
          </div>
          <Button type="submit" className="w-full">Add Transaction</Button>
        </form>
      </Card>

      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Transaction History</h2>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex justify-between items-center p-4 bg-muted rounded-lg"
            >
              <div>
                <p className="font-medium">{transaction.description}</p>
                <p className="text-sm text-muted-foreground">{transaction.category}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(transaction.date).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <p className="font-medium">{formatCurrency(transaction.amount)}</p>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteTransaction(transaction.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}