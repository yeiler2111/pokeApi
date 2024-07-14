<template>
  <div class="container m-3">
    <navVar></navVar>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import navVar from "./components/navVar.vue";
import { usePokemonStore } from "./pinia/index";

const store = usePokemonStore();
onMounted(() => {
  if (localStorage.getItem("arrayCard")) {
    store.fetchPokemons(100)
  }
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
