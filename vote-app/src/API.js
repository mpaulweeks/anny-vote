
const BASE = (
  window.location.hostname === 'localhost' ?
  'http://localhost:5400' :
  ''
) + '/api';

function fetchOldVotes(eventId, token){
  const settings = {
    cache: "no-store",
  };
  return fetch(`${BASE}/event/${eventId}/user/${token}/votes`, settings)
    .then(resp => resp.json())
    .catch(err => {
      console.log(err);
      return err;
    })
}

function fetchLatestEvent(){
  const settings = {
    cache: "no-store",
  };
  return fetch(`${BASE}/event/latest`, settings)
    .then(resp => resp.json())
    .catch(err => {
      console.log(err);
      return err;
    })
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
    .then(resp => resp.json())
    .catch(err => {
      console.log(err);
      return err;
    })
}

function fetchEventVotes(eventId){
  const settings = {
    cache: "no-store",
  };
  return fetch(`${BASE}/event/${eventId}/votes`, settings)
    .then(resp => resp.json())
    .catch(err => {
      console.log(err);
      return err;
    })
}

export default {
  fetchOldVotes,
  fetchLatestEvent,
  recordVotes,
  fetchEventVotes,
}
