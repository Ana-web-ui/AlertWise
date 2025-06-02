import React, { useState, useRef, useEffect } from "react";

const About = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  // Fechar o modal ao clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <div className="bg-gradient-to-b from-blue-800 to-blue-900">
        {/* Hero Section */}
        <section className="relative py-20 px-4 text-center bg-gradient-to-br from-blue-900 to-sky-700 text-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Como o AlertWise funciona
            </h1>
            <p className="text-xl mb-10">
              Tecnologia avançada que transforma dados em proteção real para sua
              comunidade
            </p>
            <button
              onClick={() => setIsOpen(true)}
              className="bg-white cursor-pointer text-blue-800 px-6 py-3 rounded-md font-medium hover:bg-blue-100 transition duration-300"
            >
              Clique aqui para saber mais
            </button>
          </div>
        </section>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="bg-white text-blue-900 rounded-lg p-6 max-w-md w-full shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-4">Sobre o AlertWise</h2>
            <p className="text-lg">
              O AlertWise utiliza inteligência de dados e tecnologia de ponta
              para identificar riscos e gerar alertas em tempo real. Seu
              objetivo é proteger comunidades por meio de informação precisa e
              acessível.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default About;
