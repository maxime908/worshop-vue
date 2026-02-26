<script setup>
    import { addUser } from '@/store/store';
    import { ref } from 'vue';

    const email = ref("")
    const password = ref("")
</script>

<template>
    <form>
        <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input v-model="email" type="email" id="email" class="form-control" aria-describedby="emailHelpId" placeholder="abc@mail.com"/>
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Mot de passe</label>
            <input v-model="password" id="password" type="password" class="form-control"/>
        </div>
        <button type="submit" class="btn btn-primary" @click.prevent="addUser(email, password)">Valider</button>
    </form>
</template>