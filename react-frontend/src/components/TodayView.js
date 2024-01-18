import React, { useState, useEffect } from 'react';
import { Segment, List, Button, Message, Label, LabelDetail } from 'semantic-ui-react';
import AddTaskModal from './AddTaskModal';
import { getLabelColor } from '../labelHelper';

const TodayView = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleModalToggle = () => setModalOpen(!modalOpen);

  const fetchTasks = () => {
    fetch(`${process.env.REACT_APP_BACKEND}/tasks`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(data => {
      setTasks(data);
      setIsLoading(false);
    })
    .catch(error => {
      setError(error.message || 'Could not fetch tasks');
      setIsLoading(false);
    });
  }

  const handleAddTask = (newTask) => {
    fetch(`${process.env.REACT_APP_BACKEND}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask)
    }).then(res => {
      fetchTasks()
      res.json()
    })
    .then(res => console.log("Response from server", res))
    .catch(err => console.error(err))
  };

  useEffect(() => {
    fetchTasks()
  }, []); // Empty dependency array ensures this runs once on mount
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
      <Segment
      loading={isLoading}>
        {
        error ? 
        <Message error>
          <p>{ error }</p>
        </Message> :
        <List divided relaxed>
        {
          tasks.map(task => (
            <List.Item key={task.id}>
              <List.Content>
                <List.Header>{task.description}</List.Header>
                <List.Description>
                  <Label style={{
                    'margin': '10px 0'
                  }}color={getLabelColor(task.category)}>
                    Time planned: {task.duration_min} min
                    <LabelDetail>{task.category}</LabelDetail>
                  </Label>
                </List.Description>
              </List.Content>
            </List.Item>
          ))
        }
        </List>
        }
      </Segment>
    </Segment.Group>
  );
}

export default TodayView;
