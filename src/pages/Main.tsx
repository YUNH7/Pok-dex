import { useSearchParams } from "react-router-dom";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getPokemon, getPokemonList } from "@api";
import { useIntersectionObserver, useSetMeta } from "@hooks";
import { initMeta } from "@state/meta";
import { PokemonList, Search } from "@components/main";
import * as S from "@styles/main/Main";
import { Spinner } from "@styles/detail/PokemonInfo";
import { PokemonInfo } from "@/types/PokemonList";

const Main = () => {
  useSetMeta(initMeta);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const {
    data: pokemonList,
    fetchNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["pokemonList", search],
    queryFn: (next) => (!search ? getPokemonList(next.pageParam) : null),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) =>
      lastPage?.data.next !== null ? lastPageParam + 1 : null,
    select(res) {
      const { pages } = res;
      return pages.reduce<PokemonInfo[]>(
        (result, cur) => [...result, ...(cur?.data.results || [])],
        []
      );
    },
  });

  const { data: pokemonInfo, isLoading: isSearchLoading } = useQuery({
    queryKey: ["searchPokemon", search],
    queryFn: () => (search ? getPokemon(search) : null),
    select(res) {
      return res?.data;
    },
  });

  const data = !search ? pokemonList : pokemonInfo ? pokemonInfo.forms : null;

  const targetRef = useIntersectionObserver<HTMLDivElement>({
    onIntersect: () => fetchNextPage(),
  });

  const loading = isLoading || isFetchingNextPage || isSearchLoading;

  return (
    <div>
      <S.Layout>
        <Search />
        {data ? (
          <PokemonList list={data} />
        ) : (
          search &&
          !isSearchLoading && (
            <S.NoResult>
              {search}와 일치하는 포켓몬을 찾을 수 없습니다
            </S.NoResult>
          )
        )}
        {loading && <Spinner />}
      </S.Layout>
      <S.Target ref={targetRef} />
    </div>
  );
};

export default Main;
