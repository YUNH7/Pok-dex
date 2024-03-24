export interface PokemonData {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: { ability: { name: string } }[];
  forms: unknown[];
  game_indices: unknown[];
  held_items: unknown[];
  location_area_encounters: string;
  moves: unknown[];
  past_types: unknown[];
  sprites: { front_default: string };
  cries: unknown;
  species: { name: string };
  stats: unknown[];
  types: { type: { name: string } }[];
}
