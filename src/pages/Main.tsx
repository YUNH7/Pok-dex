import { useInfiniteQuery } from "@tanstack/react-query";
import { getPokemonList } from "@api";
import { useIntersectionObserver } from "@hooks";
import { PokemonList } from "@components/main";
import * as S from "@styles/main/Main";
import { PokemonInfo } from "@/types/PokemonList";

const Main = () => {
  const { data: pokemonList, fetchNextPage } = useInfiniteQuery({
    queryKey: ["pokemonList"],
    queryFn: (next) => getPokemonList(next.pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) =>
      lastPage.data.next !== null ? lastPageParam + 1 : null,
    select(res) {
      const { pages } = res;
      return pages.reduce<PokemonInfo[]>(
        (result, cur) => [...result, ...cur.data.results],
        []
      );
    },
  });

  const targetRef = useIntersectionObserver<HTMLDivElement>({
    onIntersect: () => fetchNextPage(),
  });

  return (
    <S.Layout>
      <div>
        <PokemonList list={pokemonList} />
      </div>
      <S.Target ref={targetRef} />
    </S.Layout>
  );
};

export default Main;
