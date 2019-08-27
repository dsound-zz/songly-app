import React, { Component } from 'react'


 
 class App extends Component {
  
  state = { 
    value: '',
    discogTitles: [],
    musicbrainzTitles: [], 
    iTunesResults: []
  };

  handleChange = (event) => {
   this.setState({ value: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:9000/api/v1/search/${this.state.value}`)
    .then(res => res.json())
    .then(results => {
      this.setState({ iTunesResults: results.iTunes })
      
    })
  }

  // tracksAndArtists = (itunesTitles, itunesArtists) => {
  //   const tracksArtistList = {}
  //   itunesTitles.map
  // }
  
  
  render() {
    console.log(this.state.iTunesResults) 
    const { discogsTitles } = this.state
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
        {discogsTitles && discogsTitles.map(titles => {
          return <h3>{titles}</h3>
        })}
      </div>
      </>
    )
   } 
} 

export default App; 

 

