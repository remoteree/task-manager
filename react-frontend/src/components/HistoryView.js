import { Segment, Card, Button, Message, Modal } from 'semantic-ui-react';
import React, { useState, useEffect } from 'react';
import PieChart from './PieChart';

const HistoryView = () => {
    const [summaries, setSummaries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedSummary, setSelectedSummary] = useState(null);

  const handleOpenModal = (summary) => {
      setSelectedSummary(summary);
      setModalOpen(true);
  }

  const handleCloseModal = () => {
      setModalOpen(false);
      setSelectedSummary(null);
  }


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
                <Card.Header>{summary._id}</Card.Header>
                <Card.Meta>Tasks completed: {summary.totalTasksCompleted}</Card.Meta>
                <Card.Description>Time worked: {summary.totalMinTaken} min</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button basic onClick={() => handleOpenModal(summary)}>View Detailed Analytics</Button>
            </Card.Content>
            </Card>))
        }
        </Segment>
        {/* Modal for PieChart */}
        <Modal open={modalOpen} onClose={handleCloseModal}>
            <Modal.Header>Detailed Analytics for {selectedSummary?._id}</Modal.Header>
            <Modal.Content>
                {selectedSummary && <PieChart data={selectedSummary} />}
            </Modal.Content>
        </Modal>
        </Segment.Group>
}

export default HistoryView;