import React, { Component } from 'react'
import uuid from 'uuid';

 
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

  renderRows = () => {
     let rows = [];
      Object.entries(this.state.iTunesResults).forEach((entry, i) => {
        rows.push(
          <tr key={i}>
            <td style = {{textAlign: "center"}} 
            onClick={this.getSelectedSong} value={entry[0]}>{entry[0]}</td> 
            <td style={{textAlign: "center"}}>{entry[1]}</td>
          </tr>
        )
      })
     return rows;
  }

  getSelectedSong = (event) => {
    console.log(event.target.value)
  }
  
  
  render() {

    const { iTunesResults } = this.state
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

 

