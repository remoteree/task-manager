import { Segment, Card, Button, Message } from 'semantic-ui-react';
import React, { useState, useEffect } from 'react';


const HistoryView = () => {
    const [summaries, setSummaries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSummaries = () => {
        fetch(`${process.env.REACT_APP_BACKEND}/tasks/summaries`)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Network response was not ok.');
        })
        .then(data => {
            setSummaries(data);
            setIsLoading(false);
        })
        .catch(error => {
          setError(error.message || 'Could not fetch tasks');
          setIsLoading(false);
        });
      }
      useEffect(() => {
        fetchSummaries()
      }, []); // Empty dependency array ensures this runs once on mount

      // TODO: Need to update parsing the summaries
    return <Segment.Group>
        <Segment loading={isLoading}>
        {
            error ? 
            <Message error>
                <p>{ error }</p>
            </Message> :
            summaries.map(summary => (
            <Card key={summary.date}>
            <Card.Content>
                <Card.Header>{summary.date}</Card.Header>
                <Card.Meta>Tasks completed: {summary.completed}</Card.Meta>
                <Card.Description>Time worked: {summary.hoursWorked} hours</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button basic onClick={() => {}}>View Detailed Analytics</Button>
            </Card.Content>
            </Card>))
        }
        </Segment>
        </Segment.Group>
}

export default HistoryView;