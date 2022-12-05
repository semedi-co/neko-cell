<script setup>
import { reactive } from "vue";
import { http } from "../plugins/axios-vue";
import Swall from "sweetalert2";
import { useRouter } from "vue-router";
import { dataLogin } from "../store";

const router = useRouter();
const login = reactive({
  form: {
    username: "",
    password: "",
  },
  loading: false,
});

const onLogin = () => {
  login.loading = true;
  const loginData = {
    username: login.form.username,
    password: login.form.password,
  };
  http
    .post("/auth/login", loginData)
    .then(({ data }) => {
      login.loading = false;
      // Response api kita simpan di localStorage
      dataLogin.user = data;
      localStorage.setItem("user", JSON.stringify(data));
      router.replace("/");
    })
    .catch((err) => {
      login.loading = false;
      console.log(err);
    });
};
</script>
<template>
  <div>
    {{ login.data }}
    <div class="card" style="width: 30rem">
      <div class="card-body">
        <form @submit.prevent="onLogin">
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input
              type="text"
              class="form-control"
              id="username"
              placeholder="username"
              v-model="login.form.username"
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="password"
              v-model="login.form.password"
            />
          </div>
          <button type="submit" class="btn btn-primary">
            <!-- Jika Loading true -->
            <span v-if="login.loading">
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Loading...
            </span>
            <!-- {{ login.loading ? 'loading...' : 'Login' }} -->

            <!-- Jika Loading false -->
            <span v-else> Login </span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
