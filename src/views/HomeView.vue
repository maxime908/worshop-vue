<script setup>
import Home from '../components/Home.vue'
import { store } from '../store/store';
</script>

<template>
  <main>
    <div v-for="item in store">
      <Home 
        :id="item.id" 
        :text="item.text"  
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