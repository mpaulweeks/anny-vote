import React, { Component } from 'react';

import API from './API'
import Token from './Token'

class VoteApp extends Component {
  constructor(props) {
    super(props)
    this.token = new Token(props.cookies)
    this.state = {
      eventData: null,
      voteData: null,
    }
  }
  componentDidMount() {
    const self = this
    API.fetchLatestEvent().then(eventData => {
      self.token.ensure().then(voteData => {
        self.setState({
          eventData: eventData,
          voteData: voteData,
        })
      })
    })
  }
  render() {
    const { eventData, voteData } = this.state
    if (!eventData){
      return (
        <div>
          loading...
        </div>
      )
    }
    return (
      <div>
        {JSON.stringify(eventData)}
        {JSON.stringify(voteData)}
      </div>
    );
  }
}

export default VoteApp;
