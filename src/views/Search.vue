<script setup>
    import { search, storeDuplication } from '@/store/store';
    import Home from '../components/Home.vue'
</script>

<template>
    <main class="d-flex flex-column gap-5">
        <input type="text" class="form-control" name="search" id="search" v-model="storeDuplication.input" placeholder="Rechercher...">
        
        <div v-for="item in search">
            <Home 
                :id="item.id" 
                :description="item.text"  
                :img="item.img"
                :code="item.code"
                :likes="item.likes"
                :dislikes="item.dislikes"
                :like-bool="item.like"
                :dislike-bool="item.dislike"
                :id_user="item.id_user"
            />
        </div>
    </main>
</template>