import React from 'react';

import {
  FilmRow,
  FilmPreview,
  FilmTitle,
  FilmDescription,
  FilmSelected,
} from './Component';

class VoteFilm extends React.Component {
  render() {
    const { data, selected, onClick } = this.props;
    return (
      <FilmRow selected={selected} onClick={onClick}>
        <FilmPreview selected={selected} src={data.image_url}></FilmPreview>
        <FilmTitle>{data.name}</FilmTitle>
        <FilmDescription>{data.description}</FilmDescription>
      </FilmRow>
    )
  }
}

export default VoteFilm;
