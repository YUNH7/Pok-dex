import * as S from "@styles/main/PokemonList";
import { PokemonInfo } from "@/types/PokemonList";

interface PokemonListProps {
  list?: PokemonInfo[];
}

const PokemonList = ({ list = [] }: PokemonListProps) => {
  const findId = (url: string) => parseInt(url.split("ability/")[1]);
  return (
    <div>
      {list?.map((pokemon) => {
        const id = findId(pokemon.url);
        return (
          <S.List key={pokemon.url} to={`/detail/${id}`}>
            {id} {pokemon.name}
          </S.List>
        );
      })}
    </div>
  );
};

export default PokemonList;
