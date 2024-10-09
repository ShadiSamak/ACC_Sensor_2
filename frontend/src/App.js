import './App.css';
import { Tab, Tabs, Button } from 'react-bootstrap';
import { useState } from 'react';
import File from './components/File';
import PPro from './components/PPro';
import Run from './components/Run';
import Sleep from './components/Sleep';
import Activity from './components/Activity';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './images/logo.png'
import React, { useEffect } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('file');

  function changeActiveTab(event) {
    setActiveTab(event)
  }


  return (
    <div className='application'>
      <header className='App-header'>
        <table className='custom-table'>
          <tr >
            <td className='column-left'>
              <h1 className='title'>ACC Platform</h1>
            </td>
            <td className='column-right'>
              <img className="logo" src={logo} />
            </td>
          </tr>
        </table>
      </header>

      <div className='sdp'>
        <Tabs
          activeKey={activeTab}
          id="justify-tab-example"
          className="mb-3"
          justify
          onSelect={changeActiveTab}
        >

          <Tab eventKey="file" title="File">
            <File parentChangeActiveTab={changeActiveTab} activeKey={activeTab} />
            <Button style={{ marginLeft: '132vh', color: 'black', border: 'none', backgroundColor: 'transparent' }} onClick={() => setActiveTab('preprocessing')}>Next  {'\u27A1'}</Button>
          </Tab>
          <Tab eventKey="preprocessing" title="Pre-Processing">
            <PPro parentChangeActiveTab={changeActiveTab} activeKey={activeTab} />
            <div style={{display: 'flex',justifyContent: 'flex-end', marginLeft: '122vh'}}>
              <Button style={{ color: 'black', border: 'none', backgroundColor: 'transparent' }} onClick={() => setActiveTab('file')}>{'\u2B05'}   Prev</Button>
              <Button style={{ color: 'black', border: 'none', backgroundColor: 'transparent' }} onClick={() => setActiveTab('activity')}>Next  {'\u27A1'}</Button>
            </div>
          </Tab>
          <Tab eventKey="activity" title="Activity">
            <Activity parentChangeActiveTab={changeActiveTab} activeKey={activeTab} />
            <div style={{display: 'flex',justifyContent: 'flex-end', marginLeft: '122vh'}}>
              <Button style={{ color: 'black', border: 'none', backgroundColor: 'transparent' }} onClick={() => setActiveTab('preprocessing')}>{'\u2B05'}   Prev</Button>
              <Button style={{ color: 'black', border: 'none', backgroundColor: 'transparent' }} onClick={() => setActiveTab('sleep')}>Next  {'\u27A1'}</Button>
            </div>
          </Tab>
          <Tab eventKey="sleep" title="Sleep">
            <Sleep parentChangeActiveTab={changeActiveTab} activeKey={activeTab} />
            <div style={{display: 'flex',justifyContent: 'flex-end', marginLeft: '122vh'}}>
              <Button style={{ color: 'black', border: 'none', backgroundColor: 'transparent' }} onClick={() => setActiveTab('activity')}>{'\u2B05'}   Prev</Button>
              <Button style={{ color: 'black', border: 'none', backgroundColor: 'transparent' }} onClick={() => setActiveTab('run')}>Next  {'\u27A1'}</Button>
            </div>
          </Tab>
          <Tab eventKey="run" title="Run">
            <Run parentChangeActiveTab={changeActiveTab} activeKey={activeTab} />
            <div style={{display: 'flex',justifyContent: 'flex-end', marginLeft: '122vh'}}>
              <Button style={{ color: 'black', border: 'none', backgroundColor: 'transparent' }} onClick={() => setActiveTab('sleep')}>{'\u2B05'}   Prev</Button>
            </div>
          </Tab>
        </Tabs>
      </div>
      <br /><br />

    </div>

  );
}
