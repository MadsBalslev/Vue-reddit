import { reactive, watch } from 'vue';
import API from '@/utils/API';

export default function usePosts(subreddit) {
  // Set initial postState
  const postState = reactive({
    loading: false,
    data: [],
    error: '',
  });

  // Get the posts from specifies subreddit
  async function getData() {
    try {
      // Make sure postState is reset
      postState.loading = true;
      postState.error = '';
      postState.data = [];

      // Get the posts using the API
      const response = await API.getPosts(subreddit);
      postState.data = response.data.children;
    } catch (error) {
      postState.error = error;
    } finally {
      postState.loading = false;
    }
  }

  // Watch for changes in subreddit to get new data everytime it changes
  watch(() => subreddit, getData, { immediate: true });

  return postState;
}
