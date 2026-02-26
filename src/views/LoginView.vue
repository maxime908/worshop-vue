<script setup>
    import { login } from '@/store/store';
    import { ref } from 'vue';

    const email = ref("")
    const password = ref("")
</script>

<template>
    <form>
        <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input v-model="email" type="email" class="form-control" id="email" aria-describedby="emailHelpId" placeholder="abc@mail.com" />
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input v-model="password" type="password" class="form-control" id="password" />
        </div>
        <button type="submit" class="btn btn-primary" @click.prevent="login(email, password)">Valider</button>
    </form>
</template>