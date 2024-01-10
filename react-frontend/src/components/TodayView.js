import React, { useState } from 'react';
import { Segment, List, Button } from 'semantic-ui-react';
import AddTaskModal from './AddTaskModal';

const TodayView = ({ tasks }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalToggle = () => setModalOpen(!modalOpen);

  const handleAddTask = (newTask) => {
    fetch(`${process.env.REACT_APP_BACKEND}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask)
    }).then(res => res.json())
    .then(res => console.log("Response from server", res))
    .catch(err => console.error(err))
  };

  return (
    <Segment.Group>
      <Segment>
        <Button primary onClick={handleModalToggle}>Add New Task</Button>
        <AddTaskModal
          isOpen={modalOpen}
          onClose={handleModalToggle}
          onSubmit={handleAddTask}
        />
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
