// store.js
import { defineStore } from "pinia";
import { reactive } from "vue";
import { PokemonServices } from "../services/PokemonServices";

export const usePokemonStore = defineStore("pokemon", {
  state: () => ({
    pokemons: [],
    arrayCards: reactive([]),
    filterByName: reactive[""],
    currentPokemonId: "",
    pokemonEditTemp: reactive({
      id: "",
      name: "",
      experiencia: "",
      habilidades: [
        {
          ability: {
            name: "",
          },
        },
        {
          ability: {
            name: "",
          },
        },
      ],
    }),
  }),
  actions: {
    async fetchPokemons(limit) {
      const res = await PokemonServices.getPokemons(limit);
      this.pokemons = res.data.results;

      const response = await PokemonServices.GetIdOfPokemons(this.pokemons);
      this.pokemons = response;

      const respuesta = await PokemonServices.getInformationPokemonForId(
        this.pokemons
      );
      this.arrayCards.values = respuesta;

      localStorage.setItem("arrayCards", JSON.stringify(this.arrayCards.values));
    },
    async deleteRegisterIndb(id) {
      const response = PokemonServices.deleteRegisterIndb(
        this.arrayCards.values,
        id
      );
      this.arrayCards.values = response;
      localStorage.setItem('arrayCards',this.arrayCards.values)
    },
    async reiniciar() {
      this.pokemonEditTemp.values = {
        id: "",
        name: "",
        experiencia: "",
        habilidades: [
          {
            ability: {
              name: "",
            },
          },
          {
            ability: {
              name: "",
            },
          },
        ],
      };
    },
    setPokemonId(id) {
      this.currentPokemonId = id;
    },
    clearPokemonId() {
      this.currentPokemonId = null;
    },
    async getPokemonForID(id) {
      this.pokemonEditTemp = await PokemonServices.getPokemonForID(
        this.arrayCards.values,
        id
      );
    },
    updatePokemonForId() {
      const respuesta = PokemonServices.updatePokemonForIdSercive(
        this.arrayCards.values,
        this.pokemonEditTemp
      );
      this.arrayCards.values = respuesta;
      console.log(this.arrayCards);
      localStorage.setItem("arrayCards", JSON.stringify(this.arrayCards.values));
      this.reiniciar();
    },
  },
  getters: {},
});
