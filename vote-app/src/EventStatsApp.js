import React from 'react';

import API from './API';
import VoteFilm from './VoteFilm';
import {
  Loading,
  CenterRow,
  Logo,
  InternalWarning,
  ScreeningTitle,
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

class EventWeekStats extends React.Component {
  render() {
    const { weekData } = this.props;
    const { id, count, films, totalVotes } = weekData;
    const avgVotes = (totalVotes / count).toFixed(1);
    return (
      <div>
        <CenterRow>
          <SaveMessage>
            Week of { id }
          </SaveMessage>
          <SaveMessage>
            Number of Participants: { count }
          </SaveMessage>
          <SaveMessage>
            Total Votes: { totalVotes }
          </SaveMessage>
          <SaveMessage>
            Average Votes Per User: { avgVotes }
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
          {films.map(f => f.hide ? '' : (
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
    );
  }
}

class EventStatsApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventData: null,
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
    eventVoteData.forEach(weekData => {
      const films = [];
      let totalVotes = 0;
      eventData.films.forEach(f => {
        const votes = weekData.votes[f.id] || 0;
        films.push({
          ...f,
          votes: votes,
        });
        totalVotes += votes;
      });
      films.sort(compareFilms).reverse();

      weekData.totalVotes = totalVotes;
      weekData.films = films;
    });
    this.setState({
      eventData: eventData,
      eventVoteData: eventVoteData,
    });
  }
  render() {
    const { eventData, eventVoteData } = this.state;
    if (!eventData){
      return <Loading></Loading>;
    }
    return (
      <div>
        <CenterRow>
          <InternalWarning></InternalWarning>
          <Logo />
          <ScreeningTitle event={eventData.event}></ScreeningTitle>
        </CenterRow>

        {eventVoteData.map(weekData => (
          <EventWeekStats
            key={weekData.id}
            weekData={weekData}
          ></EventWeekStats>
        ))}

        <CenterRow>
          <div>omitted:</div>
          <ul>
          {eventData.films.map(f => !f.hide ? '' : (
            <li key={f.id}>{f.name}</li>
          ))}
          </ul>
        </CenterRow>
      </div>
    )
  }
}

export default EventStatsApp;
