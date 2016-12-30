import React from 'react';
const topojson = require('topojson');
const MapChoropleth = require('react-d3-map-choropleth').MapChoropleth;
const topodata = require('./us.json');
// const unemploy = require('dsv?delimiter=\t!../data/unemployment.tsv');

export default class ChoroplethExample extends React.Component {
  render() {
    const width = 960;
    const height = 600;
    const dataStates = topojson.mesh(
      topodata,
      topodata.objects.states,
      function(a, b) {
        return a !== b;
      }
    );
    const dataCounties = topojson.feature(
      topodata,
      topodata.objects.counties
    ).features;
    const domain = {
      scale: 'quantize',
      domain: [0, .15],
      range: d3.range(9).map(function(i) {
        return 'q' + i + '-9';
      }),
    };
    const domainValue = function(d) {
      return + d.rate;
    };
    const domainKey = function(d) {
      return +d.id;
    };
    const mapKey = function(d) {
      return +d.id;
    };
    const scale = 1280;
    const translate = [width / 2, height / 2];
    const projection = 'albersUsa';
    return (
      <MapChoropleth
        width= {width}
        height= {height}
        dataPolygon= {dataCounties}
        dataMesh= {dataStates}
        scale= {scale}
        domain= {domain}
        domainData= {unemploy}
        domainValue= {domainValue}
        domainKey= {domainKey}
        mapKey = {mapKey}
        translate= {translate}
        projection= {projection}
        showGraticule= {true}
      />
    );
    // return (
    //   <div>hello world</div>
    // );
  }
}
