import React from 'react';

import API from './API'
import Token from './Token'
import VoteFilm from './VoteFilm'

import {
  Loading,
  Container,
  Logo,
  ScreeningTitle,
  EventTitle,
  CenterRow,
  FilmContainer,
  Submit,
  SaveMessage,
} from './Component';

class VoteApp extends React.Component {
  constructor(props) {
    super(props)
    this.tokenManager = new Token(props.cookies)
    this.state = {
      eventData: null,
      voteData: null,
      voteLoading: false,
      voteSuccess: false,
    }
  }
  componentDidMount() {
    const self = this
    API.fetchUrlEvent().then(eventData => {
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
    const self = this
    self.tokenManager.saveToken(token);
    self.setState({
      voteLoading: true,
      voteSuccess: false,
    });
    API.recordVotes(eventData.event.id, token, voteData)
      .then(data => {
        console.log(data);
        self.setState({
          voteLoading: false,
          voteSuccess: true,
        });
      })
  }
  render() {
    window.state = this.state;
    const { eventData, voteData, voteLoading, voteSuccess } = this.state;
    if (!eventData){
      return <Loading></Loading>;
    }
    return (
      <Container>
        <CenterRow>
          <Logo />
          <ScreeningTitle event={eventData.event}></ScreeningTitle>
          <EventTitle>Audience Poll</EventTitle>
          <SaveMessage>
            <br/>
            Click on all of the films you liked
            <br/>
            Then at the bottom, click Save.
          </SaveMessage>
        </CenterRow>

        <FilmContainer>
          {eventData.films.map(f => f.hide ? '' : (
            <VoteFilm
              key={f.id}
              data={f}
              selected={voteData[f.id] || false}
              onClick={() => this.onFilmToggle(f.id)}
            >
            </VoteFilm>
          ))}
        </FilmContainer>

        <CenterRow>
          {voteLoading && (
            <SaveMessage>
              saving votes...
            </SaveMessage>
          )}
          {voteSuccess && (
            <SaveMessage>
              your vote was recorded!
              <br/>
              <br/>
              feel free to change your votes later in the program and hit save again
              <br/>
              <br/>
            </SaveMessage>
          )}
          {!voteLoading && (
            <Submit onClick={() => this.onSubmit()}>
              SAVE
            </Submit>
          )}
        </CenterRow>
      </Container>
    );
  }
}

export default VoteApp
