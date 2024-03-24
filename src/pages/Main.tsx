import { useSearchParams } from "react-router-dom";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getPokemon, getPokemonList } from "@api";
import { useIntersectionObserver } from "@hooks";
import { PokemonList, Search } from "@components/main";
import * as S from "@styles/main/Main";
import { PokemonInfo } from "@/types/PokemonList";

const Main = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const { data: pokemonList, fetchNextPage } = useInfiniteQuery({
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

  const { data: pokemonInfo } = useQuery({
    queryKey: ["searchPokemon", search],
    queryFn: () => (search ? getPokemon(search) : null),
    select(res) {
      return res?.data;
    },
  });

  const data = !search
    ? pokemonList
    : pokemonInfo
    ? [{ name: pokemonInfo.name, url: `ability/${pokemonInfo.id}` }]
    : null;

  const targetRef = useIntersectionObserver<HTMLDivElement>({
    onIntersect: () => fetchNextPage(),
  });

  return (
    <S.Layout>
      <div>
        <Search />
        {data ? (
          <PokemonList list={data} />
        ) : (
          <div>{search}와 일치하는 포켓몬을 찾을 수 없습니다</div>
        )}
      </div>
      <S.Target ref={targetRef} />
    </S.Layout>
  );
};

export default Main;
