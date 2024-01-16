import React, { useState } from 'react';
import { Segment, List, Button, Modal, Input, Icon } from 'semantic-ui-react';
import AddTaskModal from './AddTaskModal';

const TodayView = ({ tasks }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [completionModalOpen, setCompletionModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [completionTime, setCompletionTime] = useState('');

  const handleModalToggle = () => setModalOpen(!modalOpen);
  const handleCompletionModalToggle = () => setCompletionModalOpen(!completionModalOpen);

  const handleTaskCheck = (task) => {
    setSelectedTask(task);
    setCompletionModalOpen(true);
  };

  const handleCompleteTask = () => {
    // Assuming 'id' is the unique identifier of the task
    fetch(`${process.env.REACT_APP_BACKEND}/tasks/${selectedTask.id}/complete`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completionTime })
    })
    .then(res => res.json())
    .then(res => {
      console.log("Task completion response", res);
      setCompletionModalOpen(false);
    })
    .catch(err => console.error(err));
  };

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

  const handleDeleteTask = (taskId) => {
    fetch(`${process.env.REACT_APP_BACKEND}/tasks/${taskId}`, {
      method: 'DELETE'
    })
    .then(res => {
      if (res.ok) {
        // TODO: Refresh tasks
      } else {
        throw new Error('Failed to delete task');
      }
    })
    .catch(err => console.error(err));
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
                <List.Content floated='right'>
                  <Button onClick={() => handleTaskCheck(task)}>Check</Button>
                </List.Content>
                <Icon name='delete' onClick={() => handleDeleteTask(task.id)} style={{ cursor: 'pointer' }} />
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
      {/* Task Completion Modal */}
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
