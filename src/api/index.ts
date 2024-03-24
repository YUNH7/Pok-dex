import axios from "axios";

const pokeApi = axios.create({
  baseURL: import.meta.env.VITE_POKE_API,
});

export const getPokemonList = (page: number) =>
  pokeApi(`/pokemon?offset=${(page - 1) * 20}`);

export const getPokemon = (id: string) => pokeApi(`/pokemon/${id}`);

export const getSpecies = (id: string) => pokeApi(`/pokemon-species/${id}`);

export const getEvolution = (id: string | number) =>
  pokeApi(`/evolution-chain/${id}`);
