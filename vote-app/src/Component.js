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
  & * {
    padding: 3px 0px;
  }

  background-color: white;
  &:hover {
    cursor: pointer;
  }

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const FilmRow = styled(Row)`
  border-style: solid;
  ${props => props.selected ? `
    padding: 6px 9px;
    border-color: lightgreen;
    border-width: 9px;
  ` : `
    padding: 14px 17px;
    border-color: black;
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

const Submit = styled.button`
  font-size: 20px;
  background-color: white;
  color: black;
  border-color: black;
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

const FilmPreview = styled.img`
  display: block;
  width: 100%;
`;

const FilmTitle = styled.div`
  text-align: left;
  font-size: 18px;
  font-weight: bold;
`;

const FilmDescription = styled.div`
  text-align: left;
  font-size: 16px;
`;

const InternalWarning = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: red;
  &::after {
    content: "INTERNAL USE ONLY";
  }
`;

const AnalyticsTable = styled.table`
  margin: 0px auto;
  border-collapse: collapse;
  &, th, td {
    text-align: center;
    border: 1px solid black;
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
  EventTitle,
  Submit,
  SaveMessage,
  FilmContainer,
  FilmPreview,
  FilmTitle,
  FilmDescription,
  InternalWarning,
  AnalyticsTable,
}
