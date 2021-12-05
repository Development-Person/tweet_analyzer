import './style.css';

const url = new URL('http://localhost:9000/tweet');
const params = [['tweet', '1465123320613855238']];

url.search = new URLSearchParams(params).toString();

const response = await fetch(url)
  .then((response) => response.json())
  .then((data) => console.log(data.data));

// const data = await response.string();

// console.log(data);
