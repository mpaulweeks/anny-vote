import React from 'react';

import API from './API';
import EventWeekStats from './EventWeekStats';
import {
  Loading,
  CenterRow,
  FlexColumnRow,
  Logo,
  InternalWarning,
  ScreeningTitle,
} from './Component';


function compareFilms(a,b) {
  if (a.votes < b.votes)
    return -1;
  if (a.votes > b.votes)
    return 1;
  return 0;
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

        <FlexColumnRow>
          {eventVoteData.map(weekData => (
            <EventWeekStats
              key={weekData.id}
              weekData={weekData}
            ></EventWeekStats>
          ))}
        </FlexColumnRow>

        <CenterRow>
          <div>omitted:</div>
          <br/>
          {eventData.films.map(f => !f.hide ? '' : (
            <div key={f.id}>{f.name}</div>
          ))}
        </CenterRow>
      </div>
    )
  }
}

export default EventStatsApp;
