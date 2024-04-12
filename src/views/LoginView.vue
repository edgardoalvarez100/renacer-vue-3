<template>
    <div class="row justify-content-center mt-5">
        <div class="col-md-6 ">
            <h1>Login</h1>

            <div class="alert alert-danger" v-if="errorRegister">{{ errorRegister }}</div>
            <form class="form" @submit.prevent="login">

                <input type="email" placeholder="Email" v-model="email" class="form-control mb-2" required
                    name="email" />
                <input type="password" placeholder="Password" v-model="password" class="form-control mb-2" required
                    name="password" />

                <button type="submit" class="btn btn-primary" :disabled="loading">
                    Login
                </button>

            </form>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { account } from '../lib/appwrite';
import { useUserStore } from "../stores/user";

const loading = ref(false);
const email = ref('');
const password = ref('');
const errorRegister = ref(null);

const userStore = useUserStore();
const { user } = storeToRefs(userStore)

const login = async () => {
    try {

        const session = await account.createEmailPasswordSession(email.value, password.value);
        const userDB = await account.get();
        user.value = userDB;
    } catch (error) {
        console.log(error);
    }
}
</script>