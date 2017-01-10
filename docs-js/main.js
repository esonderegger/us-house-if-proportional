import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import InteractiveMapApp from './interactive-map-app.js';

injectTapEventPlugin();

export default class InteractiveMap extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <InteractiveMapApp />
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(
  <InteractiveMap />,
  document.getElementById('interactive-map')
);
