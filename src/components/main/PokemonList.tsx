import { getIdFromUrl } from "@utils";
import * as S from "@styles/main/PokemonList";
import { PokemonInfo } from "@/types/PokemonList";

interface PokemonListProps {
  list?: PokemonInfo[];
}

const PokemonList = ({ list = [] }: PokemonListProps) => {
  return (
    <div>
      {list?.map((pokemon) => {
        const id = getIdFromUrl(pokemon.url);
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
