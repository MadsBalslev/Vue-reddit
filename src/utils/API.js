export default {
  async getPosts(subreddit) {
    const url = `https://www.reddit.com/r/${subreddit}.json`;

    const response = await fetch(url);
    const data = await response.json();

    // Only return the data if it's good
    if (response.ok) {
      return data;
    }

    // If the data is not good handle the error
    const error = new Error(data.message || `Error getting data for r/${subreddit}`);
    error.response = data;
    throw error;
  },
};
