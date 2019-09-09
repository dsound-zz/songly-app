import React, { Component } from 'react'

class App extends Component {
  
  state = { 
    value: '',
    wikiResults: [],
    wikiSelected: ""
   };

  handleChange = (event) => {
   this.setState({ value: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:9000/api/v1/search/${this.state.value}`)
    .then(res => res.json())
    .then(results => {
      this.setState(prevState => ({ 
        wikiResults:  results, ...prevState.wikiResults  }));
    })
  };
  
  handleSelect = (pageId) => {
    fetch(`http://localhost:9000/api/v1/selected/${pageId}`)
    .then(res => res.json())
    .then(results => {
      this.setState({ wikiSelected: results[0]['extract'] })
    })
  };

   renderList = () => {
     return (
       this.state.wikiResults.map((wiki) => {
        return <div key={wiki.pageid} onClick={() => this.handleSelect(wiki.pageid)}>
          <h1>{wiki.title}</h1>
        </div>
     })
    )}


   render() {
    console.log(this.state.wikiSelected)
 
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
     
      <div>{this.renderList()}</div>

      <div>{this.state.wikiSelected}</div>
      </>
    )
   } 
} 

export default App; 

 

