// pages/vlibras-test.tsx
"use client";
import VLibras from "vlibras-nextjs";
export default function TesteVLibras() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1>Testando VLibras</h1>
      <div className="fixed z-50 right-0">
        <VLibras/>
        </div>
    </div>
  );
}