<template>
    <div class="row justify-content-center mt-5">
        <div class="col-md-6 ">
            <h1>Login</h1>

            <div class="alert alert-danger" v-if="errorLogin">{{ errorLogin }}</div>
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
import { router } from '@/router/'

const loading = ref(false);
const email = ref('');
const password = ref('');
const errorLogin = ref(null);


const userStore = useUserStore();
const { user } = storeToRefs(userStore)

if (user) {
    router.push("/")
}

const login = async () => {
    loading.value = true
    try {
        const session = await account.createEmailPasswordSession(email.value, password.value);
        const res = await account.get();
        user.value = { id: res.$id, email: res.email, name: res.name };
        router.push("/")
    } catch (error) {
        errorLogin.value = error.response.message
    } finally {
        loading.value = false
    }
}
</script>