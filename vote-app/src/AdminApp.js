import React from 'react';

import API from './API';
import {
  Loading,
  CenterRow,
  Logo,
  Submit,
  InternalWarning,
  AdminEventRow,
  AdminEventTitle,
  AdminEventLinks,
} from './Component';


function compareEvents(a,b) {
  if (a.number < b.number)
    return -1;
  if (a.number > b.number)
    return 1;
  return 0;
}

class AdminApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventsData: null,
      scraping: false,
    }
  }
  componentDidMount() {
    const self = this
    API.fetchAllEvents().then(eventsData => {
      self.processVotes(eventsData);
    })
  }
  processVotes(eventsData){
    eventsData.sort(compareEvents).reverse();
    this.setState({
      eventsData: eventsData,
    });
  }
  scrape(){
    this.setState({
      scraping: true,
    });
    API.scrape().then(res => {
      const message = `${res.length} new events found`;
      window.alert(message, res);
      window.location.reload();
    });
  }
  render() {
    const { eventsData, scraping } = this.state;
    if (!eventsData){
      return <Loading></Loading>;
    }
    return (
      <div>
        <CenterRow>
          <InternalWarning></InternalWarning>
          <Logo />
          {scraping ? (
            <p>
              scraping, this could take a while...
            </p>
          ) : (
            <Submit onClick={() => this.scrape()}>
              Scrape for new events
            </Submit>
          )}
        </CenterRow>
        { eventsData.map((e, i) => (
          <AdminEventRow key={i}>
            <AdminEventTitle>
              screening #{e.number}
            </AdminEventTitle>
            <AdminEventLinks>
              <a href={`http://www.animationnights.com/${e.slug}/`}>ANNY page</a>
              <a href={`/event/${e.number}/`}>vote</a>
              <a href={`/stats/event/${e.number}/`}>stats</a>
            </AdminEventLinks>
          </AdminEventRow>
        ))}
      </div>
    )
  }
}

export default AdminApp;
