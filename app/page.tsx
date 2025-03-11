"use client";

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Dashboard from "@/components/Dashboard";
import Transactions from "@/components/Transactions";
import Budget from "@/components/Budget";

export default function Home() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Personal Finance Tracker</h1>
      
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard">
          <Dashboard />
        </TabsContent>
        
        <TabsContent value="transactions">
          <Transactions />
        </TabsContent>
        
        <TabsContent value="budget">
          <Budget />
        </TabsContent>
      </Tabs>
    </div>
  );
}