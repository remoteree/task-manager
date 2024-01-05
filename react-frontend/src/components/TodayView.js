import { Segment, List, Dropdown, Button } from 'semantic-ui-react';

// Define sorting options for the Dropdown
const sortOptions = [
  { key: 'time', text: 'Time Planned', value: 'time' },
  // ... other sorting options
];

// Today View Component
function TodayView({ tasks }) {
  return (
    <Segment.Group>
      <Segment>
        <Dropdown placeholder='Sort by' fluid selection options={sortOptions} />
        <Button primary onClick={() => {}}>Add New Task</Button>
      </Segment>
      <Segment>
        <List divided relaxed>
          {tasks.map(task => (
            <List.Item key={task.id}>
              <List.Content>
                <List.Header>{task.description}</List.Header>
                <List.Description>
                  Time planned: {task.duration_min} min - Category: {task.category}
                </List.Description>
              </List.Content>
            </List.Item>
          ))}
        </List>
      </Segment>
    </Segment.Group>
  );
}

export default TodayView;
