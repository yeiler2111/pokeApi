<template>
  <div class="container">
    <img class="logo-img" src="../assets/logo.png" alt="Logo de Pokemon" />
    <nav class="navbar navbar-expand-lg bg-body-tertiary mx-3">
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <router-link class="btn btn-primary" to="/dashboard"
              >Home</router-link
            >
          </ul>
          <form class="d-flex" role="search">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Buscar por nombre"
            />
            <button class="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup></script>
