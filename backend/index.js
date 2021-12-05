import express from 'express';
import cors from 'cors';
import { getTweetData } from './tweetAnalyzer.js';
const app = express();
app.use(cors());
const port = 9000;

app.get('/tweet', (req, res) => {
  const tweet = req.query.tweet;
  getTweetData(tweet).then((data) => {
    res.send(data);
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
