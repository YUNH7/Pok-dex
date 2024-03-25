import { useParams } from "react-router-dom";
import { EvolutionList, PokemonInfo } from "@components/detail";
import * as S from "@styles/detail/Detail";

const Detail = () => {
  const { pokemonId = "" } = useParams();

  return (
    <S.Layout>
      <S.Main to="/">메인으로</S.Main>
      <PokemonInfo pokemonId={pokemonId} />
      <EvolutionList pokemonId={pokemonId} />
    </S.Layout>
  );
};

export default Detail;
