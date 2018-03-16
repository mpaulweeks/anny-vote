import React from 'react';

import {
  FilmRow,
  FilmPreview,
  FilmTitle,
  FilmDescription,
} from './Component';

class VoteFilm extends React.Component {
  render() {
    const { data, selected, onClick } = this.props;
    return (
      <FilmRow selected={selected} onClick={onClick}>
        <FilmPreview src={data.image_url} />
        <FilmTitle>{data.name}</FilmTitle>
        <FilmDescription>{data.description}</FilmDescription>
      </FilmRow>
    )
  }
}

export default VoteFilm;
