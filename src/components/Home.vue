<script>
    import 'highlight.js/lib/common';
    import hljsVuePlugin from "@highlightjs/vue-plugin";
    import { dislike, like, userInfo } from '@/store/store';
    import { onMounted, ref, watchEffect } from 'vue';

    import { useClipboard } from '@vueuse/core'

    export default {
        components: {
            highlightjs: hljsVuePlugin.component
        }
    }

    let id_of_user = null;

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
        description: {
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
        },
        postTag: {
            type: Array,
            required: false,
        },
    })

    const source = ref('Hello')
    const { text, copy, copied, isSupported } = useClipboard({ source })


    onMounted(() => {
        document.querySelectorAll(".code").forEach((element) => {
            const code = element.querySelector("code").classList[1];
            const lang = element.querySelector(".lang");

            if (code) {
                lang.innerHTML = code
                lang.setAttribute("href", `search?tab=${code}`)
            } else {
                lang.style.display = "none";
            }
        })
    })
</script>

<template>
    <ul class="d-flex gap-5 align-items-start p-5 card-home">
        <div class="first-child d-flex flex-column gap-4 align-items-center info_user">
            <span>
                {{ userInfo(id_of_user).firstName }}
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
            </svg>
        </div>

        <div class="d-flex flex-column w-90 gap-3">
            <a :href="img" class="fit-content">
                <img :src="img" :alt="img" class="w-100 object-fit-cover">
            </a>
            <div v-if="code !== ''" class="d-flex justify-content-between position-relative code">
                <div class="line">
                    <div v-for="line in tablignes=JSON.stringify(code).split('\\n').length">
                        {{ line }}
                    </div>
                </div>
                <highlightjs
                    v-if="code !== null"
                    :code="code"
                />
                <div class="position-absolute right-10px top-5px d-flex gap-3 align-items-center">
                    <a href="#" class="lang btn btn-secondary"></a>
                    <i class="bi bi-clipboard2 cursor-pointer" v-if="!copied" @click="copy(code)"></i>
                    <i v-else class="bi bi-clipboard2-fill cursor-pointer"></i>
                </div>
            </div>
            <div>
                {{ description }}
            </div>
            <div class="d-flex gap-2 flex-wrap">
                <a class="btn btn-dark" :href="'/search?tab=' + tag.replace('#', '')" v-for="tag in postTag">
                    {{ tag }}
                </a>
            </div>
            <div class="d-flex justify-content-between align-items-center">
                <div v-if="id_user === id_of_user" class="d-flex gap-3">
                    <a class="btn btn-primary" :href="'/post/update/' + id">Modifier</a>
                    <a class="btn btn-danger" :href="'/delete/' + id">Supprimer</a>
                </div>
                <div class="d-flex gap-3 like-content">
                    <div :id="'like' + id">
                        <span v-if="!likeBool" @click="like(id, bool = !likeBool)"><i class="bi bi-hand-thumbs-up"></i> {{ likes }}</span>
                        <span v-else @click="like(id, bool = !likeBool)"><i class="bi bi-hand-thumbs-up-fill"></i> {{ likes }}</span>
                    </div>

                    <div :id="'dislike' + id">
                        <span v-if="!dislikeBool" @click="dislike(id, bool = !dislikeBool)"><i class="bi bi-hand-thumbs-down"></i> {{ dislikes }}</span>
                        <span v-else @click="dislike(id, bool = !dislikeBool)"><i class="bi bi-hand-thumbs-down-fill"></i> {{ dislikes }}</span>
                    </div>
                </div>
            </div>
        </div>
    </ul>
</template>