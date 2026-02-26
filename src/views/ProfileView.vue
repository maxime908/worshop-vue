<script setup>
    import { deleteAccount, userInfo } from '@/store/store';
    import { ref } from 'vue';

    let id_of_user

    if (JSON.parse(localStorage.getItem('is_authentificated'))) {
        id_of_user = ref(JSON.parse(localStorage.getItem('is_authentificated'))['id'])
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
                    <span>Email : {{ userInfo(id_of_user).email }} </span>
                </div>
                <button class="btn btn-danger" @click="deleteAccount(id_of_user)">Supprimer le compte</button>
                <button class="btn btn-primary">Modifier les informations</button>
            </div>
        </div>
    </main>
</template>