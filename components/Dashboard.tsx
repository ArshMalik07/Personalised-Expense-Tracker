"use client";

import { Card } from "@/components/ui/card";
import { useTransactions } from "@/hooks/useTransactions";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { formatCurrency } from "@/lib/utils";

export default function Dashboard() {
  const { transactions, monthlyData, categoryData, totalExpenses } = useTransactions();
  const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <h3 className="text-lg font-medium">Total Expenses</h3>
          <p className="text-2xl font-bold">{formatCurrency(totalExpenses)}</p>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-medium">Total Transactions</h3>
          <p className="text-2xl font-bold">{transactions.length}</p>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-medium">Average Transaction</h3>
          <p className="text-2xl font-bold">
            {formatCurrency(totalExpenses / (transactions.length || 1))}
          </p>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Monthly Expenses</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value as number)} />
                <Bar dataKey="amount" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Expenses by Category</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="amount"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={(entry) => `${entry.category} (${formatCurrency(entry.amount)})`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={entry.category} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value as number)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Recent Transactions</h3>
        <div className="space-y-4">
          {transactions.slice(0, 5).map((transaction) => (
            <div key={transaction.id} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{transaction.description}</p>
                <p className="text-sm text-muted-foreground">{transaction.category}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{formatCurrency(transaction.amount)}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(transaction.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}