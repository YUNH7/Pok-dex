import axios from "axios";

const pokeApi = axios.create({
  baseURL: import.meta.env.VITE_POKE_API,
});

export const getPokemonList = (page: number) =>
  pokeApi(`/ability?offset=${(page - 1) * 20}`);
