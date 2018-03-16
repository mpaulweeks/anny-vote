import React from 'react';

import API from './API'

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
    API.fetchLatestEvent().then(eventData => {
      API.fetchEventVotes(eventData.event.id).then(eventVoteData => {
        self.processVotes(eventData, eventVoteData);
      })
    })
  }
  processVotes(eventData, eventVoteData){
    self.setState({
      eventData: eventData,
      eventVoteData: eventVoteData,
    });
  }
  render() {
    const { eventData, eventVoteData } = this.state;
    if (!eventData){
      return (
        <div>
          loading...
        </div>
      )
    }
    return (
      <div>
        {JSON.stringify(eventVoteData)}
      </div>
    )
  }
}

export default AnalyticsApp;
