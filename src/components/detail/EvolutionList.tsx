import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { evolutionChainIdAtom } from "@state/evolutionChainId";
import { getEvolution } from "@api";
import { getIdFromUrl } from "@utils";
import { Chain } from "@/types/PokemonEvolutionChain";

const EvolutionList = () => {
  const evolutionChainId = useAtomValue(evolutionChainIdAtom);
  const { data: evolutionData } = useQuery({
    queryKey: ["evolution", evolutionChainId],
    queryFn: () => (evolutionChainId ? getEvolution(evolutionChainId) : null),
    select(res) {
      return res?.data;
    },
  });

  const flatChain = (
    data: Chain,
    bucket: { name: string; id: string }[] = []
  ): { name: string; id: string }[] => {
    const { name, url } = data.species;
    bucket.push({ name, id: getIdFromUrl(url) });
    if (data.evolves_to.length === 0) return bucket;
    return flatChain(data.evolves_to[0], bucket);
  };

  return (
    evolutionData && (
      <div>
        <h3>진화 단계</h3>
        {flatChain(evolutionData.chain).map(({ id, name }) => (
          <Link key={id} to={`/detail/${id}`}>
            {name}
          </Link>
        ))}
      </div>
    )
  );
};

export default EvolutionList;
