import dotenv from 'dotenv';
import needle from 'needle';
dotenv.config({
  path: '~/code/projects/tweet_analyzer/.env',
});

const token = process.env.BEARER_TOKEN;

async function getLikes(tweetID) {
  const likesEndpointURL = `https://api.twitter.com/2/tweets/${tweetID}/liking_users`;

  const params = {
    'tweet.fields': 'lang,author_id',
    'user.fields': 'created_at',
  };

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

  const params = {
    'tweet.fields': 'lang,author_id',
    'user.fields': 'created_at',
  };

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

async function getTweetAuthorId(tweetID) {
  const tweetEndpointURL = `https://api.twitter.com/2/tweets/${tweetID}`;

  const params = {
    'tweet.fields': 'author_id',
  };

  const res = await needle('get', tweetEndpointURL, params, {
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

async function getFollowResult(authorID) {
  const followEndpointURL = `https://api.twitter.com/2/users/${authorID}/followers`;

  const params = {
    max_results: 500,
  };

  const res = await needle('get', followEndpointURL, params, {
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

export { getLikes, getRetweets, getTweetAuthorId, getFollowResult };
