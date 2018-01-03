import React from 'react';
import {PieChart, Pie, Cell, Tooltip} from 'recharts';

const styles = {
  labels: {
    display: 'flex',
    height: '30px',
    lineHeight: '30px',
  },
  label: {
    fontSize: '13px',
    textAlign: 'center',
    color: '#999999',
    width: '33.33%',
  },
};

function percent(dec) {
  return (dec * 100).toFixed(2);
}

export default class FecPieCharts extends React.Component {
  static labelFormat(val, label, obj) {
    return val.toLocaleString() + ' (' + percent(obj.payload.pct) + '%)';
  }
  render() {
    const fec = this.props.fec;
    const voteData = [
      {name: 'D', value: fec.demVotes, pct: fec.demVoteRatio},
      {name: 'I', value: fec.indVotes, pct: fec.indVoteRatio},
      {name: 'R', value: fec.gopVotes, pct: fec.gopVoteRatio},
    ];
    const repData = [
      {name: 'D', value: fec.totalDem, pct: fec.demRepRatio},
      {name: 'I', value: fec.totalInd, pct: fec.indRepRatio},
      {name: 'R', value: fec.totalGop, pct: fec.gopRepRatio},
    ];
    const proportionalData = [
      {
        name: 'D', value: fec.totalDemProportional,
        pct: fec.demRepRatioProportional,
      },
      {
        name: 'I', value: fec.totalIndProportional,
        pct: fec.indRepRatioProportional,
      },
      {
        name: 'R', value: fec.totalGopProportional,
        pct: fec.gopRepRatioProportional,
      },
    ];
    const colors = ['#0D47A1', '#BDBDBD', '#B71C1C'];
    const innerRadius = 35;
    const outerRadius = 70;
    const cy = 70;
    return (
      <div>
      <div style={styles.labels}>
        <div style={styles.label}>Total votes</div>
        <div style={styles.label}>Actual seats</div>
        <div style={styles.label}>Seats if proportional</div>
      </div>
      <PieChart width={560} height={80}>
        <Pie
        startAngle={180} endAngle={0}
          data={voteData}
          dataKey="value"
          cx={85}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
        >
        {
          voteData.map((entry, index) => (
            <Cell key={index} fill={colors[index]}/>
          ))
        }
        </Pie>
        <Pie
        startAngle={180} endAngle={0}
          data={repData}
          dataKey="value"
          cx={275}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
        >
        {
          repData.map((entry, index) => (
            <Cell key={index} fill={colors[index]}/>
          ))
        }
        </Pie>
        <Pie
        startAngle={180} endAngle={0}
          data={proportionalData}
          dataKey="value"
          cx={465}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
        >
        {
          proportionalData.map((entry, index) => (
            <Cell key={index} fill={colors[index]}/>
          ))
        }
        </Pie>
        <Tooltip formatter={FecPieCharts.labelFormat} />
      </PieChart>
      </div>
    );
  }
}
