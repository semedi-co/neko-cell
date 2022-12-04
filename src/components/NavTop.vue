<script setup>
import { RouterLink } from "vue-router";
</script>
<template>
  <nav class="navbar sticky-top navbar-expand-lg bg-danger navbar-dark py-4">
    <div class="container">
      <RouterLink class="navbar-brand h5 py-3 bg-warning text-dark px-4" to="/"
        >Neko Cell</RouterLink
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarTogglerDemo01"
        aria-controls="navbarTogglerDemo01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/product" class="nav-link">Product</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/about" class="nav-link">About</RouterLink>
          </li>
        </ul>
        <form class="d-flex" role="search">
          <button class="btn btn-warning" type="submit">Login</button>
        </form>
      </div>
    </div>
  </nav>
</template>
