<template>
  <div class="home">
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import usePosts from '@/hooks/usePosts';

onMounted(() => {
  console.log(usePosts('aww'));
});
</script>
