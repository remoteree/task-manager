import React, { useState, useEffect } from 'react';
import { Segment, List, Button, Message, Label, LabelDetail, Modal, Input, Icon } from 'semantic-ui-react';
import AddTaskModal from './AddTaskModal';
import { getLabelColor } from '../labelHelper';

const TodayView = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [completionModalOpen, setCompletionModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [completionTime, setCompletionTime] = useState('');
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleModalToggle = () => setModalOpen(!modalOpen);
  const handleCompletionModalToggle = () => setCompletionModalOpen(!completionModalOpen);

  const handleTaskCheck = (task) => {
    setSelectedTask(task);
    setCompletionModalOpen(true);
  };

  const handleCompleteTask = () => {
    fetch(`${process.env.REACT_APP_BACKEND}/tasks/${selectedTask._id}/complete`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ time_spent_min: completionTime })
    })
    .then(res => res.json())
    .then(res => {
      fetchTasks()
      setCompletionModalOpen(false);
    })
    .catch(err => console.error(err));
  };

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

  const handleDeleteTask = (taskId) => {
    fetch(`${process.env.REACT_APP_BACKEND}/tasks/${taskId}`, {
      method: 'DELETE'
    })
    .then(res => {
      if (res.ok) {
        fetchTasks()
      } else {
        throw new Error('Failed to delete task');
      }
    })
    .catch(err => console.error(err));
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
                <List.Content floated='right'>
                  <Icon name='check' onClick={() => handleTaskCheck(task)} style={{ cursor: 'pointer' }} />
                </List.Content>
                <List.Content floated='right'>
                  <Icon name='delete' onClick={() => handleDeleteTask(task._id)} style={{ cursor: 'pointer' }} />
                </List.Content>
                <List.Content>
                  <List.Header>{task.description}</List.Header>
                  <List.Description>
                  <Label style={{
                    'margin': '10px 0'
                  }}color={getLabelColor(task.category)}>
                    Time planned: {task.duration_min} min {task.status === 'complete' && `(spent ${task.time_spent_min} min)`}
                    <LabelDetail style={{'opacity': '0.5'}}>{task.category}</LabelDetail>
                    {
                    task.status === 'complete' && 
                      <Icon 
                      style={{margin: '0 10px'}}
                      name='check' color={'green'} 
                      />
                    }
                  </Label>
                  </List.Description>
                </List.Content>
              </List.Item>
            ))
          }
        </List>
        }
      </Segment>
      <Modal open={completionModalOpen} onClose={handleCompletionModalToggle}>
        <Modal.Header>Complete Task</Modal.Header>
        <Modal.Content>
          <p>Enter the time it took to complete the task:</p>
            <Input
          type="number"
          placeholder="Time in minutes"
          value={completionTime}
          onChange={(e) => setCompletionTime(e.target.value)}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={handleCompletionModalToggle}>Cancel</Button>
        <Button onClick={handleCompleteTask} positive>Complete Task</Button>
      </Modal.Actions>
    </Modal>
    </Segment.Group>
  );
}

export default TodayView;
