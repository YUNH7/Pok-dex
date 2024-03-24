import { EvolutionList, PokemonInfo } from "@components/detail";
import * as S from "@styles/detail/Detail";

const Detail = () => {
  return (
    <S.Layout>
      <S.Main to="/">메인으로</S.Main>
      <PokemonInfo />
      <EvolutionList />
    </S.Layout>
  );
};

export default Detail;
