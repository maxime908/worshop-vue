<script setup>
    import { onMounted, ref } from 'vue';
    import { addPost, updatePost, recupId } from '../store/store';
    import { useRoute } from 'vue-router';

    const route = useRoute();

    let post = ref("")
    let img = ref("")
    let text = ref("")
    let code = ref("")
    
    let refTag = ref("")

    let saveTag = [];

    onMounted(() => {
        if (route.params.id) {
            post.value = recupId(route.params.id)
        }
    })

    function tabulationOnTextarea(event) {
        if (event.key == 'Tab') {
            event.preventDefault();

            if (!route.params.id) {
                code.value += "    ";
            } else {
                post.code.value += "    ";
            }
        }
    }

    function addTag(tag) {
        saveTag.push("#" + tag);

        refTag.value = "";
    }

    function removeTag(tag) {
        saveTag.splice(saveTag.indexOf(tag), 1);
    }
</script>

<template>
    <form class="d-flex flex-column gap-2 align-items-start">
        <div class="mb-3 w-100">
            <input v-if="$route.params.id" type="text" v-model="post.img" class="form-control" name="url" id="url" placeholder="Url de l'image">
            <input v-else type="text" v-model="img" class="form-control" name="url" id="url" placeholder="Url de l'image">
        </div>
        
        <div class="mb-3 w-100">
            <textarea v-if="$route.params.id" class="form-control" v-model="post.text"  name="description" id="description" rows="3" placeholder="Description"></textarea>
            <textarea v-else class="form-control" v-model="text"  name="description" id="description" rows="3" placeholder="Description"></textarea>
        </div>
        <div class="mb-3 w-100">
            <textarea v-if="$route.params.id" class="form-control" v-model="post.code" name="code" id="code" rows="3" @keydown="tabulationOnTextarea($event)" placeholder="Extrait de code"></textarea>
            <textarea v-else class="form-control" v-model="code" name="code" id="code" rows="3" @keydown="tabulationOnTextarea($event)" placeholder="Extrait de code"></textarea>
        </div>
        <!-- <div v-for="tag in post.tag" v-if="tag !== null">
            <p v-if="$route.params.id">{{ tag }}</p>
        </div> -->
        <input v-if="!$route.params.id" type="text" id="tag" v-model="refTag">
        <div class="d-flex gap-3">
            <span v-for="tag in saveTag" class="cursor-pointer" @click="removeTag(tag)">{{ tag }}</span>
        </div>
        <button v-if="!$route.params.id" @click.prevent="addTag(refTag)">Ajouter le tag</button>

        <button v-if="!$route.params.id" class="btn btn-primary" @click.prevent="addPost(img, text, code, saveTag)">Valider</button>

        <button v-else class="btn btn-primary" @click.prevent="updatePost()">Valider</button>
    </form>
</template>