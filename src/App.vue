<template>

<a-layout class="layout" v-if="!userStore.loadingSession">
  <a-layout-header>
      <div class="logo" />
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="home" v-if="userStore.user">
          <router-link  to="/" >Home</router-link>
        </a-menu-item>
        <a-menu-item key="canciones" v-if="userStore.user">
          <router-link to="/canciones">Songs</router-link>
        </a-menu-item>
        <a-menu-item key="register" v-if="!userStore.user">
          <router-link  to="/register">Register</router-link>
        </a-menu-item>
        <a-menu-item  v-if="userStore.user" @click="userStore.logout">
          Logout
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px" class="container">
      <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">
        <router-view></router-view>
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      RenacerApp ©2024 Created by Edgardo Alvarez
    </a-layout-footer>
</a-layout>
<div class="text-center" v-if="userStore.loadingSession">Loading session...</div>


</template>

<script setup>
import { ref, watch,onBeforeMount } from 'vue';
import { RouterView,useRoute } from 'vue-router';
import { useUserStore } from './stores/user';

const userStore = useUserStore()
const selectedKeys = ref([]);
const route = useRoute();
watch(() => route.name, () => { selectedKeys.value = [route.name];})

onBeforeMount(async()=>{
  await userStore.currentUser();
})
</script>


<style scoped>
.site-layout-content {
  min-height: 280px;
  padding: 24px;
  background: #fff;
}
#components-layout-demo-top .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}
.ant-row-rtl #components-layout-demo-top .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

[data-theme='dark'] .site-layout-content {
  background: #141414;
}
</style>
