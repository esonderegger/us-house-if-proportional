import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import VoteShareByYear from './VoteShareByYear.js';
import InteractiveDemo from './InteractiveDemo.js';

class InteractiveDemoThemed extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <InteractiveDemo />
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(
  <VoteShareByYear />,
  document.getElementById('fig1-vote-share-by-year')
);

ReactDOM.render(
  <InteractiveDemoThemed />,
  document.getElementById('fig2-interactive-demo')
);
