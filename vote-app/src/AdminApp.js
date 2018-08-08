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
  InputCustomUrl,
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
      crawling: false,
      crawlError: null,
      crawlResults: null,
      scraping: false,
      scrapeResults: null,
      scrapingCustom: false,
      scrapeCustomResults: null,
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
  crawl(){
    this.setState({
      crawling: true,
    }, () => {
      API.crawl().then(res => {
        console.log('then')
        this.setState({
          crawling: false,
          crawlError: null,
          crawlResults: res,
        });
      }).catch(err => {
        console.log('catch')
        this.setState({
          crawling: false,
          crawlError: err.toString(),
          crawlResults: null,
        });
      })
    });
  }
  scrape(){
    this.setState({
      scraping: true,
    }, () => {
      API.scrape().then(res => {
        this.setState({
          scraping: false,
          scrapeResults: res,
        });
      });
    });
  }
  scrapeCustomUrl(){
    const url = this.scrapeCustomInput.value;
    this.setState({
      scrapingCustom: true,
    }, () => {
      API.scrapeCustomUrl(url).then(res => {
        this.setState({
          scrapingCustom: false,
          scrapeCustomResults: res,
        });
      });
    });
  }
  render() {
    const {
      eventsData,
      crawling,
      crawlError,
      crawlResults,
      scraping,
      scrapeResults,
      scrapingCustom,
      scrapeCustomResults,
    } = this.state;
    if (!eventsData){
      return <Loading></Loading>;
    }
    return (
      <div>
        <CenterRow>
          <InternalWarning />
          <Logo />


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

          <h2>Crawl for scrapable pages</h2>
          {crawling ? (
            <p>
              crawling, this could take a while...
            </p>
          ) : (
            <Submit onClick={() => this.crawl()}>
              Crawl for new event pages
            </Submit>
          )}
          { crawlError && (
            <p>
              There was an error: { crawlError }
            </p>
          )}
          { crawlResults && (
            <div>
              <strong> Found the following event URLs: </strong>
              { crawlResults.map((url, i) => (
                <div key={'crawl-'+i}> {url} </div>
              ))}
            </div>
          )}


          <h2>Scrape the auto-crawl pages</h2>
          {scraping ? (
            <p>
              scraping, this could take a while...
            </p>
          ) : (
            <Submit onClick={() => this.scrape()}>
              Scrape for new events
            </Submit>
          )}
          { scrapeResults && <p> { JSON.stringify(scrapeResults) } </p> }


          <h2>Try to scrape a custom url</h2>
          {scrapingCustom ? (
            <p>
              scraping, this could take a while...
            </p>
          ) : (
            <div>
              <div>
                <InputCustomUrl innerRef={ref => this.scrapeCustomInput = ref} />
              </div>
              <br/>
              <Submit onClick={() => this.scrapeCustomUrl()}>
                Scrape custom URL
              </Submit>
            </div>
          )}
          { scrapeCustomResults && <p> { JSON.stringify(scrapeCustomResults) } </p> }


        </CenterRow>
      </div>
    )
  }
}

export default AdminApp;
