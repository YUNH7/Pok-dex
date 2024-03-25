import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { evolutionChainIdAtom } from "@state/evolutionChainId";
import { getEvolution } from "@api";
import { getIdFromUrl } from "@utils";
import { Title, Container } from "@styles/detail/PokemonInfo";
import * as S from "@styles/detail/EvolutionList";
import { Chain } from "@/types/PokemonEvolutionChain";

interface Evolution {
  name: string;
  id: string;
}

interface EvolutionListProps {
  pokemonId: string;
}

const EvolutionList = ({ pokemonId }: EvolutionListProps) => {
  const evolutionChainId = useAtomValue(evolutionChainIdAtom);
  const { data: evolutionData } = useQuery({
    queryKey: ["evolution", evolutionChainId],
    queryFn: () => (evolutionChainId ? getEvolution(evolutionChainId) : null),
    select(res) {
      return res?.data;
    },
  });

  const flatChain = (
    data: Chain[],
    bucket: Evolution[][] = []
  ): Evolution[][] => {
    const evolve: Chain[] = [];
    const stages = data.map((stage) => {
      const {
        evolves_to,
        species: { name, url },
      } = stage;
      if (evolves_to.length !== 0) evolve.push(...evolves_to);
      return {
        name,
        id: getIdFromUrl(url),
      };
    });
    bucket.push(stages);
    if (evolve.length === 0) return bucket;
    return flatChain(evolve, bucket);
  };

  return (
    evolutionData && (
      <Container>
        <Title>진화 단계</Title>
        {flatChain([evolutionData.chain]).map((stages) => (
          <S.Stages key={stages[0].id}>
            {stages.map(({ id, name }) => (
              <S.Stage
                key={id}
                to={pokemonId === id ? "#" : `/detail/${id}`}
                emphasis={pokemonId === id ? "true" : undefined}
              >
                {name}↗
              </S.Stage>
            ))}
          </S.Stages>
        ))}
      </Container>
    )
  );
};

export default EvolutionList;
