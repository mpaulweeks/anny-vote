import React from 'react';
import styled from 'styled-components';

import API from './API'
import Token from './Token'
import VoteFilm from './VoteFilm'


const Container = styled.div`
  padding: 5px;
  background-color: #B0B0B0;
`;

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
  onFilmToggle(filmId) {
    const { eventData, voteData } = this.state
    const newVoteData = {}
    eventData.films.forEach(f => {
      if (f.id === filmId){
        newVoteData[f.id] = !voteData[f.id];
      } else {
        newVoteData[f.id] = voteData[f.id];
      }
    })
    this.setState({
      voteData: newVoteData,
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
      </Container>
    );
  }
}

export default VoteApp
