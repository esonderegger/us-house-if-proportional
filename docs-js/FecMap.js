import React from 'react';
import Slider from 'material-ui/Slider';
import * as d3geo from 'd3-geo';
import us from './us-states.json';

export default class FecMap extends React.Component {
  constructor(props) {
    super(props);
    const albersUSA = d3geo.geoAlbersUsa();
    this.d3path = d3geo.geoPath(albersUSA);
    this.statePaths = us.features.map((state) => {
      return this.d3path(state);
    });
    this.state = {
      zoom: 1.0,
      mapX: 0.5,
      mapY: 0.5,
      moreinfo: null,
      mapOverlay: null,
    };
    this.handleSlider = this.handleSlider.bind(this);
    this.handleX = this.handleX.bind(this);
    this.handleY = this.handleY.bind(this);
    this.handleStateTap = this.handleStateTap.bind(this);
    this.pathRefs = [];
  }
  handleSlider(event, value) {
    this.setState({zoom: value});
  }
  handleX(event, value) {
    this.setState({mapX: value});
  }
  handleY(event, value) {
    this.setState({mapY: value});
  }
  handleStateTap(index) {
    if (index === -1) {
      this.setState({moreinfo: null, mapOverlay: null});
      return;
    }
    const stateBBox = this.pathRefs[index].getBBox();
    if (stateBBox.x + stateBBox.width/2.0 > 450) {
      this.setState({mapOverlay: 'left'});
    } else {
      this.setState({mapOverlay: 'right'});
    }
    if (us.features[index].properties.name === 'District of Columbia') {
      console.log('No Congressional representation :(');
      return;
    }
    this.setState({moreinfo: us.features[index].properties.name});
  }
  static viewBox(zoom, x, y) {
    const viewWidth = 900 / zoom;
    const viewHeight = 510 / zoom;
    const hiddenWidth = 900 - viewWidth;
    const hiddenHeight = 510 - viewHeight;
    const startX = hiddenWidth * x;
    const startY = hiddenHeight * y;
    return '' + startX + ' ' + startY + ' ' + viewWidth + ' ' + viewHeight;
  }
  static colorForOffset(offset) {
    const colors = [
      '#B71C1C',
      '#C62828',
      '#D32F2F',
      '#E53935',
      '#F44336',
      '#EF5350',
      '#E57373',
      '#EF9A9A',
      '#FFCDD2',
      '#FFEBEE',
      '#BDBDBD',
      '#BBDEFB',
      '#90CAF9',
      '#64B5F6',
      '#42A5F5',
      '#2196F3',
      '#1E88E5',
      '#1976D2',
      '#1565C0',
      '#0D47A1',
    ];
    return colors[Math.round(offset) + 10];
  }
  static offsetString(offset) {
    if (offset > 0) {
      return 'Democrats would gain ' + offset + ' seats';
    } else if (offset < 0) {
      return 'Republicans would gain ' + -offset + ' seats';
    } else {
      return 'Neither party would gain seats.';
    }
  }
  static withCommas(number) {
    return number.toLocaleString('en-US');
  }
  static percentage(ratio) {
    return (ratio * 100).toFixed(1);
  }
  render() {
    const classThis = this;
    const stateColors = us.features.map((state, i) => {
      const fecstate = this.props.fec.states[state.properties.name];
      if (!fecstate) {
        return '#E0E0E0';
      }
      return FecMap.colorForOffset(fecstate.offset);
    });
    const svgWidth = 720;
    const svgHeight = 430;
    const thisViewBox = FecMap.viewBox(
      this.state.zoom,
      this.state.mapX,
      1 - this.state.mapY
    );
    let stateInfo = null;
    if (this.state.moreinfo) {
      stateInfo = (
        <div className={'state-info ' + this.state.mapOverlay}>
          <h2>{this.state.moreinfo}</h2>
          <h3>Votes:</h3>
            <table><tbody>
              <tr>
                <td>Democrats</td>
                <td>
                  {FecMap.withCommas(
                    this.props.fec.states[this.state.moreinfo].demVotes)}
                </td>
              </tr>
              <tr>
                <td>Republicans</td>
                <td>
                  {FecMap.withCommas(
                    this.props.fec.states[this.state.moreinfo].gopVotes)}
                </td>
              </tr>
              <tr>
                <td>Third-party</td>
                <td>
                  {FecMap.withCommas(
                  this.props.fec.states[this.state.moreinfo].otherVotes)}
                </td>
              </tr>
            </tbody></table>
          <h3>Seats:</h3>
            <table><tbody>
              <tr>
                <td>Democrats</td>
                <td>
                  {this.props.fec.states[this.state.moreinfo].demWinners}
                </td>
              </tr>
              <tr>
                <td>Republicans</td>
                <td>
                  {this.props.fec.states[this.state.moreinfo].gopWinners}
                </td>
              </tr>
              <tr>
                <td>Third-party</td>
                <td>
                  {this.props.fec.states[this.state.moreinfo].indWinners}
                </td>
              </tr>
            </tbody></table>
          <h3>If proportional:</h3>
            <table><tbody>
              <tr>
                <td>Democrats</td>
                <td>
          {this.props.fec.states[this.state.moreinfo].demIfProportional}
                </td>
              </tr>
              <tr>
                <td>Republicans</td>
                <td>
          {this.props.fec.states[this.state.moreinfo].gopIfProportional}
                </td>
              </tr>
              <tr>
                <td>Third-party</td>
                <td>
          {this.props.fec.states[this.state.moreinfo].indIfProportional}
                </td>
              </tr>
            </tbody></table>
        </div>
      );
    }
    return (
      <div>
        <div className="map-shell">
        <svg width={svgWidth} height={svgHeight} viewBox={thisViewBox}>
          {
            this.statePaths.map(function(path, i) {
              return (
                <path className="county"
                  key={'statePath' + i}
                  d={path}
                  style={{
                    fill: stateColors[i],
                    stroke: '#333',
                    strokeWidth: 0.5,
                  }}
                  onClick={() => {
                    classThis.handleStateTap(i);
                  }}
                  onMouseEnter={() => {
                    classThis.handleStateTap(i);
                  }}
                  onMouseLeave={() => {
                    classThis.handleStateTap(-1);
                  }}
                  ref={(path) => {
                    classThis.pathRefs[i] = path;
                  }}
                />
              );
            })
          }
        </svg>
          <div className="zoom-slider">
            <Slider
              style={{height: 150}}
              axis="y"
              min={1.0}
              max={5.0}
              step={0.1}
              defaultValue={1.0}
              value={this.state.zoom}
              onChange={this.handleSlider}
            />
          </div>
          {this.state.zoom === 1.0 ? null : (
            <div>
              <div className="y-position">
                <Slider
                  style={{height: 350}}
                  axis="y"
                  defaultValue={0.5}
                  value={this.state.mapY}
                  onChange={this.handleY}
                />
              </div>
              <div className="x-position">
                <Slider
                  defaultValue={0.5}
                  value={this.state.mapX}
                  onChange={this.handleX}
                />
              </div>
            </div>
          )}
          {stateInfo}
        </div>
      </div>
    );
  }
}
