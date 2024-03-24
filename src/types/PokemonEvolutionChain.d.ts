export interface Chain {
  evolves_to: Chain[];
  species: {
    name: string;
    url: string;
  };
}

export interface PokemonEvolutionChain {
  id: number;
  chain: Chain;
}
