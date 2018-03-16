import React from 'react';

import {
  Row,
  FilmPreview,
  FilmTitle,
  FilmDescription,
} from './Component';

class VoteFilm extends React.Component {
  render() {
    const { data, selected, onClick } = this.props;
    return (
      <Row selected={selected} onClick={onClick}>
        <FilmPreview src={data.image_url} />
        <FilmTitle>{data.name}</FilmTitle>
        <FilmDescription>{data.description}</FilmDescription>
      </Row>
    )
  }
}

export default VoteFilm;
