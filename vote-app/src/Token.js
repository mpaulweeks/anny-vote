import API from './API'

class Token {
  constructor(cookies){
    this.cookies = cookies
  }
  newToken(){
    // https://stackoverflow.com/a/2117523/6461842
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      // eslint-disable-next-line
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
  }
  saveToken(token){
    this.cookies.set('token', token)
  }
  ensure(eventId){
    const self = this
    const token = self.cookies.get('token')

    if (token){
      return new Promise((resolve, reject) => {
        API.fetchOldVotes(eventId, token)
          .then(votes => resolve({
            token: token,
            votes: votes,
          }))
          .catch(err => resolve({
            token: token,
            votes: {},
          }))
      });
    } else {
      return new Promise((resolve, reject) => {
        resolve({
          token: self.newToken(),
          votes: {},
        })
      })
    }
  }
}

export default Token
