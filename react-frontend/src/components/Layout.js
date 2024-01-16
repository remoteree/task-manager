import React, { useState, useEffect, useCallback } from 'react'
import { TabPane, Tab } from 'semantic-ui-react'
import TodayView from './TodayView'
import HistoryView from './HistoryView'

const mockTasks = [
    {  
        id: 1,
        description: "Hi I am a task",
        duration_min: 30,
        time_spent_min: 25,
        category: "learning",
        status: "complete"
    },
    {  
        id: 2,
        description: "Hi I am another task",
        duration_min: 40,
        time_spent_min: 25,
        category: "social",
        status: "complete"
    }
]

const mockSummaries = [
    {  
        id: 1,
        date: "2024-01-02",
        hoursWorked: 10,
        completed: 15,
    },
    {  
        id: 2,
        date: "2024-01-03",
        hoursWorked: 8,
        completed: 10,
    },
]

const panes = [
  {
    menuItem: 'Today',
    render: () => <TabPane attached={false}><TodayView tasks={mockTasks}/></TabPane>,
  },
  {
    menuItem: 'History',
    render: () => <TabPane attached={false}><HistoryView summaries={mockSummaries} /></TabPane>,
  },
]

const Layout = () => {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const panes = useCallback(() => { return [
        {
          menuItem: 'Today',
          render: () => <TabPane attached={false}><TodayView tasks={tasks}/></TabPane>,
        },
        {
          menuItem: 'History',
          render: () => <TabPane attached={false}><HistoryView summaries={mockSummaries} /></TabPane>,
        },
      ]}, [tasks])

    useEffect(() => {
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
            setError(error);
            setIsLoading(false);
          });
      }, []); // Empty dependency array ensures this runs once on mount
    
    return <Tab menu={{ pointing: true }} panes={panes()} />
}

    

export default Layout