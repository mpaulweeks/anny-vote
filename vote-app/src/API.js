
const BASE = (
  window.location.hostname === 'localhost' ?
  'http://localhost:5400' :
  ''
) + '/api';

function handleResponse(response){
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
}
function handleError(err){
  console.log('API error!', err);
  throw err;
}

function fetchOldVotes(eventId, token){
  const settings = {
    cache: "no-store",
  };
  return fetch(`${BASE}/event/${eventId}/user/${token}/votes`, settings)
    .then(handleResponse)
    .catch(handleError)
}

function fetchLatestEvent(){
  const settings = {
    cache: "no-store",
  };
  return fetch(`${BASE}/event/latest`, settings)
    .then(handleResponse)
    .catch(handleError)
}

function fetchEvent(number){
  return fetch(`${BASE}/event/number/${number}`)
    .then(handleResponse)
    .catch(handleError)
}

function fetchUrlEvent(){
  const path = window.location.pathname;
  if (path.includes('/event/')){
    const number = path.split('/event/')[1].split('/')[0];
    return fetchEvent(number);
  } else {
    return fetchLatestEvent();
  }
}

function fetchAllEvents(){
  return fetch(`${BASE}/events`)
    .then(handleResponse)
    .catch(handleError)
}

function recordVotes(eventId, token, voteData){
  const settings = {
    cache: "no-store",
    method: 'POST',
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({
      payload: voteData,
    }),
  };
  return fetch(`${BASE}/event/${eventId}/user/${token}/votes`, settings)
    .then(handleResponse)
    .catch(handleError)
}

function fetchEventVotes(eventId){
  const settings = {
    cache: "no-store",
  };
  return fetch(`${BASE}/event/${eventId}/votes`, settings)
    .then(handleResponse)
    .catch(handleError)
}

function crawl(){
  const settings = {
    cache: "no-store",
    method: 'POST',
  };
  return fetch(`${BASE}/crawl`, settings)
    .then(handleResponse)
    .catch(handleError)
}

function scrape(body){
  const settings = {
    cache: "no-store",
    method: 'POST',
    body: JSON.stringify(body),
  };
  return fetch(`${BASE}/scrape`, settings)
    .then(handleResponse)
    .catch(err => {
      console.log(err);
      throw err;
    })
}

export default {
  fetchOldVotes,
  fetchUrlEvent,
  fetchAllEvents,
  recordVotes,
  fetchEventVotes,
  crawl,
  scrape,
}
