<template>
 <h1>Home</h1>

 <div class="container">
    <p>
      {{ loggedInUser ? `Logged in as ${loggedInUser.name}` : 'Not logged in' }} - {{ localeRequest }}
    </p>

    <form class="form row">
      <input type="email" placeholder="Email" v-model="email" class="form-control " />
      <input type="password" placeholder="Password" v-model="password" class="form-control" />
      <input type="text" placeholder="Name" v-model="name" class="form-control" />
      <button type="button" @click="login(email, password)" class="btn btn-primary">Login</button>
      <button type="button" @click="register" class="btn btn-secondary">
        Register
      </button>
      <button type="button" @click="logout" class="btn btn-outline-primary">
        Logout
      </button>
    </form>

      
  </div>
</template>
<script setup>
import {  ref } from 'vue';
import { account, ID, locale } from '../lib/appwrite';

const loggedInUser = ref(null);
const email = ref('');
const password = ref('');
const name = ref('');
const localeRequest = ref('');
const idioma = ref('');

const login = async (email, password) => {
  await account.createEmailPasswordSession(email, password);
  loggedInUser.value = await account.get();
};

const register = async () => {
  await account.create(ID.unique(), email.value, password.value, name.value);
  login(email.value, password.value);
};

const logout = async () => {
  await account.deleteSession('current');
  loggedInUser.value = null;
};
const getLocale =  (async()=>{
  localeRequest.value =  await locale.get();
})

const getAccount = async() =>{
  loggedInUser.value = await account.get();
}
getAccount()
getLocale()
</script>