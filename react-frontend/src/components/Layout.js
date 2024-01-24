import React from 'react'
import { TabPane, Tab } from 'semantic-ui-react'
import TodayView from './TodayView'
import HistoryView from './HistoryView'

const panes = [
  {
    menuItem: 'Today',
    render: () => <TabPane attached={false}><TodayView/></TabPane>,
  },
  {
    menuItem: 'History',
    render: () => <TabPane attached={false}><HistoryView /></TabPane>,
  },
]

const Layout = () => {
    return <Tab menu={{ pointing: true }} panes={panes} />
}

    

export default Layout