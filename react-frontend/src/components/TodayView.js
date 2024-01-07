import { Segment, List, Button } from 'semantic-ui-react';

const TodayView = ({ tasks }) => {
  return (
    <Segment.Group>
      <Segment>
        <Button primary onClick={() => {}}>Add New Task</Button>
      </Segment>
      <Segment>
        <List divided relaxed>
          {
            tasks.map(task => (
              <List.Item key={task.id}>
                <List.Content>
                  <List.Header>{task.description}</List.Header>
                  <List.Description>
                    Time planned: {task.duration_min} min - Category: {task.category}
                  </List.Description>
                </List.Content>
              </List.Item>
            ))
          }
        </List>
      </Segment>
    </Segment.Group>
  );
}

export default TodayView;
