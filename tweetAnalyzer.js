import {
  getLikes,
  getRetweets,
  getTweetAuthorId,
  getFollowResult,
} from './twitter_api.js';

export async function getTweetData(tweet) {
  const id = tweet;

  //likes
  const names = new Array();

  const likedResult = await getLikes(id);

  if (likedResult.data) {
    likedResult.data.forEach((user) => {
      let username = user.username;

      names.push({
        name: username,
        stats: {
          liked: true,
          retweeted: false,
          follows: false,
        },
      });
    });

    const retweetResult = await getRetweets(id);

    if (retweetResult.data) {
      retweetResult.data.forEach((user) => {
        let username = user.username;

        let search = names.find((user, index) => {
          if (user.name === username) {
            names[index].stats.retweeted = true;
            return true;
          }

          return false;
        });

        if (search === false) {
          names.push({
            name: username,
            stats: {
              liked: false,
              retweeted: true,
              follows: false,
            },
          });
        }
      });
    }

    const authorResult = await getTweetAuthorId(id);
    const tweetAuthorId = authorResult.data.author_id;

    const followResult = await getFollowResult(tweetAuthorId);

    if (followResult.data) {
      followResult.data.forEach((user) => {
        let username = user.username;

        names.find((user, index) => {
          if (user.name === username) {
            names[index].stats.follows = true;
            return true;
          }
          return false;
        });
      });
    }

    return names;
  } else {
    return { message: 'no likes!' };
  }
}
