import React from 'react';
import fec from './fec.json';
import YearSelector from './YearSelector.js';
import FecPieCharts from './FecPieCharts.js';
import FecMap from './FecMap.js';

const styles = {
  topRow: {
    display: 'flex',
    height: '110px',
  },
  dropdown: {
    width: '160px',
  },
  pieCharts: {
    width: '560px',
  },
  bottom: {
    height: '430px',
  },
};

export default class InteractiveDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      year: 2016,
    };
    this.changeYear = this.changeYear.bind(this);
  }
  changeYear(year) {
    this.setState({year});
  }
  render() {
    return (
      <div>
        <div style={styles.topRow}>
          <div style={styles.dropdown}>
            <YearSelector
              year={this.state.year}
              changeYear={this.changeYear}
            />
          </div>
          <div style={styles.pieCharts}>
            <FecPieCharts fec={fec[this.state.year].summary} />
          </div>
        </div>
        <div style={styles.bottom}>
          <FecMap fec={fec[this.state.year]} />
        </div>
      </div>
    );
  }
}
