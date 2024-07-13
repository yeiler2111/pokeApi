// store.js
import { defineStore } from "pinia";
import { reactive } from "vue";
import { PokemonServices } from "../services/PokemonServices";

export const usePokemonStore = defineStore("pokemon", {
  state: () => ({
    pokemons: [],
    arrayCards: reactive([]),
  }),
  actions: {
    async fetchPokemons(limit) {
      const res = await PokemonServices.getPokemons(limit);
      this.pokemons = res.data.results;

      const response = await PokemonServices.GetIdOfPokemons(this.pokemons);
      this.pokemons = response;

      const respuesta = await PokemonServices.getInformationPokemonForId(this.pokemons);
      this.arrayCards.values = respuesta
    },
  },
  getters:{

  }
});
