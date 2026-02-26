<script>
    import 'highlight.js/lib/common';
    import hljsVuePlugin from "@highlightjs/vue-plugin";
    import { dislike, like } from '@/store/store';
    import { ref } from 'vue';

    export default {
        components: {
            highlightjs: hljsVuePlugin.component
        }
    }

    let id_of_user

    if (JSON.parse(localStorage.getItem('is_authentificated'))) {
        id_of_user = ref(JSON.parse(localStorage.getItem('is_authentificated'))['id'])
    }
</script>

<script setup>
    defineProps({
        id: {
            type: Number,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        img: {
            type: String,
            required: false,
        },
        code: {
            type: String,
            required: false,
        },
        likes: {
            type: Number,
            required: true,
        },
        dislikes: {
            type: Number,
            required: true,
        },
        likeBool: {
            type: Boolean,
            required: true,
        },
        dislikeBool: {
            type: Boolean,
            required: true,
        },
        id_user: {
            type: Number,
            required: true,
        }
    })
</script>

<template>
    <ul>
        <div>
            {{ text }}
        </div>
        <img v-if="img !== null" :src="img" alt="text">
        <highlightjs
            v-if="code !== null"
            :code="code"
        />
        <div class="d-flex gap-3">
            <span id="like" @click="like(id, bool = !likeBool)">Like(s): {{ likes }}</span>
            <span id="dislike" @click="dislike(id, bool = !dislikeBool)">Dislike(s): {{ dislikes }}</span>
        </div>
        <div v-if="id_user === id_of_user" class="d-flex gap-3">
            <a class="btn btn-primary" :href="'/post/update/' + id">Modifier</a>
            <a class="btn btn-danger" :href="'/delete/' + id">Supprimer</a>
        </div>
    </ul>
</template>