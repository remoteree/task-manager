import React from 'react'
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

const Layout = () => 
    <Tab menu={{ pointing: true }} panes={panes} />

export default Layout