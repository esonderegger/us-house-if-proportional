import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ChoroplethExample from './choropleth-example.js';

export default class InteractiveMapApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({counter: this.state.counter + 1});
  }
  render() {
    return (
      <div>
        <RaisedButton
          label="Click Me"
          onTouchTap={this.handleClick}
        />
        <div>{this.state.counter}</div>
        <ChoroplethExample />
      </div>
    );
  }
}
