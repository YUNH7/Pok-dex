export interface Language {
  name: string;
  url: string;
}

export interface PokemonSpecies {
  name: string;
  names: { language: Language; name: string }[];
  evolution_chain: { url: string };
  flavor_text_entries: {
    flavor_text: string;
    language: Language;
    version: { name: string; url: string };
  }[];
}
