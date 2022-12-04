<script setup>
defineProps({
  product: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <div class="card">
    <img :src="product.thumbnail" class="card-img-top" />
    <div class="card-body">
      <h5 class="card-title">{{ product.price }}</h5>
      <s class="card-title">{{ product.discountPercentage }}</s>
      <p class="card-text">{{ product.title }} ({{ product.brand }})</p>
      <div class="d-flex justify-content-between align-items-center">
        <h5 class="m-0">
          <span class="badge bg-warning rounded-pill">
            <i class="bi bi-star"></i>
            4.8
          </span>
        </h5>
        <a href="#" class="btn btn-primary">
          <i class="bi bi-cart-plus"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-img-top {
  height: 200px;
  object-fit: cover;
}
.card {
  overflow: hidden;
}
</style>
