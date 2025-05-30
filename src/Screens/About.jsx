import React from "react";
const About = () => {
  return (
    <>
      <div className=" bg-gradient-to-b from-blue-800 to-blue-900">
        {/* Hero Section */}
        <section className="relative  py-20 px-4 text-center bg-gradient-to-br from-blue-900 to-sky-700 text-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Como o AlertWise funciona
            </h1>
            <p className="text-xl mb-10">
              Tecnologia avançada que transforma dados em proteção real para sua
              comunidade
            </p>
            <button className="bg-white text-blue-800 px-6 py-3 rounded-md font-medium hover:bg-blue-100 transition duration-300">
              Clique aqui para saber mais
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
