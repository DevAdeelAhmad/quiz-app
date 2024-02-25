import Sidebar from "@/components/commons/Sidebar";
import ResultCards from "@/components/results/ResultCards";
import React from "react";

const ResultsPage = () => {
  return (
    <main className="flex min-h-screen w-full">
      <Sidebar />
      <div className="flex justify-center w-full">
        <ResultCards />
      </div>
    </main>
  );
};

export default ResultsPage;
