import React, { Component } from "react";
import * as $ from "jquery";
import { authEndpoint, clientId, redirectUri, scopes, mariaID } from "./config_example";
import hash from "./hash";
import Player from "./Player";
//import ArtistAlbum from "./ArtistAlbum"
import logo from "./logo.svg";
import "./App.css";

import {
  UserProvider
} from './components/userContext';

import FeaturedPlaylist from './components/FeaturedPlaylist';

const FEATURED_PLAYLISTS = "https://api.spotify.com/v1/browse/featured-playlists";

class App extends Component {
  constructor() {
    super();
    
    this.state = {
      data: {},
      items:[],
      featuredPlaylistItem:[]
    }
    // this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
  }
  componentDidMount() {
    // Set token
    let _token = hash.access_token;

    if (_token) {
      // Set token
      this.setState({
        token: _token
      });
      this.getFeaturedPlaylist(_token);
    }
  }



  getArtistAlbums(token) {
    // Make a call using the token
    console.log("MY TOKEN IS " + token);
    $.ajax({
      
      url: FEATURED_PLAYLISTS ,
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: data => {
        console.log(data);
        this.setState({
          data: data,
          items: data.items

        });

        this.filterDuplicates();

      }
    });
  }

  getFeaturedPlaylist(token) 
  {
   
    $.ajax({
      
      url: FEATURED_PLAYLISTS ,
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: data => {
        console.log(data.playlists.items);
        this.setState({
          data: data,
          featuredPlaylistItem: data.playlists.items

        });

        console.log(this.state.featuredPlaylistItem);
  
      }
    });


  }

  render() {

    console.log(this.state.items);

    return (
      <div className="App">
        <header className="App-header">
          <div>
          <h1>Songify</h1>
          <br/>
          </div>
          {!this.state.token && (
            <a
              className="btn btn--loginApp-link"
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                "%20"
              )}&response_type=token&show_dialog=true`}
            >
              Login to Spotify
            </a>
          )}
          {this.state.token && (
          
             <UserProvider value = {this.state.featuredPlaylistItem}>
    

            <FeaturedPlaylist accessToken = {this.state.token} />

            </UserProvider>

          )}
        </header>
      </div>
    );
  }
}

export default App;
