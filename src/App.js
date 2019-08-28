import React, { Component } from 'react'
import uuid from 'uuid';

 
 class App extends Component {
  
  state = { 
    value: '',
    musicbrainzResults: []
   };

 

  handleChange = (event) => {
   this.setState({ value: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:9000/api/v1/search/${this.state.value}`)
    .then(res => res.json())
    .then(results => {
      this.setState({ musicbrainzResults: results })
    })
  };

  renderRows = () => {
    const { musicbrainzResults } = this.state
     let rows = [];
     let i = 0;
     if (musicbrainzResults.titles || musicbrainzResults.names) {
      while (i < musicbrainzResults.titles.length && i < musicbrainzResults.artists.length) {
        rows.push(
          <tr key={musicbrainzResults.id[i]}>
            <td style = {{textAlign: "center"}} 
            onClick={this.getSelectedSong} value={musicbrainzResults.id[i]}>{musicbrainzResults.titles[i]}</td> 
            <td style = {{textAlign: "center"}}>{musicbrainzResults.artists[i]}</td>
          </tr>
        )
        i++;
       }
       return rows;
    }
  }

  getSelectedSong = (event) => {
    const id = event.currentTarget.getAttribute('value')
    const title = event.currentTarget.innerText
    const artist = event.currentTarget.nextElementSibling.innerText
    fetch(`http://localhost:9000/api/v1/selected/`, {
      method: 'POST', 
      headers: {
        "Content-Type": "application/json",
        "Accepted": "application/json" 
      },
      body: JSON.stringify({
        recording_id: id,
        artist: artist,
        title: title
      })
    })
    .then(res => res).then(console.log)
  }
    
  render() {
    const { musicbrainzResults } = this.state
    return (
      <>
      <div>
        <form onSubmit={this.handleSubmit}>
            <label>
              Search: 
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
              <input type="submit" value="Submit" />
        </form>
      </div>
      <div>
        <table>
          <thead>
            <th style={{textDecoration: "underline"}}>Titles</th>
            <th style={{textDecoration: "underline"}}>Artists</th>
          </thead>
          <tbody>
            {this.renderRows()}
          </tbody>
        </table>
     
      </div>
      </>
    )
   } 
} 

export default App; 

 

