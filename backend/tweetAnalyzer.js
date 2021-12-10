import { getLikes, getRetweets } from './twitter_api.js';

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
          tagged: false,
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
              tagged: false,
            },
          });
        }
      });
    }

    console.log(names);

    return names;
  } else {
    return { message: 'no likes!' };
  }
}
