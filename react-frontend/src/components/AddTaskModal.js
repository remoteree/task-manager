import React, { useState } from 'react';
import { Button, Modal, Form, Input, Dropdown, Label } from 'semantic-ui-react';

const AddTaskModal = ({ isOpen, onClose, onSubmit }) => {
  const [task, setTask] = useState({
    description: '',
    category: '',
    duration_min: null
  });

  const [error, setError] = useState({});

  const categoryOptions = [
    { key: 'work', text: 'Work', value: 'work' },
    { key: 'learning', text: 'Learning', value: 'learning' },
    { key: 'recreation', text: 'Recreation', value: 'recreation' },
    { key: 'social', text: 'Social', value: 'social' },
    { key: 'errand', text: 'Errand', value: 'errand' },
    { key: 'fitness', text: 'Fitness', value: 'fitness' }
  ];

  const validateField = (name, value) => {
    if (name === 'duration_min' && value > 1440) {
      setError({ ...error, duration_min: 'Duration cannot exceed 1440 minutes' });
    } else {
      setError({ ...error, [name]: null });
    }
  };

  const handleChange = (e, { name, value }) => {
    setTask(prevTask => ({ ...prevTask, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = () => {
    if (!error.duration_min) {
      onSubmit(task);
      setTask({ description: '', category: '', duration_min: null }); // Reset the form
      onClose(); // Close the modal
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Modal.Header>Add a New Task</Modal.Header>
      <Modal.Content>
        <Form>
        <Form.Field
            control={Input}
            label="Description"
            name="description"
            value={task.description}
            onChange={handleChange}
            placeholder="Describe the task"
          />
          <Form.Field
            control={Dropdown}
            label="Category"
            name="category"
            value={task.category}
            onChange={handleChange}
            fluid
            selection
            options={categoryOptions}
            placeholder="Select a category"
          />
          <Form.Field>
            <label>Duration (minutes)</label>
            <Input 
              type="number"
              name="duration_min"
              value={task.duration_min}
              onChange={handleChange}
              placeholder="Duration in minutes"
            />
            {error.duration_min && <Label basic color="red" pointing>{error.duration_min}</Label>}
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={onClose}>
          Cancel
        </Button>
        <Button
          positive
          icon="checkmark"
          labelPosition="right"
          content="Add Task"
          onClick={handleSubmit}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default AddTaskModal;
