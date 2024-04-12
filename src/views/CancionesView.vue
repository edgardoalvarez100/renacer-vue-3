<template>
    <h1>Canciones</h1>
    <div class="row">
        <div class="col-md-12">
            <input type="text" placeholder="Search song" class="form-control mb-3">
            <loading-spinner v-if="loadingSongs" />
            <ul class="list-group" v-else>
                <li class="list-group-item" v-for="song in songs" :key="song.id">{{ song.name }} - {{ song.singer }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>

import { databases } from "../lib/appwrite";
import { ref } from 'vue';
import LoadingSpinner from '../components/LoadingSpinner.vue'

const songs = ref([])
const totalSongs = ref([])
const loadingSongs = ref(false);

const getSongs = async () => {
    loadingSongs.value = true
    try {
        const resp = await databases.listDocuments(import.meta.env.VITE_APPWRITE_DATABASE_ID, '6618a5eb00129cbc0817');
        songs.value = resp.documents;
        totalSongs.value = resp.total;
    } catch (error) {
        console.log(error)
    } finally {
        loadingSongs.value = false
    }

}
getSongs()
</script>
