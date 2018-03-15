import React from 'react';

import API from './API'
import Token from './Token'
import VoteFilm from './VoteFilm'

class VoteApp extends React.Component {
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
        {eventData.films.map(f => (
          <VoteFilm key={f.id} data={f} selected={voteData[f.id] || false}>
          </VoteFilm>
        ))}
      </div>
    );
  }
}

export default VoteApp
