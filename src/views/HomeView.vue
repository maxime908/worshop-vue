<script setup>
import { computed, ref, stop, watchEffect } from 'vue';
import Home from '../components/Home.vue'
import { store } from '../store/store';

const count = ref(5)

function increment() {
  count.value += 5
  window.location.href = "#button"
}

</script>

<template>
  <main class="d-flex flex-column gap-5">
    <div v-for="item in store.slice(0, count)">
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
        :post-tag="item.tag"
      />
    </div>

    <button class="btn btn-primary d-flex justify-content-center align-items-center m-auto" id="button" @click="increment">Voir Plus</button>
  </main>
</template>