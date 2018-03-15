import React from 'react';
import styled from 'styled-components';


const Row = styled.div`
  max-width: 400px;
  margin: 10px auto;
  padding: 10px;
  background-color: ${props => props.selected ? 'lightgreen' : 'salmon'};

  &:hover {
    cursor: pointer;
  }
`;

const Preview = styled.img`
  display: block;
  width: 100%;
`;

const Title = styled.div`
  padding: 2px;
  font-size: 18px;
  font-weight: bold;
`;

const Description = styled.div`
  padding: 2px;
  font-size: 16px;
`;

class VoteFilm extends React.Component {
  constructor(props){
    super(props);
    this.state = this.props;
  }
  onClick() {
    this.setState({
      selected: !this.state.selected,
    });
  }
  render() {
    const { data, selected } = this.state;
    return (
      <Row selected={selected} onClick={() => this.onClick()}>
        <Preview src={data.image_url} />
        <Title>{data.name}</Title>
        <Description>{data.description}</Description>
      </Row>
    )
  }
}

export default VoteFilm;
