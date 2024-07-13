<template>
  <div class="container mx-3">
    <div v-if="store.arrayCards.values.length > 0" class="row">
      <div
        v-for="(pokemon, index) in store.arrayCards.values"
        :key="index"
        class="col-md-4 mb-4"
      >
        <div class="card h-100">
          <img
            class="card-img-top img-thumbnail"
            :src="pokemon.urlImg"
            alt="Imagen del Pokémon"
          />
          <div class="card-body">
            <h5 class="card-title">{{ pokemon.name }}</h5>
            <p class="card-text">
              <strong>Experiencia:</strong> {{ pokemon.experiencia }}<br />
              <strong>Habilidades:</strong> {{ pokemon.habilidades.join(", ") }}
            </p>
            <a @click="redirectToEdit(pokemon.id)" class="btn btn-primary"
              >Ver más</a
            >
            <a
              @click="store.deleteRegisterIndb(pokemon.id)"
              class="btn btn-danger"
              >Eliminar</a
            >
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Cargando Pokémon...</p>
    </div>
  </div>
</template>

<script setup>
import { usePokemonStore } from "@/pinia/index";
import { onMounted } from "vue";
import router from "@/router";

const store = usePokemonStore();
onMounted(() => {
  if (localStorage.getItem("arrayCards")) {
    store.arrayCards.values = JSON.parse(localStorage.getItem("arrayCards"));
  } else {
    store.fetchPokemons();
  }
});
const redirectToEdit = (id) => {
  router.push({ name: "editar", params: { id } });
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #030406;
  margin-top: 60px;
}
</style>
