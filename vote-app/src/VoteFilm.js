import React, { Component } from 'react';

class VoteFilm extends Component {
  constructor(props){
    super(props)
    this.state = this.props
  }
  render() {
    const { data, selected } = this.state
    return (
      <div>
        {selected ? 'YES' : 'NO'}
        {data.name}
        <img src={data.image_url} />
      </div>
    )
  }
}

export default VoteFilm
