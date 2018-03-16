
const BASE = 'http://localhost:6200/api'

function fetchOldVotes(eventId, token){
  return fetch(`${BASE}/event/${eventId}/user/${token}/votes`)
    .then(resp => resp.json())
    .catch(err => {
      console.log(err);
      return err;
    })
}

function fetchLatestEvent(){
  return fetch(`${BASE}/event/latest`)
    .then(resp => resp.json())
    .catch(err => {
      console.log(err);
      return err;
    })
}

function recordVotes(eventId, token, voteData){
  const settings = {
    method: 'POST',
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({
      payload: voteData,
    }),
  }
  return fetch(`${BASE}/event/${eventId}/user/${token}/votes`, settings)
    .then(resp => resp.json())
    .catch(err => {
      console.log(err);
      return err;
    })
}

function fetchEventVotes(eventId){
  return fetch(`${BASE}/event/${eventId}/votes`)
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
