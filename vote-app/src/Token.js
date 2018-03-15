import API from './API'

function newToken(){
  // https://stackoverflow.com/a/2117523/6461842
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    // eslint-disable-next-line
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}

function ensure(){
  // todo try to read cookie
  const token = ''

  if (token){
    return API.fetchOldVotes(token)
      .then(votes => {
        return {
          token: token,
          votes: votes,
        }
      })
  } else {
    return new Promise((resolve, reject) => {
      resolve({
        token: newToken(),
        votes: {},
      })
    })
  }
}

export default {
  ensure,
}
