import React, { useEffect, useState } from "react";
import "./App.css";
import { getTokenFromUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Login from "./Login";
import Player from "./Player";

const spotify = new SpotifyWebApi();

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";

    const _token = hash.access_token;

    if (_token) {
      setToken(_token);
      window.location.hash = "loggedin";

      spotify.setAccessToken(_token);
      spotify.getMe().then((user) => {
        console.log(user);
      });
    }
  }, []);

  return (
    <div className="app">
      {token ? (
        <div>
          <Player />
          <h2>You are logged in</h2>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
