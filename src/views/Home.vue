<template>
  <div class="container">
    <Subreddit :name="name.subreddit" />
  </div>
</template>

<script setup>
import Subreddit from '@/components/Subreddit';
import store from '@/store/index';

export default {
  components: {
    Subreddit,
  },
};

export const name = store.state;
</script>

<style lang="scss" scoped>
</style>
