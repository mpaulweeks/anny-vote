import React from 'react';
import styled from 'styled-components';

const Row = styled.div`
  max-width: 400px;
  margin: 9px auto;
  padding: 6px 9px;
  & * {
    padding: 3px 0px;
  }

  // border-style: solid;
  // border-color: #909090;
  // border-width: 2px;

  background-color: ${props => props.selected ? 'lightgreen' : 'white'};
  &:hover {
    cursor: pointer;
  }
`;

const Preview = styled.img`
  display: block;
  width: 100%;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const Description = styled.div`
  font-size: 16px;
`;

class VoteFilm extends React.Component {
  render() {
    const { data, selected, onClick } = this.props;
    return (
      <Row selected={selected} onClick={onClick}>
        <Preview src={data.image_url} />
        <Title>{data.name}</Title>
        <Description>{data.description}</Description>
      </Row>
    )
  }
}

export default VoteFilm;
