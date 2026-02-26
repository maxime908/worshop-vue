<script setup>
    import { deletePost, recupId } from '@/store/store';
    import { onMounted, ref } from 'vue';
    import { useRoute } from 'vue-router';

    const route = useRoute();

    let post = ref("")

    onMounted(() => {
        post.value = recupId(route.params.id)
    })
</script>

<template>
    <main class="d-flex justify-content-center align-items-center vh-100">
        <button class="btn btn-danger" @click="deletePost(post)">Supprimer</button>
    </main>
</template>