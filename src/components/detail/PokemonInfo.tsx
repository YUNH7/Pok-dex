import { useParams } from "react-router-dom";
import { useQueries, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useSetAtom } from "jotai";
import { evolutionChainIdAtom } from "@state/evolutionChainId";
import { getPokemon, getSpecies } from "@api";
import { getIdFromUrl } from "@utils";
import * as S from "@styles/detail/PokemonInfo";
import { PokemonData } from "@/types/PokemonData";
import { Language, PokemonSpecies } from "@/types/PokemonSpecies";

const PokemonInfo = () => {
  const { pokemonId = "" } = useParams();
  const setEvolutionChainId = useSetAtom(evolutionChainIdAtom);
  const queryClient = useQueryClient();
  const cacheData = queryClient.getQueryData<AxiosResponse<PokemonData>>([
    "searchPokemon",
    pokemonId,
  ]);
  const cached = cacheData && `${cacheData.data.id}` === pokemonId;

  const [pokemonData, speciesData] = useQueries({
    queries: [
      {
        queryKey: ["pokemon", pokemonId],
        queryFn: () => (cached ? cacheData : getPokemon(pokemonId)),
      },
      {
        queryKey: ["species", pokemonId],
        queryFn: () =>
          getSpecies(pokemonId).then((res) => {
            const evolutionId = getIdFromUrl(res.data.evolution_chain.url);
            setEvolutionChainId(evolutionId);
            return res;
          }),
      },
    ],
    combine: (results) => results.map((result) => result.data?.data),
  });

  if (pokemonData && speciesData) {
    const { sprites, abilities, height, weight, species, types } =
      pokemonData as PokemonData;

    const { name, names, flavor_text_entries } = speciesData as PokemonSpecies;
    const findKo = (element: { language: Language }) =>
      element.language.name === "ko";
    const koName = names.find(findKo)?.name;
    const koDesc = flavor_text_entries.filter(findKo);
    const infoData = [
      { title: "이름", value: `${koName}(${name})` },
      {
        title: "버전 - 설명",
        value: koDesc.map(
          (desc) => `${desc.version.name} - ${desc.flavor_text}`
        ),
      },
      {
        title: "키",
        value: `${height * 10}cm`,
      },
      {
        title: "무게",
        value: `${weight * 0.1}kg`,
      },
      {
        title: "기술",
        value: abilities.map((element) => element.ability.name),
      },
      {
        title: "종",
        value: species.name,
      },
      {
        title: "타입",
        value: types.map((element) => element.type.name),
      },
    ];

    return (
      <>
        <S.Image src={sprites.front_default} alt={`${name} image`} />
        {infoData.map(({ title, value }) => (
          <S.Container key={title}>
            <S.Title>{title}</S.Title>
            {Array.isArray(value) ? (
              value.map((element) => <p key={element}>{element}</p>)
            ) : (
              <p>{value}</p>
            )}
          </S.Container>
        ))}
      </>
    );
  }
};

export default PokemonInfo;
