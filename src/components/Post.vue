<template>
  <div class="row">
    <div class="card">
    <div class="card-content">
      <span class="card-title activator grey-text text-darken-4" >{{post.title}}</span>
      <p><a :href="`https://www.reddit.com${post.permalink}`">See post on Reddit</a></p>
    </div>
    <div v-if="isImage" class="card-image waves-effect waves-block waves-light media">
      <a :href="post.url"><img class="activator" :src="post.url" /></a>
    </div>
    <div v-if="isVideo" class="card-image waves-effect waves-block waves-light media">
      <video autoplay controls muted>
        <source :src="videoUrl" type="video/mp4">
      </video>
    </div>
  </div>
  </div>
</template>

<script setup="props">
import { computed } from 'vue';

export default {
  props: {
    post: Object,
  },
};

const { post } = props;

export const isImage = computed(() => post.url.match(/png|jpg|jpeg|gif$/));
export const isVideo = computed(() => (post.media && post.is_video) || post.url.match(/mp4|gifv$/));
export const videoUrl = computed(() => {
  if (post.media) {
    return post.media.reddit_video.fallback_url;
  }

  const parts = post.url.split('.');
  parts.pop();
  parts.push('mp4');
  return parts.join('.');
});
</script>

<style lang="scss">
.media {
  width: 100%;
}

img, video {
  height: 400px;
  width: 100%;
  margin: auto;
}

img {
  object-fit: contain;
}
</style>
