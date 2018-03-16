import React from 'react';
import styled from 'styled-components';

import API from './API'
import Token from './Token'
import VoteFilm from './VoteFilm'


const Container = styled.div`
  padding: 9px;
  background-color: #B0B0B0;
`;

class VoteApp extends React.Component {
  constructor(props) {
    super(props)
    this.tokenManager = new Token(props.cookies)
    this.state = {
      eventData: null,
      voteData: null,
    }
  }
  componentDidMount() {
    const self = this
    API.fetchLatestEvent().then(eventData => {
      self.tokenManager.ensure(eventData.event.id).then(tokenData => {
        self.setState({
          token: tokenData.token,
          eventData: eventData,
          voteData: tokenData.votes,
        })
      })
    })
  }
  onFilmToggle(filmId) {
    const { eventData, voteData } = this.state;
    const newVotes = {};
    eventData.films.forEach(f => {
      if (f.id === filmId){
        newVotes[f.id] = !voteData[f.id];
      } else {
        newVotes[f.id] = voteData[f.id];
      }
    })
    this.setState({
      voteData: newVotes,
    })
  }
  onSubmit() {
    const { eventData, token, voteData } = this.state;
    this.tokenManager.saveToken(token);
    API.recordVotes(eventData.event.id, token, voteData)
      .then(data => {
        console.log(data);
      })
  }
  render() {
    window.state = this.state;
    const { eventData, voteData } = this.state;
    if (!eventData){
      return (
        <div>
          loading...
        </div>
      )
    }
    return (
      <Container>
        {eventData.films.map(f => (
          <VoteFilm
            key={f.id}
            data={f}
            selected={voteData[f.id] || false}
            onClick={() => this.onFilmToggle(f.id)}
          >
          </VoteFilm>
        ))}
        <button onClick={() => this.onSubmit()}>
          SUBMIT
        </button>
      </Container>
    );
  }
}

export default VoteApp
