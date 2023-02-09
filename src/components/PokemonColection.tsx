import React from "react";
import { Detail, Pokemon } from "../interface";

import "./pokemon.css";
import PokemonList from "./PokemonList";

interface Props {
  pokemons: Pokemon[];
  viewDetail: Detail;
  setViewDetail: React.Dispatch<React.SetStateAction<Detail>>;
}

const PokemonColection: React.FC<Props> = (props) => {
  const { pokemons, viewDetail, setViewDetail } = props;
  const selectPokemon = (id: number) => {
    if (!viewDetail.isOpened) {
      setViewDetail({
        id: id,
        isOpened: true,
      });
    }
  };

  return (
    <>
      <section
        className={
          viewDetail.isOpened
            ? "colection__container__active"
            : "colection__container"
        }
      >
        {viewDetail.isOpened ? <div className="overlay"></div> : <div></div>}
        {pokemons.map((pokemon) => (
          <div onClick={() => selectPokemon(pokemon.id)}>
            <PokemonList
              key={pokemon.id}
              id={pokemon.id}
              name={pokemon.name}
              image={
                pokemon.sprites.versions["generation-v"]["black-white"]
                  .front_default
              }
              gif={
                pokemon.sprites.versions["generation-v"]["black-white"].animated
                  .front_default
              }
              abilities={pokemon.abilities}
              viewDetail={viewDetail}
              setViewDetail={setViewDetail}
            />
          </div>
        ))}
      </section>
    </>
  );
};

export default PokemonColection;
