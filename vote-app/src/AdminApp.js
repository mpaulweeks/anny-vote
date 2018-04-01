import React from 'react';

import API from './API';
import {
  Loading,
  CenterRow,
  Logo,
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
  render() {
    const { eventsData } = this.state;
    if (!eventsData){
      return <Loading></Loading>;
    }
    return (
      <div>
        <CenterRow>
          <InternalWarning></InternalWarning>
          <Logo />
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
