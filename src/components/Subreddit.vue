<template>
  <div v-if="postsState.loading" class="progress indigo lighten-5">
    <div class="indeterminate indigo"></div>
  </div>
  <div v-if="postsState.error" class="card red accent-4 darken-1">
    <div class="card-content white-text">
      <span class="card-title">{{postsState.error}}</span>
      <p>There was an error loading the data</p>
    </div>
  </div>
  <Post v-for="post in posts" :key="post.id" :post="post"/>
</template>

<script setup="props">
import Post from '@/components/Post';
import { computed } from 'vue';
import usePosts from '@/hooks/usePosts';

export const postsState = usePosts(props.name);
export const posts = computed(() => postsState.data.map((child) => child.data));

export default {
  props: {
    name: String,
  },
  components: {
    Post,
  },
};
</script>

<style>

</style>
