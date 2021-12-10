import dotenv from 'dotenv';
import needle from 'needle';
dotenv.config({
  path: '~/code/Development-Person/projects/tweet_analyzer/backend/.env',
});
const token = process.env.BEARER_TOKEN;

async function getLikes(tweetID) {
  const likesEndpointURL = `https://api.twitter.com/2/tweets/${tweetID}/liking_users`;

  // These are the parameters for the API request
  // by default, only the Tweet ID and text are returned
  const params = {
    'tweet.fields': 'lang,author_id',
    'user.fields': 'created_at',
  };

  // this is the HTTP header that adds bearer token authentication
  const res = await needle('get', likesEndpointURL, params, {
    headers: {
      'User-Agent': 'v2LikingUsersJS',
      authorization: `Bearer ${token}`,
    },
  });

  if (res.body) {
    return res.body;
  } else {
    throw new Error('Unsuccessful request');
  }
}

async function getRetweets(tweetID) {
  const retweetEndpointURL = `https://api.twitter.com/2/tweets/${tweetID}/retweeted_by`;
  // These are the parameters for the API request
  // by default, only the Tweet ID and text are returned
  const params = {
    'tweet.fields': 'lang,author_id',
    'user.fields': 'created_at',
  };

  // this is the HTTP header that adds bearer token authentication
  const res = await needle('get', retweetEndpointURL, params, {
    headers: {
      'User-Agent': 'v2LikingUsersJS',
      authorization: `Bearer ${token}`,
    },
  });

  if (res.body) {
    return res.body;
  } else {
    throw new Error('Unsuccessful request');
  }
}

export { getLikes, getRetweets };
