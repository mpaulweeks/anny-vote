import React from 'react';
import styled from 'styled-components';

const Loading = styled.div`
  text-align: center;
  margin-top: 100px;
  &::after {
    content: "loading, please wait...";
  }
`;

const Container = styled.div`
  padding: 9px 9px;
`;

const Row = styled.div`
  max-width: 400px;
  margin-top: 0px;
  margin-bottom: 9px;
  margin-left: auto;
  margin-right: auto;
  &:last-child {
    margin-bottom: 0px;
  }
  padding: 16px 18px;

  &:hover {
    cursor: pointer;
  }

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SubRow = styled.div`
  padding: 3px 0px;
`;

const FilmRow = styled(Row)`
  border-style: solid;
  ${props => props.selected ? `
    padding: 6px 9px;
    border-color: var(--selected);
    border-width: 9px;
  ` : `
    padding: 14px 17px;
    border-color: var(--foreground);
    border-width: 1px;
  `}
`

const CenterRow = styled(Row)`
  text-align: center;
  & img {
    margin: 0px auto;
  }
`;

const Logo = styled.img`
  display: block;
  max-width: 300px;
`;

const EventTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

class ScreeningTitle extends React.Component {
  render() {
    const { event } = this.props;
    const url = `http://www.animationnights.com/${event.slug}/`;
    return (
      <EventTitle>
        Screening <a href={url}>#{event.number}</a>
      </EventTitle>
    );
  }
}

const Submit = styled.button`
  font-size: 20px;
  background-color: var(--background);
  color: var(--foreground);
  border-color: var(--foreground);
  border-style: solid;
  border-width: 2px;
  padding: 6px 12px;
  box-shadow: 2px 2px;
`;

const SaveMessage = styled.div`
  font-size: 16px;
`;

const FilmContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  margin-bottom: 9px;
`;

const FilmPreviewContainer = styled(SubRow)`
  position: relative;
  width: 100%;
`;

const FilmPreviewImage = styled.img`
  display: block;
  width: 100%;
  height: auto;
`;

const FilmSelected = styled.div`
  position: absolute;
  top: 8px; /* +3 for SubRow padding */
  right: 5px;
  padding: 0px;

  width: 50px;
  height: 50px;
  background-size: cover;
  background-image: url('checkmark.png');
`;

class FilmPreview extends React.Component {
  render () {
    const { src, selected } = this.props;
    return (
      <FilmPreviewContainer>
        <FilmPreviewImage src={src} />
        { selected && <FilmSelected></FilmSelected> }
      </FilmPreviewContainer>
    )
  }
}

const FilmTitle = styled(SubRow)`
  text-align: left;
  font-size: 18px;
  font-weight: bold;
`;

const FilmDescription = styled(SubRow)`
  text-align: left;
  font-size: 16px;
`;

const InternalWarning = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: var(--warning);
  &::after {
    content: "INTERNAL USE ONLY";
  }
`;

const AnalyticsTable = styled.table`
  margin: 0px auto;
  border-collapse: collapse;
  &, th, td {
    text-align: center;
    border: 1px solid var(--foreground);
  }
  th {
    padding: 5px;
  }
`;

export {
  Loading,
  Container,
  Row,
  FilmRow,
  CenterRow,
  Logo,
  ScreeningTitle,
  EventTitle,
  Submit,
  SaveMessage,
  FilmContainer,
  FilmPreview,
  FilmTitle,
  FilmDescription,
  FilmSelected,
  InternalWarning,
  AnalyticsTable,
}
