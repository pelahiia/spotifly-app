export {} 

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import SpotifyWebApi from 'spotify-web-api-node';
import lyricsSearcher from 'lyrics-searcher';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.post('/refresh', (req, res) => {
  const refreshToken = req.body.refreshToken
  const spotifyApi = new SpotifyWebApi({
    redirectUri: 'http://localhost:5173',
    clientId: 'd84eea95398744f8a8af56f1cc4aee70',
    clientSecret: '634a010cd98d40cf80d8341c350793f7',
    refreshToken,
  })

  spotifyApi
    .refreshAccessToken()
    .then(data => {
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      })
    })
      .catch(() => {
        res.sendStatus(400)
      })
});

app.post('/login', (req, res) => {
  const code = req.body.code
  const spotifyApi = new SpotifyWebApi({
    redirectUri: 'http://localhost:5173',
    clientId: 'd84eea95398744f8a8af56f1cc4aee70',
    clientSecret: '634a010cd98d40cf80d8341c350793f7',
  })

  spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in
    })
  }).catch(() => {
    res.sendStatus(400)
  })
})

app.get("/lyrics", async (req, res) => {
  const artist: any = req.query.artist;
  const track: any = req.query.track;
  
  let lyrics;

  try {
    lyrics = await lyricsSearcher(artist, track);
  } catch (error) {
    lyrics = 'No lyrics found';
  }
  res.json({ lyrics });
});

app.listen(3001, ()=> {console.log("app started on port 3001")})