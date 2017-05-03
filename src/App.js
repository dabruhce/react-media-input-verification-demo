import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import MediaInput from './MediaInput/MediaInput'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import AppBar from 'material-ui/AppBar';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar />
          <MediaInput />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
