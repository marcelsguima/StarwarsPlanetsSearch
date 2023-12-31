const planetsFetch = async () => {
  try {
    // const response = await fetch('https://swapi.dev/api/planets'); api fora do ar
    const response = await fetch('https://swapi.py4e.com/api/planets/');
    const { results } = await response.json();
    results.forEach((element) => {
      delete element.residents;
    });
    return results;
  } catch (e) {
    throw new Error(e.message);
  }
};

export default planetsFetch;
