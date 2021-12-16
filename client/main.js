import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import bootstrap from 'bootstrap/dist/js/bootstrap.min.js';
let storedQueryResponse;
let storedSortedList;
let winner;

const submitButton = document.getElementById('submit-button');
const tweetBox = document.getElementById('tweet');
const usersDiv = document.getElementById('users');
const entryCount = document.getElementById('entry-count');
const entryCountPara = document.createElement('p');
entryCount.appendChild(entryCountPara);

const likeToggle = document.getElementById('like');
const retweetToggle = document.getElementById('retweet');
const followToggle = document.getElementById('follow');

const compButtonDiv = document.getElementById('comp-button-div');
const compButton = document.createElement('button');
compButton.textContent = 'Choose Winner!';
compButton.id = 'comp-button';
compButton.classList.add('btn');
compButton.classList.add('btn-primary');
compButton.addEventListener('click', (event) => {
  event.preventDefault();
  winner = chooseWinner();
});

const toggles = Array.from(document.getElementsByClassName('toggle'));
toggles.forEach((toggle) => {
  toggle.addEventListener('click', (event) => {
    event.preventDefault();
    winner = '';
    toggle.classList.toggle('toggle-active');
    storedSortedList = sortList(storedQueryResponse);
    createHTMLList(storedSortedList);
    if (storedSortedList && storedSortedList.length) {
      compButtonDiv.appendChild(compButton);
    }
  });
});

function createHTMLList(sortedList) {
  if (sortedList && sortedList.length) {
    entryCountPara.innerText = ``;
    usersDiv.innerHTML = '';
    entryCountPara.innerText = `${sortedList.length} valid entries!`;

    for (const user of sortedList) {
      const userDiv = document.createElement('div');
      const userLink = document.createElement('a');
      userLink.setAttribute('target', '_blank');
      userLink.innerText = user.name;
      userLink.title = user.name;
      userLink.classList.add('btn');
      userLink.href = `https://twitter.com/${user.name}`;
      userLink.classList.add('btn-outline-primary');
      userDiv.appendChild(userLink);
      userDiv.classList.add('col');
      userDiv.classList.add('p-2');
      userDiv.classList.add('m-2');
      usersDiv.appendChild(userDiv);
    }
  }
}

function sortList(list) {
  if (list && list.length > 0) {
    const sortedList = [];
    const like = likeToggle.classList.contains('toggle-active') ? true : false;
    const retweet = retweetToggle.classList.contains('toggle-active')
      ? true
      : false;
    const follow = followToggle.classList.contains('toggle-active')
      ? true
      : false;

    const toggleArray = [like, retweet, follow];

    for (const user of list) {
      const userArray = [
        user.stats.liked,
        user.stats.retweeted,
        user.stats.follows,
      ];

      if (toggleArray.toString() === userArray.toString()) {
        sortedList.push(user);
      }
    }

    return sortedList;
  } else {
    return;
  }
}

async function queryTwitterServer() {
  usersDiv.innerHTML = '';

  const serverURL = new URL(
    `http://tweetcomp.herokuapp.com/:${process.env.PORT}/tweet`
  );
  const tweetURL = tweetBox.value;
  const tweetURLSplit = tweetURL.split('/');
  const tweetID = tweetURLSplit[tweetURLSplit.length - 1];
  const params = [['tweet', `${tweetID}`]];
  serverURL.search = new URLSearchParams(params).toString();

  const response = await (await fetch(serverURL)).json();
  storedQueryResponse = response;

  if (response.message !== 'no likes!') {
    winner = '';
    storedSortedList = sortList(response);
    createHTMLList(storedSortedList);

    if (storedSortedList && storedSortedList.length) {
      compButtonDiv.appendChild(compButton);
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

function chooseWinner() {
  const entries = storedSortedList.length;
  const winningIndex = Math.floor(Math.random() * entries);

  const modalContainer = document.getElementById('modal-container');

  modalContainer.innerHTML = `<div id='winner-modal' class="modal">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">The winner is ${storedSortedList[winningIndex].name}!</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <a href="https://twitter.com/${storedSortedList[winningIndex].name}" target="_blank">Tell them they won!</a>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>`;

  const modalOptions = {};

  const winnerModal = new bootstrap.Modal(
    document.getElementById('winner-modal'),
    modalOptions
  );

  winnerModal.toggle();

  console.log(`The winner is ${storedSortedList[winningIndex].name}!`);
}
