import DashboardPokemon from "@/components/dashboardPokemon.vue";
import EditComponent from "@/components/EditComponent.vue";
import { usePokemonStore } from "@/pinia/index";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect:"dashboard",
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardPokemon,
  },
  {
    path: "/editar/:id",
    name: "editar",
    component: EditComponent,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const store = usePokemonStore();
  const { id } = to.params;

  if (id) {
    store.setPokemonId(id);
  } else {
    store.clearPokemonId();
  }

  next();
});

export default router;
