import { useParams } from "react-router-dom";
import { useQueries, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useSetAtom } from "jotai";
import { evolutionChainIdAtom } from "@state/evolutionChainId";
import { getPokemon, getSpecies } from "@api";
import { getIdFromUrl } from "@utils";
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

    return (
      <>
        <img src={sprites.front_default} alt={`${name} image`} />
        <div>
          <h3>정보</h3>
          <p>
            이름: {name}({koName})
          </p>
          <div>
            버전 - 설명:{" "}
            {koDesc.map((desc) => (
              <p key={desc.version.url}>
                {desc.version.name} - {desc.flavor_text}
              </p>
            ))}
          </div>
          <p>키: {height * 10}cm</p>
          <p>무게: {weight * 0.1}kg</p>
          <p>기술: {abilities.map((element) => element.ability.name)}</p>
          <p>종: {species.name}</p>
          <p>타입: {types.map((element) => element.type.name)}</p>
        </div>
      </>
    );
  }
};

export default PokemonInfo;
