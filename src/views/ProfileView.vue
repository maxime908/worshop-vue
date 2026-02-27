<script setup>
    import { deleteAccount, removeParams, userInfo } from '@/store/store';
    import { useUrlSearchParams } from '@vueuse/core';
    import { computed, onMounted, ref } from 'vue';

    const params = useUrlSearchParams('history')

    let id_of_user = null

    if (JSON.parse(localStorage.getItem('is_authentificated'))) {
        id_of_user = ref(JSON.parse(localStorage.getItem('is_authentificated'))['id'])
    }

    let user = ref("");

    onMounted(() => {
        if (id_of_user) {
            user.value = userInfo(id_of_user.value);
        }
    })

    let is_authentificated

    if (JSON.parse(localStorage.getItem('is_authentificated'))) {
        is_authentificated = ref(JSON.parse(localStorage.getItem('is_authentificated')))
    }
</script>

<template>
    <main class="d-flex justify-content-center align-items-center vh-100">
        <div class="d-flex gap-5 align-items-center">
           <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" fill="currentColor" class="bi bi-person-circle person" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
            </svg>
            <div class="d-flex flex-column gap-3 align-items-start">
                <div class="d-flex gap-3">
                    <label for="email">Email :</label>
                    <input v-show="params.updateInfo" v-model="user.email" id="email"></input>
                    <span v-show="!params.updateInfo">{{ user.email }}</span>

                    <label for="fistName">Prénom :</label>
                    <input v-show="params.updateInfo" v-model="user.firstName" id="fistName"></input>
                    <span v-show="!params.updateInfo">{{ user.firstName }}</span>

                    <label for="lastName">Nom :</label>
                    <input v-show="params.updateInfo" v-model="user.lastName" id="lastName"></input>
                    <span v-show="!params.updateInfo">{{ user.lastName }}</span>
                </div>
                <button class="btn btn-danger" @click="deleteAccount(id_of_user)">Supprimer le compte</button>
                <button v-show="params.updateInfo" class="btn btn-primary" @click="removeParams()">Retour</button>
                <a class="btn btn-primary" href="?updateInfo=true">Modifier les informations</a>
                <RouterLink v-if="is_authentificated" to="/logout" class="btn btn-primary">Se déconnecter</RouterLink>
            </div>
        </div>
    </main>
</template>