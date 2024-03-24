import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";
import * as S from "@styles/main/Search";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  const searchFn = (
    e: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setSearchParams({ search });
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  return (
    <form onSubmit={searchFn}>
      <S.Label htmlFor="search">
        <S.Input
          id="search"
          placeholder="포켓몬 번호를 입력하세요"
          onChange={handleInput}
          value={search}
        />
        <S.Button type="submit" onClick={searchFn}>
          검색
        </S.Button>
      </S.Label>
    </form>
  );
};

export default Search;
