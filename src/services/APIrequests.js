const planetsFetch = async () => {
  try {
    const response = await fetch('https://swapi.dev/api/planets');
    const { results } = await response.json();
    results.forEach((element) => {
      delete element.residents;
    });
    console.log(results);
    return results;
  } catch (e) {
    throw new Error(e.message);
  }
};

export default planetsFetch;
