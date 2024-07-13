<template>
  <div v-if="loading">Cargando...</div>
  <div
    v-else-if="
      store.pokemonEditTemp && Object.keys(store.pokemonEditTemp).length > 0
    "
  >
    <!-- ID -->
    <div class="mb-3 row">
      <label for="staticEmail" class="col-sm-2 col-form-label">ID</label>
      <div class="col-sm-10">
        <input
          type="text"
          class="form-control-plaintext text-black"
          id="staticEmail"
          :value="store.pokemonEditTemp[0].id"
          disabled
        />
      </div>
    </div>

    <!-- Nombre -->
    <div class="mb-3 row">
      <label for="name" class="col-sm-2 col-form-label">Nombre</label>
      <div class="col-sm-10">
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="store.pokemonEditTemp[0].name"
        />
      </div>
    </div>

    <!-- Experiencia -->
    <div class="mb-3 row">
      <label for="experiencia" class="col-sm-2 col-form-label"
        >Experiencia</label
      >
      <div class="col-sm-10">
        <input
          type="text"
          class="form-control"
          id="experiencia"
          v-model="store.pokemonEditTemp[0].experiencia"
        />
      </div>
    </div>

    <!-- Habilidades -->
    <div class="mb-3 row">
      <label class="col-sm-2 col-form-label"><h3>Habilidades</h3></label>
      <div class="col-sm-10">
        <div
          v-for="(habilidad, index) in store.pokemonEditTemp[0].habilidades"
          :key="index"
        >
          <input
            type="text"
            class="form-control"
            :value="habilidad.ability.name"
            disabled
            readonly
          />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-6">
        <button @click="handleModificarClick" class="btn btn-primary btn-block">
          Modificar
        </button>
      </div>
      <div class="col-6">
        <a class="btn btn-danger btn-block" @click="handleVolverClick"
          >Volver</a
        >
      </div>
    </div>
  </div>
  <div v-else>
    <p>No se encontraron datos del Pokémon.</p>
  </div>
</template>
<script setup>
import { ref, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usePokemonStore } from "@/pinia/index";
const store = usePokemonStore();
const route = useRoute();
const router = useRouter();
const loading = ref(true);

onBeforeMount(async () => {
  try {
    const pokemonId = route.params.id;
    await store.getPokemonForID(pokemonId);
    loading.value = false;
  } catch (error) {
    console.error("Error al obtener los datos del Pokémon:", error);
    loading.value = false;
  }
});

const handleModificarClick = () => {
  store.updatePokemonForId();
  router.push({ name: "dashboard" });
};

const handleVolverClick = () => {
  // Redirigir a la ruta 'dashboard'
  router.push({ name: "dashboard" });
};
</script>
