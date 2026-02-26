<script setup>
    import { onMounted, ref } from 'vue';
    import { addPost, updatePost, recupId } from '../store/store';
    import { useRoute } from 'vue-router';

    const route = useRoute();

    let post = ref("");
    let img = ref("")
    let text = ref("")
    let code = ref("")

    onMounted(() => {
        if (route.params.id) {
            post.value = recupId(route.params.id)
        }
    })
</script>

<template>
    <form>
        <div class="mb-3">
            <input v-if="$route.params.id" type="text" v-model="post.img" class="form-control" name="url" id="url" placeholder="Url de l'image">
            <input v-else type="text" v-model="img" class="form-control" name="url" id="url" placeholder="Url de l'image">
        </div>
        
        <div class="mb-3">
            <textarea v-if="$route.params.id" class="form-control" v-model="post.text"  name="description" id="description" rows="3" placeholder="Description"></textarea>
            <textarea v-else class="form-control" v-model="text"  name="description" id="description" rows="3" placeholder="Description"></textarea>
        </div>
        <div class="mb-3">
            <textarea v-if="$route.params.id" class="form-control" v-model="post.code" name="code" id="code" rows="3" placeholder="Extrait de code"></textarea>
            <textarea v-else class="form-control" v-model="code" name="code" id="code" rows="3" placeholder="Extrait de code"></textarea>
        </div>

        <button v-if="!$route.params.id" class="btn btn-primary" @click.prevent="addPost(img, text, code)">Valider</button>

        <button v-else class="btn btn-primary" @click.prevent="updatePost()">Valider</button>
    </form>
</template>