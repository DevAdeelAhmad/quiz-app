"use client";
import Sidebar from "@/components/commons/Sidebar";
import QuizzesStats from "@/components/stats/QuizzesStats";
import React from "react";

const StatisticsPage = () => {
  return (
    <main className="flex min-h-screen w-full">
      <Sidebar />
      <div className="flex items-center justify-center w-full">
        <QuizzesStats />
      </div>
    </main>
  );
};

export default StatisticsPage;
