<template>

    <div class="row">
        <div class="col md-12 d-flex justify-content-between p-2">
            <div>
                <h1>Songs</h1>
            </div>

            <div>
                <button class="btn btn-success " data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <i class="bi bi-file-earmark-plus-fill"></i>
                    Add
                </button>
            </div>

        </div>
        <div class="col-md-12">
            <input type="text" placeholder="Search song" class="form-control mb-3">
            <loading-spinner v-if="loadingSongs" />
            <ul class="list-group" v-else>
                <li class="list-group-item" v-for="song in songs" :key="song.id">

                    <b>{{ song.name }}</b> <br>
                    {{ song.singer
                    }} <br> Tone: {{ song.tono }}
                </li>
            </ul>
        </div>
    </div>

    <div class="modal fade" tabindex="-1" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true"
        ref="modalEle">
        <div class="modal-dialog ">

            <div class="modal-content">
                <form @submit.prevent="addSong">
                    <div class="modal-header">
                        <h5 class="modal-title">Add Song</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-2">
                            <label for="name" class="form-label">
                                Name
                            </label>
                            <input type="text" v-model="name" required name="name" class="form-control">
                        </div>
                        <div class="mb-2">
                            <label for="singer" class="form-label">
                                Singer
                            </label>
                            <input type="text" v-model="singer" required name="singer" class="form-control">
                        </div>
                        <div class="mb-2">
                            <label for="tone" class="form-label">
                                Tone
                            </label>
                            <input type="text" v-model="tone" name="tone" class="form-control">
                        </div>
                        <div class="mb-2">
                            <label for="rhythm" class="form-label">
                                Rhythm
                            </label>
                            <input type="text" v-model="rhythm" required name="rhythm" class="form-control">
                        </div>
                        <div class="mb-2">
                            <label for="rhythm" class="form-label">
                                Note
                            </label>
                            <textarea v-model="rhythm" name="rhythm" class="form-control"></textarea>
                        </div>


                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-primary">Save Song</button>
                    </div>

                </form>
            </div>

        </div>
    </div>
</template>

<script setup>

import { databases } from "../lib/appwrite";
import { ref, onMounted } from 'vue';
import LoadingSpinner from '../components/LoadingSpinner.vue'
import { Modal } from "bootstrap";

const songs = ref([])
const totalSongs = ref([])
const loadingSongs = ref(false);

let modalEle = ref(null);
let thisModalObj = null;

onMounted(() => {
    thisModalObj = new Modal(modalEle.value);
});

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

const addSong = () => {

}
</script>
