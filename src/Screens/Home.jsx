import About from "./About";
import Dashboard from "./Dashboard";

const Home = () => {
  return (
    <>
      {/* Seção Hero com vídeo */}
      <section className="relative h-[calc(100vh-72px)] flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute z-0 w-full h-full object-cover"
        >
          <source
            src="https://www.tomorrow.io/wp-content/uploads/2024/05/hero-spin-globe.mp4"
            type="video/mp4"
          />
        </video>

        {/* Overlay escuro */}
        <div className="absolute inset-0  bg-opacity-40 z-1"></div>

        {/* Conteúdo do Hero */}
        <div className="relative z-10 text-center px-4 text-white max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Proteja sua comunidade das enchentes
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Sistema inteligente que combina IA preditiva, inteligência coletiva
            e gamificação para manter sua família segura.
          </p>
        </div>
      </section>

      <About />
      <Dashboard />
    </>
  );
};

export default Home;
