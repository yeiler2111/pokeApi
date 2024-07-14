<template>
  <div class="container m-3">
    <navVar></navVar>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { usePokemonStore } from "@/pinia/index";
import { onMounted } from "vue";
import navVar from "./components/navVar.vue";
import { PokemonServices } from "./services/PokemonServices";

const store = usePokemonStore();
store.fetchPokemons(40);

onMounted(() => {
  PokemonServices.getInformationPokemonForId();
});
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
