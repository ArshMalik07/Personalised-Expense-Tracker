"use client";

import { useState, useEffect } from "react";

export function useBudget() {
  const [budgets, setBudgets] = useState<Record<string, number>>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("budgets");
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });

  useEffect(() => {
    localStorage.setItem("budgets", JSON.stringify(budgets));
  }, [budgets]);

  return { budgets, setBudget: setBudgets };
}