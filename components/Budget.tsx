"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useTransactions } from "@/hooks/useTransactions";
import { useBudget } from "@/hooks/useBudget";
import { CATEGORIES } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";

export default function Budget() {
  const { categoryData } = useTransactions();
  const { budgets, setBudget } = useBudget();
  const [newBudget, setNewBudget] = useState<Record<string, string>>(
    CATEGORIES.reduce((acc, category) => ({ ...acc, [category]: "" }), {})
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedBudgets = { ...budgets };
    Object.entries(newBudget).forEach(([category, amount]) => {
      if (amount) {
        updatedBudgets[category] = parseFloat(amount);
      }
    });
    setBudget(updatedBudgets);
    setNewBudget(CATEGORIES.reduce((acc, category) => ({ ...acc, [category]: "" }), {}));
  };

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Set Category Budgets</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {CATEGORIES.map((category) => (
              <div key={category} className="space-y-2">
                <label className="text-sm font-medium">{category}</label>
                <Input
                  type="number"
                  placeholder={`Budget for ${category}`}
                  value={newBudget[category]}
                  onChange={(e) =>
                    setNewBudget({ ...newBudget, [category]: e.target.value })
                  }
                />
              </div>
            ))}
          </div>
          <Button type="submit" className="w-full">Update Budgets</Button>
        </form>
      </Card>

      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Budget vs Actual</h2>
        <div className="space-y-6">
          {CATEGORIES.map((category) => {
            const spent = categoryData.find((data) => data.category === category)?.amount || 0;
            const budget = budgets[category] || 0;
            const progress = budget ? (spent / budget) * 100 : 0;
            
            return (
              <div key={category} className="space-y-2">
                <div className="flex justify-between">
                  <p className="font-medium">{category}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatCurrency(spent)} / {formatCurrency(budget)}
                  </p>
                </div>
                <Progress value={progress} className="h-2" />
                {progress > 100 && (
                  <p className="text-sm text-destructive">
                    Over budget by {formatCurrency(spent - budget)}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}