"use client";
import Sidebar from "@/components/commons/Sidebar";
import React, { useState } from "react";

const PdfPage = () => {
  const [selectedPdf, setSelectedPdf] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedPdf(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files && event.dataTransfer.files[0];
    if (file) {
      setSelectedPdf(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <main className="flex min-h-screen w-full">
      <Sidebar />
      <div
        className="flex flex-col items-center w-full py-10 gap-5"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="border border-dashed p-5 rounded-lg text-center">
          <label htmlFor="pdfInput" className="cursor-pointer">
            {selectedPdf ? (
              <div>
                <p>Selected PDF: {selectedPdf.name}</p>
                <p>Size: {selectedPdf.size} bytes</p>
              </div>
            ) : (
              <p>Drop PDF here or click to select</p>
            )}
          </label>
          <input
            type="file"
            id="pdfInput"
            className="hidden"
            accept=".pdf"
            onChange={handleFileChange}
          />
        </div>
      </div>
    </main>
  );
};

export default PdfPage;
