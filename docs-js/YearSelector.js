import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  outer: {padding: '10px 20px'},
  inner: {width: '120px'},
};

export default class YearSelector extends React.Component {
  render() {
    const years = [2004, 2006, 2008, 2010, 2012, 2014, 2016];
    return (
      <div style={styles.outer}>
        <SelectField
          floatingLabelText="Election cycle"
          value={this.props.year}
          style={styles.inner}
          onChange={(e, k, p) => {
            this.props.changeYear(p);
          }}
        >
          {
            years.map((year) => (
              <MenuItem value={year} primaryText={year} key={year} />
            ))
          }
        </SelectField>
      </div>
    );
  }
}
