"use client";
// pages/ModalCPF.tsx
import React, { useState } from "react";

const ModalCPF = ({ setIsOpen }: { setIsOpen: (value: boolean) => void }) => {
  const [cpf, setCpf] = useState("");
  const [error, setError] = useState("");

  // Função para aplicar máscara no CPF
  const maskCPF = (value: string) => {
    value = value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    return value;
  };

  // Validação de CPF
  const validarCPF = (cpf: string) => {
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0,
      resto;
    for (let i = 1; i <= 9; i++)
      soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++)
      soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;

    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCpf(maskCPF(e.target.value));
    setError("");
  };

  const handleConfirm = () => {
    if (validarCPF(cpf)) {
      alert(`CPF ${cpf} confirmado!`);
      setIsOpen(false);
      setCpf("");
    } else {
      setError("CPF inválido");
    }
  };

  return (
    <div className="p-8">
      <div className="fixed inset-0 flex items-center justify-center bg-[#00000094] bg-opacity-50 z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg">
          <h2 className="text-xl font-bold mb-4">Digite seu CPF</h2>
          <input
            type="text"
            value={cpf}
            onChange={handleChange}
            placeholder="000.000.000-00"
            className={`w-full border rounded px-3 py-2 ${
              error ? "border-red-500" : "border-gray-300"
            }`}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 transition"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirm}
              className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCPF;
