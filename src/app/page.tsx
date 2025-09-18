"use client";
import React, { useState } from "react";
import ModalCPF from "./popup";

const pessoas = [
  { _id: "123", name: "João Silva", person: "Daniel", cpf: "02863029185" },
  { _id: "124", name: "Maria Oliveira", person: "Pedro", cpf: "02863029181" },
  {
    _id: "125",
    name: "Carlos Souza",
    person: "João Batista",
    cpf: "02863029112",
  },
  { _id: "126", name: "Ana Costa", person: "Jesus", cpf: "02863029123" },
];

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  function handleVote(nome: string) {
    setIsOpen(true);
  }

  return (
    <>
      <div className="max-w-lg mx-auto mt-10 p-4">
        <h1 className="text-2xl font-bold mb-12 text-center">
          Vote na melhor fantasia
        </h1>
        <ul className="space-y-4">
          {pessoas.map((pessoa, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-4 border rounded shadow-sm hover:bg-gray-50 transition"
            >
              <div>
                <h1 className="font-bold">{pessoa.name}</h1>
                <p className="text-gray-500 text-sm">{pessoa.person}</p>
              </div>
              <button
                onClick={() => handleVote(pessoa._id)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Votar
              </button>
            </li>
          ))}
        </ul>
      </div>

      {isOpen && <ModalCPF setIsOpen={setIsOpen} />}
    </>
  );
}
