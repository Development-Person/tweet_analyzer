import './style.css';

const submitButton = document.getElementById('submit-button');
const tweetBox = document.getElementById('tweet');
const usersDiv = document.getElementById('users');

async function queryTwitterServer() {
  usersDiv.innerHTML = '';

  const serverURL = new URL('http://localhost:9000/tweet');
  const tweetURL = tweetBox.value;
  const tweetURLSplit = tweetURL.split('/');
  const tweetID = tweetURLSplit[tweetURLSplit.length - 1];
  const params = [['tweet', `${tweetID}`]];
  serverURL.search = new URLSearchParams(params).toString();

  const response = await (await fetch(serverURL)).json();

  if (response.message !== 'none') {
    for (const user of response) {
      const userDiv = document.createElement('div');
      userDiv.innerHTML = user.name;
      userDiv.classList.add('col');
      userDiv.classList.add('p-2');
      userDiv.classList.add('m-2');
      usersDiv.appendChild(userDiv);
    }
  } else {
    const noLikes = document.createElement('div');
    noLikes.innerHTML = 'No likes 😭';
    usersDiv.appendChild(noLikes);
  }
}

submitButton.addEventListener('click', (event) => {
  event.preventDefault();
  queryTwitterServer();
});
