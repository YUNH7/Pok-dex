import { useAtomValue } from "jotai";
import { Helmet as HelmetWrapper } from "react-helmet-async";
import { metaAtom } from "@state/meta";

const Helmet = () => {
  const { title, image } = useAtomValue(metaAtom);

  return (
    <HelmetWrapper>
      <title>{title}</title>
      <meta property="og:image" content={image} />
    </HelmetWrapper>
  );
};

export default Helmet;
