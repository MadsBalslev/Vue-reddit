export default {
  async getPosts(subreddit, params) {
    const urlParams = new URLSearchParams(params);
    const url = `https://www.reddit.com/${subreddit}.json?${urlParams}`;

    const response = await fetch(url, {
      headers: {
        accept: 'application/json',
      },
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    }

    const error = new Error(data.message || 'Error getting data');
    error.response = data;
    throw error;
  },
};
