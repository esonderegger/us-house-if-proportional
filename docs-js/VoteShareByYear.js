import React from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend}
  from 'recharts';
import fec from './fec.json';

function percent(dec) {
  return (dec * 100).toFixed(2);
}

export default class VoteShareByYear extends React.Component {
  render() {
    const data = [2004, 2006, 2008, 2010, 2012, 2014, 2016].map((year) => {
      return {
        'name': year,
        'D votes (%)': percent(fec[year].summary.demVoteRatio),
        'R votes (%)': percent(fec[year].summary.gopVoteRatio),
        'D seats (%)': percent(fec[year].summary.demRepRatio),
        'R seats (%)': percent(fec[year].summary.gopRepRatio),
      };
    });
    return (
      <div>
        <LineChart
          width={720} height={320} data={data}
          margin={{top: 15, right: 40, left: 0, bottom: 15}}
        >
          <XAxis dataKey="name" />
          <YAxis domain={[40, 60]} />
          <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip/>
          <Legend />
          <Line
            type="monotone"
            dataKey="D votes (%)"
            stroke="#aaaaff"
          />
          <Line
            type="monotone"
            dataKey="D seats (%)"
            stroke="#0000ff"
          />
          <Line
            type="monotone"
            dataKey="R votes (%)"
            stroke="#ffaaaa"
          />
          <Line
            type="monotone"
            dataKey="R seats (%)"
            stroke="#ff0000"
          />
        </LineChart>
      </div>
    );
  }
}
