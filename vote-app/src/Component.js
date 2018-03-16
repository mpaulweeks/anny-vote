import styled from 'styled-components';

const Container = styled.div`
  padding: 9px 9px;
  background-color: #B0B0B0;
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
  padding: 6px 9px;
  & * {
    padding: 3px 0px;
  }

  border-style: solid;
  border-color: ${props => props.selected ? 'lightgreen' : 'white'};
  border-width: 9px 9px;

  background-color: white;
  &:hover {
    cursor: pointer;
  }
`;

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

const FilmPreview = styled.img`
  display: block;
  width: 100%;
`;

const FilmTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const FilmDescription = styled.div`
  font-size: 16px;
`;

export {
  Container,
  Row,
  CenterRow,
  Logo,
  EventTitle,
  Submit,
  SaveMessage,
  FilmPreview,
  FilmTitle,
  FilmDescription,
}
