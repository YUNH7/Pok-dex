import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQueries, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useSetAtom } from "jotai";
import { evolutionChainIdAtom } from "@state/evolutionChainId";
import { getPokemon, getSpecies } from "@api";
import { useSetMeta } from "@hooks";
import { getIdFromUrl } from "@utils";
import * as S from "@styles/detail/PokemonInfo";
import { PokemonData } from "@/types/PokemonData";
import { Language, PokemonSpecies } from "@/types/PokemonSpecies";

const PokemonInfo = () => {
  const setMeta = useSetMeta();
  const { pokemonId = "" } = useParams();
  const setEvolutionChainId = useSetAtom(evolutionChainIdAtom);
  const queryClient = useQueryClient();
  const cacheData = queryClient.getQueryData<AxiosResponse<PokemonData>>([
    "searchPokemon",
    pokemonId,
  ]);
  const cached = cacheData && `${cacheData.data.id}` === pokemonId;

  const findKo = (element: { language: Language }) =>
    element.language.name === "ko";

  const data = useQueries({
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
    combine: (results) => {
      const [{ data: pokemonData }, { data: speciesData }] = results;
      if (pokemonData && speciesData) {
        const { sprites, abilities, height, weight, species, types } =
          pokemonData.data as PokemonData;
        const { name, names, flavor_text_entries } =
          speciesData.data as PokemonSpecies;
        const koName = names.find(findKo)?.name || "";
        const koDesc = flavor_text_entries.filter(findKo);
        const imageSrc = sprites.front_default || "";

        return {
          abilities,
          height,
          weight,
          species,
          types,
          name,
          koName,
          koDesc,
          imageSrc,
        };
      }
    },
  });

  useEffect(() => {
    if (data) setMeta({ title: data.koName, image: data.imageSrc });
  }, [data, setMeta]);

  if (data) {
    const {
      abilities,
      height,
      weight,
      species,
      types,
      name,
      koName,
      koDesc,
      imageSrc,
    } = data;
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
        <S.Image src={imageSrc} alt={`${name} image`} />
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
  } else
    return (
      <S.SpinnerWrapper>
        <S.Spinner />
      </S.SpinnerWrapper>
    );
};

export default PokemonInfo;
