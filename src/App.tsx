import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { Detail, Pokemon } from "./interface";
import PokemonColection from "./components/PokemonColection";

interface Pokemons {
  name: string;
  url: string;
}

const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [viewDetail, setViewDetail] = useState<Detail>({
    id: 0,
    isOpened: false,
  });
  useEffect(() => {
    const getPokemon = async () => {
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=24&offset=0"
      );
      setNextUrl(res.data.next);
      res.data.results.map(async (pokemon: Pokemons) => {
        const poke = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        setPokemons((p) => [...p, poke.data]);
        setLoading(false);
        console.log(poke.data);
      });
    };
    getPokemon();
  }, []);

  const nextPage = async () => {
    let res = await axios.get(nextUrl);
    setNextUrl(res.data.next);
    setLoading(true);
    res.data.results.map(async (pokemon: Pokemons) => {
      const poke = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
      );
      setPokemons((p) => [...p, poke.data]);
      setLoading(false);
    });
  };

  return (
    <div className="App">
      <div className="container">
        <header className="pokemon__header">
          <div className="pokemon__logo">
            <img
              src="https://external-preview.redd.it/tQged7mKJ3cUpNMq5IMeceZvyKP3cTyHqhNmKEQ0Vv8.png?width=640&crop=smart&auto=webp&s=5fc89334e792e2c9b294d1d328bf522cdede4cdf"
              alt=""
            />
          </div>
        </header>
        <PokemonColection
          pokemons={pokemons}
          viewDetail={viewDetail}
          setViewDetail={setViewDetail}
        />

        {!viewDetail.isOpened && (
          <div className="btn">
            <button onClick={nextPage}>
              {loading ? "Loading..." : "Load more"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
