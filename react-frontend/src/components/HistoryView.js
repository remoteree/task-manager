import { Segment, Card, Button } from 'semantic-ui-react';

const HistoryView = ({ summaries }) => {
    return <Segment.Group>
        <Segment>
        {
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