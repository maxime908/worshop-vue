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
        <div class="container">
            <div class="row gutters">
                <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                    <div class="card h-100">
                        <div class="card-body">
                            <div class="account-settings">
                                <div class="user-profile">
                                    <div class="user-avatar">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" fill="currentColor" class="bi bi-person-circle person" viewBox="0 0 16 16">
                                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                                            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                                        </svg>
                                    </div>
                                    <h5 class="user-name">{{ user.lastName + " " + user.firstName }}</h5>
                                    <h6 class="user-email">{{ user.email }}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                    <div class="card h-100">
                        <div class="card-body">
                            <div class="row gutters">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <h6 class="mb-3 text-primary">Personal Details</h6>
                                </div>
                                <div class="d-flex flex-column gap-4">
                                    <div class="d-flex gap-3">
                                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div class="form-group">
                                                <label for="lastName">Nom</label>
                                                <input type="text" class="form-control" id="lastName" v-model="user.lastName">
                                            </div>
                                        </div>
                                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div class="form-group">
                                                <label for="firstName">Prénom</label>
                                                <input type="text" class="form-control" id="firstName" v-model="user.firstName">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label for="email">Email</label>
                                            <input type="email" class="form-control" id="email" v-model="user.email">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>