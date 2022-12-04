<script setup>
import { onMounted, reactive, watchEffect } from "vue";
import { http } from "../plugins/axios-vue";
import debounce from "../utils/debounce";

import { useRouter } from "vue-router";
import ProductCard from "../components/ProductCard.vue";

const product = reactive({
  data: [],
  filter: [],
  totalData: "-",
  limitData: [5, 10, 25, 50, 100],
  formLimit: 5,
  formCari: "",
  loading: false,

  skip: 0,
  totalPage: 0,
  page: 1,
});

const route = useRouter();

const getKategori = async () => {
  await http
    .get("/products/categories")
    .then(({ data }) => {
      product.filter = data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const getProduct = async () => {
  // set Loading true

  product.loading = true;
  await http
    .get(`/products/search`, {
      params: {
        q: product.formCari,
        limit: product.formLimit,
        skip: product.skip,
      },
    })
    .then(({ data }) => {
      // set Loading false after get data
      product.loading = false;
      product.data = data.products;
      product.totalData = data.total;
      product.skip = data.skip;
      product.totalPage = Math.ceil(data.total / product.formLimit);
    })
    .catch((err) => {
      // set Loading false if error
      product.loading = false;
      console.log(err);
    });
};

// function untuk pagination
const paginate = (page) => {
  product.page = page;
  product.skip = (product.page - 1) * product.formLimit;
};

// function untuk next page
const nextPage = () => {
  if (product.page < product.totalPage) {
    product.page++;
    product.skip = (product.page - 1) * product.formLimit;
  }
};

// function untuk prev page
const prevPage = () => {
  if (product.page > 1) {
    product.page--;
    product.skip = (product.page - 1) * product.formLimit;
  }
};

const delaySearch = debounce((e) => {
  product.formCari = e.target.value;
}, 500);

watchEffect(() => {
  getProduct();
});

onMounted(() => {
  getKategori();
});
</script>

<template>
  <div>
    <div class="bg-loading" v-if="product.loading">
      <div
        class="spinner-border text-light"
        role="status"
        style="width: 5rem; height: 5rem"
      >
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div class="row">
      <div class="d-flex mb-3 gap-4">
        <div>
          <select
            class="form-select"
            aria-label="Default select example"
            v-model="product.formLimit"
          >
            <option
              v-for="(item, index) in product.limitData"
              :key="index"
              :value="item"
            >
              {{ item }}
            </option>
          </select>
        </div>
        <div>
          <input
            @input="delaySearch"
            class="form-control"
            placeholder="Cari..."
            type="search"
          />
        </div>
        <div>
          <select class="form-select" aria-label="Default select example">
            <option selected>--- Filter Kategori ---</option>
            <option
              v-for="(item, index) in product.filter"
              :key="index"
              :value="item"
            >
              {{ item }}
            </option>
          </select>
        </div>
      </div>
      <!-- Loading -->
      <h5 class="mb-3">Total Product : {{ product.totalData }}</h5>

      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li
            class="page-item"
            :class="product.page === 1 ? 'disabled' : 'cp'"
            @click="prevPage"
          >
            <a class="page-link" aria-label="Previous">
              <span aria-hidden="true">Prev</span>
            </a>
          </li>
          <li
            class="page-item cp"
            v-for="(item, index) in product.totalPage"
            :class="product.page === item ? 'active' : ''"
            :key="index"
          >
            <a class="page-link" @click="paginate(item)">{{ item }}</a>
          </li>
          <li
            class="page-item"
            :class="product.page === product.totalPage ? 'disabled' : 'cp'"
            @click="nextPage"
          >
            <a class="page-link" aria-label="Next">
              <span aria-hidden="true">Next</span>
            </a>
          </li>
        </ul>
      </nav>
      <div
        @click="route.push('/product/' + item.id)"
        class="col-md-4 col-xl-3 mb-3 cp"
        v-for="item in product.data"
        :key="item.id"
      >
        <ProductCard :product="item" />
      </div>
    </div>
  </div>
</template>
