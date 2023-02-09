import React, { useState, useEffect } from "react";
import { Detail } from "../interface";

import "./pokemon.css";

interface Props {
  id: number;
  name: string;
  image: string;
  gif: string;
  abilities:
    | {
        ability: {
          name: string;
          url: string;
        };
      }[]
    | undefined;
  viewDetail: Detail;
  setViewDetail: React.Dispatch<React.SetStateAction<Detail>>;
}

const PokemonList: React.FC<Props> = (props) => {
  const { id, name, image, gif, abilities, viewDetail, setViewDetail } = props;
  const [isSelected, setSelected] = useState<boolean>(false);
  useEffect(() => {
    setSelected(id === viewDetail.id);
  }, [viewDetail]);

  const closeDetail = () => {
    setViewDetail({
      id: 0,
      isOpened: false,
    });
  };
  return (
    <div>
      {isSelected ? (
        <div className="pokemon__list__detail">
          <div className="ddetail__container">
            <p className="detail__close" onClick={closeDetail}>
              X
            </p>
            <div className="detail__info">
              <img className="detail__img" src={gif} alt="pokemon-gif" />
              <p className="detail__name">{name}</p>
            </div>
            <div className="detail__skill">
              <p className="detail__ability">Abilities:</p>
              {abilities?.map((ab: any) => (
                <div>{ab.ability.name}</div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <section className="pokemon__list__container">
          <p className="pokemon__name">{name}</p>
          <img src={image} alt="pokemon" />
        </section>
      )}
    </div>
  );
};

export default PokemonList;
