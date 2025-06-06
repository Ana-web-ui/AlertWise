const Precipitacao = ({ dadosClima }) => {
  const chuva1h = dadosClima?.rain?.["1h"];
  const chuva3h = dadosClima?.rain?.["3h"];

  return (
    <div className="bg-white rounded-xl p-4 shadow text-center">
      <h3 className="font-semibold text-gray-700">Precipitação</h3>
      {chuva1h || chuva3h ? (
        <>
          {chuva1h && (
            <p className="text-lg font-bold text-blue-500">
              {chuva1h} mm (última 1h)
            </p>
          )}
          {chuva3h && (
            <p className="text-sm text-gray-500 mt-1">
              {chuva3h} mm acumulados em 3h
            </p>
          )}
        </>
      ) : (
        <p className="text-sm text-gray-500">Sem registro de chuva recente</p>
      )}
    </div>
  );
};

export default Precipitacao;
