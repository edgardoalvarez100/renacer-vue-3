<template>

  <div class="row justify-content-center mt-5">
    <div class="col-md-6 ">
      <h1>Register</h1>

      <div class="alert alert-danger" v-if="errorRegister">{{ errorRegister }}</div>

      <form class="form" @submit.prevent="register">
        <input type="text" placeholder="Nombre" v-model="name" class="form-control mb-2" required name="name" />
        <input type="email" placeholder="Email" v-model="email" class="form-control mb-2" required name="email" />
        <input type="password" placeholder="Password" v-model="password" class="form-control mb-2" required
          name="password" />

        <button type="submit" class="btn btn-primary" :disabled="loading">
          Register
        </button>

      </form>
    </div>
  </div>

</template>
<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { account, ID } from '../lib/appwrite';
import { useUserStore } from "../stores/user";
import { router } from '@/router/'

const loggedInUser = ref(null);
const loading = ref(false);
const email = ref('');
const password = ref('');
const name = ref('');
const errorRegister = ref(null);


const userStore = useUserStore();
const { user } = storeToRefs(userStore)

if (user) {
  router.push("/")
}

const register = async () => {
  loading.value = true
  try {
    const userRef = await account.create(ID.unique(), email.value, password.value, name.value);
    console.log(userRef)

  } catch (error) {
    // const { ...e } = error

    switch (error.code) {
      case 409:
        errorRegister.value = "El correo ya se encuentra registrado"
        break;

      default:
        errorRegister.value = error.response.message
        break;
    }
  } finally {
    loading.value = false
  }

};



const getAccount = async () => {
  loggedInUser.value = await account.get();
}
</script>