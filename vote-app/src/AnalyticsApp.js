import React from 'react';

import API from './API';
import VoteFilm from './VoteFilm';
import {
  Loading,
  CenterRow,
  Logo,
  InternalWarning,
  EventTitle,
  SaveMessage,
  AnalyticsTable,
} from './Component';


function compareFilms(a,b) {
  if (a.votes < b.votes)
    return -1;
  if (a.votes > b.votes)
    return 1;
  return 0;
}

class AnalyticsApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventData: null,
      eventVoteData: null,
    }
  }
  componentDidMount() {
    const self = this
    API.fetchUrlEvent().then(eventData => {
      API.fetchEventVotes(eventData.event.id).then(eventVoteData => {
        self.processVotes(eventData, eventVoteData);
      })
    })
  }
  processVotes(eventData, eventVoteData){
    const films = [];
    eventData.films.forEach(f => {
      const votes = eventVoteData.votes[f.id] || 0;
      films.push({
        ...f,
        votes: votes,
      });
    });
    films.sort(compareFilms).reverse();
    this.setState({
      eventData: eventData,
      eventVoteData: eventVoteData,
      orderedFilms: films,
    });
  }
  render() {
    const { eventData, eventVoteData, orderedFilms } = this.state;
    if (!eventData){
      return <Loading></Loading>;
    }
    return (
      <div>
        <CenterRow>
          <InternalWarning></InternalWarning>
          <Logo src='anny.png' />
          <EventTitle>
            Screening #{eventData.event.number}
          </EventTitle>
          <SaveMessage>
            total votes: {eventVoteData.count}
          </SaveMessage>
        </CenterRow>
        <AnalyticsTable>
          <thead>
            <tr>
              <th>votes</th>
              <th>film</th>
            </tr>
          </thead>
          <tbody>
          {orderedFilms.map(f => (
            <tr key={f.id}>
              <td>{f.votes}</td>
              <td>
                <VoteFilm data={f}></VoteFilm>
              </td>
            </tr>
          ))}
          </tbody>
        </AnalyticsTable>
      </div>
    )
  }
}

export default AnalyticsApp;
