export interface Pokemon {
  id: number;
  name: string;
  abilities: {
    ability: {
      name: string;
      url: string;
    };
  }[];
  sprites: {
    versions: {
      "generation-v": {
        "black-white": {
          front_default: string;
          animated: {
            front_default: string;
            back_default: string;
          };
        };
      };
    };
  };
}

export interface Detail {
  id: number;
  isOpened: boolean;
}
