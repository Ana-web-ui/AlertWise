import React from "react";
const About = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
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
            <button className="bg-white text-blue-800 px-6 py-3 rounded-md font-medium hover:bg-blue-100 transition duration-300">
              Clique aqui para saber mais
            </button>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-12">
            Number of Disasters
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              "Winter Storm",
              "Wildfire",
              "Tropical Cyclone",
              "Severe Storm",
              "Freeze",
              "Flooding",
              "Drought",
              "Combined Cost",
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <h4 className="font-bold text-lg mb-2">{item}</h4>
                <p className="text-gray-600">-- stats --</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tracking Section */}
        <section className="bg-gray-100 py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-12">
              Tracking Atlantic Hurricane Season
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h4 className="text-xl font-bold mb-4">Record-Breaking Heat</h4>
                <p className="text-gray-600">
                  Our systems detected unprecedented temperature rises across
                  multiple regions this season.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <h4 className="text-xl font-bold mb-4">
                  Airlines Navigate Surge in Severe Storms
                </h4>
                <p className="text-gray-600">
                  Real-time alerts helped aviation companies reroute flights and
                  avoid dangerous weather systems.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
