import React from 'react';

import VoteFilm from './VoteFilm';
import {
  CenterRow,
  SaveMessage,
  AnalyticsTable,
  EventTitle,
} from './Component';

class EventWeekStats extends React.Component {
  render() {
    const { weekData } = this.props;
    const { id, count, films, totalVotes } = weekData;
    const avgVotes = (totalVotes / count).toFixed(1);
    return (
      <div>
        <CenterRow>
          <EventTitle>
            Week of { id }
          </EventTitle>
          <SaveMessage>
            Number of Participants: { count }
          </SaveMessage>
          <SaveMessage>
            Total Votes: { totalVotes }
          </SaveMessage>
          <SaveMessage>
            Average Votes Per User: { avgVotes }
          </SaveMessage>
        </CenterRow>
        <AnalyticsTable>
          <thead>
            <tr>
              <th>votes</th>
              <th>film</th>
            </tr>
          </thead>
          <tbody>
          {films.map(f => f.hide ? null : (
            <tr key={f.id}>
              <td>{f.votes}</td>
              <td>
                <VoteFilm data={f}></VoteFilm>
              </td>
            </tr>
          ))}
          </tbody>
        </AnalyticsTable>
      </div>
    );
  }
}

export default EventWeekStats;
