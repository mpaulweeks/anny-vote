import React, { Component } from 'react';

class VoteApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filmData: null,
    }
  }
  componentDidMount() {
    const self = this
    fetch('http://localhost:6200/api/event/latest')
      .then(resp => resp.json())
      .then(data => {
        self.setState({
          filmData: data,
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
  render() {
    const { filmData } = this.state
    if (!filmData){
      return (
        <div>
          loading...
        </div>
      )
    }
    return (
      <div>
        {JSON.stringify(filmData)}
      </div>
    );
  }
}

export default VoteApp;
