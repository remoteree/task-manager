import React from 'react'
import { TabPane, Tab } from 'semantic-ui-react'
import TodayView from './TodayView'
import HistoryView from './HistoryView'

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
    render: () => <TabPane attached={false}><TodayView/></TabPane>,
  },
  {
    menuItem: 'History',
    render: () => <TabPane attached={false}><HistoryView summaries={mockSummaries} /></TabPane>,
  },
]

const Layout = () => {
    return <Tab menu={{ pointing: true }} panes={panes} />
}

    

export default Layout