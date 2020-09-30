<template>
  <div class="navbar-fixed">
    <nav class="indigo">
      <div class="nav-wrapper container">
        <a href="#" class="brand-logo">Reddit</a>
        <form class="right" >
          <div class="input-field">
            <input
              v-model="searchTerm"
              ref="subreddit"
              class="autocomplete"
              id="subreddit" type="search"
              required placeholder="Search">
            <label class="label-icon" for="subreddit"><i class="material-icons">search</i></label>
            <i class="material-icons">close</i>
          </div>
        </form>
      </div>
    </nav>
  </div>
</template>

<script>
import store from '@/store/index';
import { ref, onMounted, watch } from 'vue';
import API from '@/utils/API';

export default {
  setup() {
    const searchTerm = ref('');
    const subreddit = ref(null);

    onMounted(() => {
      const instance = M.Autocomplete.init(subreddit.value, {
        data: {},
        onAutocomplete(result) {
          store.state.subreddit = result;
        },
      });
      async function getResults() {
        // Dont call API unless searchterm is greater than 3
        if (searchTerm.value.length < 3) return;
        const response = await API.getPosts('search', {
          q: searchTerm.value,
          type: 'sr',
        });

        const results = response
          .data
          .children
          // .map((child) => child.data.display_name);
          .reduce((all, child) => {
            all[child.data.display_name] = null;
            return all;
          }, {});

        console.log(results);

        instance.updateData(results);
        instance.open();
      }
      let debounceTimeout;
      watch(() => searchTerm.value, () => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
          getResults();
        }, 300);
      });
    });

    return {
      subreddit,
      searchTerm,
    };
  },
};
</script>

<style scoped>
</style>
