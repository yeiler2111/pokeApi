import axios from "axios";
const baseUrl = "https://pokeapi.co";
export const PokemonServices = {
  async getPokemons(limit) {
    try {
      return await axios({
        method: "get",
        url: `${baseUrl}/api/v2/pokemon`,
        params: {
          limit: limit,
        },
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  async GetIdOfPokemons(pokemons) {
    let InfoPokemonsForId = [];
    pokemons.forEach((element) => {
      const id = element.url.split("/")[6];
      InfoPokemonsForId.push({
        id: id,
        name: element.name,
      });
    });
    return InfoPokemonsForId;
  },
  async getInformationPokemonForId(idPokemons) {
    try {
      let promises = idPokemons.map((element) => {
        return axios({
          method: "get",
          url: `${baseUrl}/api/v2/pokemon/${element.id}`,
        })
          .then((poke) => {
            return {
              urlImg: poke.data.sprites.other.dream_world.front_default,
              name: poke.data.name,
              experiencia: poke.data.base_experience,
              habilidades: poke.data.abilities,
              id: poke.data.id,
            };
          })

          .catch((error) => {
            console.error("Error al obtener información del Pokémon", error);
            return null;
          });
      });
      let arrayCards = await Promise.all(promises);

      arrayCards = arrayCards.filter((card) => card !== null);
      return arrayCards;
    } catch (error) {
      console.error("Error al procesar las tarjetas de Pokémon", error);
      return [];
    }
  },
  deleteRegisterIndb(array, index) {
    array = array.filter((element) => element?.id != index);
    return array;
  },
  getPokemonForID(array, index) {
    const respuesta = array.filter((item) => item?.id == index);
    return respuesta;
  },
  updatePokemonForIdSercive(array, objNew) {
    const index = array.findIndex((element) => element.id === objNew.id);
    if (index !== -1) {
      array[index] = { ...objNew, id: objNew.id }; // Aseguramos que el ID no cambie
    }
    return array;
  },
};
