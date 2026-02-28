<script setup>
    import { computed, onMounted, reactive, ref, watch, watchEffect } from 'vue';
    import { addPost, updatePost, recupId } from '../store/store';
    import { useRoute } from 'vue-router';

    const route = useRoute();

    let post = ref("")
    let img = ref("")
    let text = ref("")
    let code = ref("")
    
    let refTag = ref("")

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
                post.value.code += "    ";
            }
        }
    }

    const tagStore = reactive({
        saveTag: [],
    })

    function addTag(tag) {
        if (!route.params.id) {
            tagStore.saveTag.push("#" + tag);

            refTag.value = "";
        } else {
            post.value.tag.push("#" + tag);

            refTag.value = "";
        }
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
        <div class="d-flex flex-column gap-5">
            <div class="d-flex flex-wrap gap-4">
                <div v-for="(tag, index) in post.tag">
                    <div v-if="tag !== null && $route.params.id" class="d-flex gap-2">
                        <input class="cursor-pointer" v-model="post.tag[index]"></input>
                        <button @click.prevent="post.tag.splice(post.tag.indexOf(tag), 1);" class="btn btn-danger">Supprimer tag</button>
                    </div>
                </div>
            </div>
            <div class="d-flex gap-2">
                <input type="text" id="tag" v-model="refTag">
                <button @click.prevent="addTag(refTag)" class="btn btn-primary">Ajouter le tag</button>
            </div>
        </div>
        <div class="d-flex gap-3">
            <span v-for="tag in tagStore.saveTag" class="cursor-pointer" @click.prevent="tagStore.saveTag.splice(tagStore.saveTag.indexOf(tag), 1);">{{ tag }}</span>
        </div>

        <button v-if="!$route.params.id" class="btn btn-primary" @click.prevent="addPost(img, text, code, tagStore.saveTag)">Envoyer</button>

        <button v-else class="btn btn-primary" @click.prevent="updatePost()">Envoyer</button>
    </form>
</template>