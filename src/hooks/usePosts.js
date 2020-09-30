import { reactive, watch } from 'vue';
import API from '@/utils/API';

export default function usePosts(subreddit, params = {}) {
  const postState = reactive({
    loading: false,
    error: '',
    data: [],
  });

  async function loadData() {
    try {
      postState.loading = true;
      postState.error = '';
      postState.data = [];

      const response = await API.getPosts(subreddit, params);
      postState.data = response.data.children;
    } catch (error) {
      postState.error = error.message || `Error getting posts from r/${subreddit}`;
    } finally {
      postState.loading = false;
    }
  }

  watch(() => subreddit, loadData, { immediate: true });
  return postState;
}
