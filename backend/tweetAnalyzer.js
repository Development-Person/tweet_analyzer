import dotenv from 'dotenv';
import needle from 'needle';
dotenv.config({
  path: '~/code/Development-Person/projects/tweet_analyzer/backend/.env',
});
const token = process.env.BEARER_TOKEN;

async function getTweetLikes(likesEndpointURL) {
  // These are the parameters for the API request
  // by default, only the Tweet ID and text are returned
  const params = {
    'tweet.fields': 'lang,author_id', // Edit optional query parameters here
    'user.fields': 'created_at', // Edit optional query parameters here
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

export async function getTweetData(tweet) {
  const id = tweet;

  //likes
  const likesEndpointURL = `https://api.twitter.com/2/tweets/${id}/liking_users`;
  const names = new Array();

  const likedResult = await getTweetLikes(likesEndpointURL);

  console.log(likedResult);

  likedResult.data.forEach((user) => {
    let username = user.username;

    names.push({
      [username]: {
        liked: true,
        retweeted: false,
        tagged: false,
      },
    });
  });

  return names;
}
