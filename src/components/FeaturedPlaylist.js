
import { UserConsumer, UserProviderFP } from './userContext'

import PlaylistSongs from './PlaylistSongs'

import * as $ from "jquery";






import React, { Component } from 'react'

export default class FeaturedPlaylist extends Component {


    constructor(){
        super();
        this.buttonClicked = false;

        this.state = {
            trackList: []
          }

    }
     
    imageClicked(playlistItem)
{
    

    

    this.fetchTracksForID(playlistItem);

    this.buttonClicked = true;
}

fetchTracksForID(val){
    console.log("the track url is: " + val.tracks.href);
    $.ajax({
      
        url: val.tracks.href ,
        type: "GET",
        beforeSend: xhr => {
          xhr.setRequestHeader("Authorization", "Bearer " + this.props.accessToken);
        },
        success: data => {
          console.log(data);
          this.setState({
            trackList: data.items
          });
    
        }
      });
}

    render() {
        if(this.buttonClicked)
        {
            
            return <UserProviderFP value = {this.state.trackList}>
            {/* <Player
              item={this.state.item}
              is_playing={this.state.is_playing}
              progress_ms={this.progress_ms}
            /> */}

            <PlaylistSongs />

            </UserProviderFP>
            
            //return <div><h1>will precede to play song with item {this.state.playlistItem.id} </h1></div>
        }
        else
        {
        return (
            <div>
                <div>
                <h2>Featured Playlists</h2>
                <br/>
                </div>
               
                <UserConsumer>
                {
                    (data) => {
                        console.log(data);
                        return <div>
                            
                            {
                data.map(playlistItem => {
                    if(data.length > 1)
                    {
              return <div > 
                <h2>{playlistItem.name}</h2>
                        
                    <button onClick={()=>this.imageClicked(playlistItem)}>    
                    <img src={playlistItem.images[0].url}/>
                    </button>
                  
                    <br/>
               </div>
                    }
                    else{
                    return <div>Loading</div>
                    }
            })
          }            
                        </div>
                    }
                }
             
            </UserConsumer>
    
    
                  
                
            </div>
        )
            }
    }
}

