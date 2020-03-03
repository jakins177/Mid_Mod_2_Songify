import { UserConsumerFP } from './userContext'
import "../App.css";

import React, { Component } from 'react'

export default class PlaylistSongs extends Component {
    render() {
        return   (
            <div>
                <div>
                <h2>Songs</h2>
                <br/>
                </div>
                 <UserConsumerFP>
                {
                    (data) => {
                        return <div>
                         
                            {
                data.map(same => {
              return <div >
                  <a href = {same.track.preview_url} target="_blank" >
                <h2>{same.track.name}</h2>
                <img src={same.track.album.images[0].url}/>
                </a> 
                    <br/>
               </div>
            })
          }            
                        </div>
                    }
                }
             
                </UserConsumerFP>
    
    
                  
                
            </div>
        )
    }
}

