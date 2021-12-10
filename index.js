import express from 'express';
import cors from 'cors';
import { getTweetData } from './tweetAnalyzer.js';
const app = express();
app.use(cors());
const port = process.env.PORT || 9000;

app.get('/tweet', (req, res) => {
  const tweet = req.query.tweet;
  getTweetData(tweet).then((data) => {
    res.send(data);
  });
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/dist'));
}

app.listen(port, () => {
  console.log(`Tweet comp server listening at http://localhost:${port}`);
});
