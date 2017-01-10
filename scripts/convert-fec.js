const fs = require('fs');
const XLSX = require('xlsx');

const years = [
  2004,
  2006,
  2008,
  2010,
  2012,
  2014,
];

const houseSheetNames = {
  '2004': '2004 US HOUSE & SENATE RESULTS',
  '2006': '2006 US House & Senate Results',
  '2008': '2008 House and Senate Results',
  '2010': '2010 US House & Senate Results',
  '2012': '2012 US House & Senate Resuts',
  '2014': '2014 US House Results by State',
};

const houseBySheetNames = {
  '2004': 'Table 7. House Votes by Party',
  '2006': 'Table 5. House Votes by Party',
  '2008': 'Table 7. House by Party',
  '2010': 'Table 5. House by Party',
  '2012': 'Table 7. House by Party',
  '2014': 'Table 5. House by Party',
};

const demLabels = [
  'D',
  'DEM',
  'D*',
  'DFL',
  'DNL',
  'D/WF',
  'D/WF*',
  'D/PRO/WF',
  'DEM/PRO/WF',
  'D/PRO/WF*',
  'D/WF Combined Parties',
  'D/WF/IDP Combined Parties',
  'D/IDP/WF Combined Parties',
  'D/R',
  'WF',
  'W(DEM)/DEM*',
  'W (DEM)/DEM',
];

const gopLabels = [
  'R',
  'REP',
  'R*',
  'R/TRP',
  'R/CRV/IDP/TRP Combined Parties',
  'R/CRV Combined Parties',
  'R/CRV/IDP Combined Parties',
  'R/IDP Combined Parties',
  'REP*',
  'CRV',
  'IDP',
  'C',
];

const indLabels = [
  'IND',
  'NPP',
  'I',
];

const noReps = [
  'STATE',
  'American Samoa',
  'District of Columbi',
  'District of Columbia',
  'Guam',
  'Northern Mariana Islands',
  'Puerto Rico',
  'Virgin Islands',
];

function rowAndColumn(cellId) {
  const col = cellId.slice(0, 1);
  const row = cellId.slice(1);
  return {row: row, column: col};
}

function rowsFromWorksheet(worksheet) {
  let rows = [];
  let currentRowId = '';
  let currentRowIndex = -1;
  for (cellId in worksheet) {
    if(cellId[0] === '!') continue;
    const rowId = rowAndColumn(cellId).row;
    const colId = rowAndColumn(cellId).column;
    const cell = worksheet[cellId];
    if (rowId !== currentRowId) {
      rows.push({id: rowId});
      currentRowId = rowId;
      currentRowIndex += 1;
    }
    if (cell.t === 's') {
      cell.v = cell.v.trim();
    }
    rows[currentRowIndex][colId] = cell;
  }
  return rows;
}

function columnHeaders(worksheetRows) {
  const firstRow = worksheetRows[0];
  let headers = {};
  Object.keys(firstRow).forEach((letter) => {
    if (firstRow[letter].v === 'D') {
      headers['DISTRICT'] = letter;
    } else if (firstRow[letter].v === 'GENERAL VOTES') {
      headers['GENERAL'] = letter;
    } else if (firstRow[letter].v === 'CANDIDATE NAME (Last)') {
      headers['LAST NAME'] = letter;
    } else if (firstRow[letter].v === 'Candidate Name (Last)') {
      headers['LAST NAME'] = letter;
    } else {
      headers[firstRow[letter].v] = letter;
    }
  });
  return headers;
}

function houseTableParsed(rows) {
  const headers = columnHeaders(rows);
  let states = {};
  let problems = {};
  let currentState = '';
  let currentRace = '';
  let currentCandidate = null;
  let currentLeader = null;
  let currentLeaderVotes = 0;
  let currentRaceHasRunoff = false;
  rows.forEach((row) => {
    if (row[headers['PARTY']] && row[headers['STATE']] &&
      row[headers['DISTRICT']] &&
      !row[headers['DISTRICT']].v.toString().startsWith('S') &&
      !row[headers['DISTRICT']].v.toString().startsWith('H') &&
      !row[headers['DISTRICT']].v.toString().endsWith('UNEXPIRED TERM') &&
      !row[headers['DISTRICT']].v.toString().endsWith('*')) {
      if (!states[row[headers['STATE']].v]) {
        states[row[headers['STATE']].v] = {
          abbreviation: row[headers['STATE ABBREVIATION']].v,
          demVotes: 0,
          gopVotes: 0,
          otherVotes: 0,
          demWinners: 0,
          gopWinners: 0,
          indWinners: 0,
          // winnerIds: [],
        };
      }
      // if (headers['GE WINNER INDICATOR'] &&
      //   row[headers['GE WINNER INDICATOR']] &&
      //   row[headers['STATE']].v === 'New York') {
      //   console.log(row[headers['LAST NAME']].v +
      //     ' (' + row[headers['PARTY']].v + ') ' +
      //     row[headers['DISTRICT']].v);
      // }
      if (row[headers['STATE']] && row[headers['LAST NAME']] &&
        row[headers['GENERAL']] &&
        (row[headers['GENERAL']].t === 'n' ||
          row[headers['GENERAL']].v.toLowerCase() === 'unopposed')) {
        if (row[headers['STATE']].v !== currentState ||
          row[headers['DISTRICT']].v.toString() !== currentRace) {
          if (currentLeader) {
            // console.log(currentLeader);
            if (demLabels.indexOf(currentLeader[headers['PARTY']].v) > -1) {
              states[currentState].demWinners += 1;
            } else if (gopLabels.indexOf(currentLeader[headers['PARTY']].v) >
              -1) {
              states[currentState].gopWinners += 1;
            } else if (indLabels.indexOf(currentLeader[headers['PARTY']].v) >
              -1) {
              states[currentState].indWinners += 1;
            } else {
              console.log(currentLeader[headers['STATE']].v + ' - ' +
                currentLeader[headers['PARTY']].v +
                ' - ' + currentLeader[headers['LAST NAME']].v + ' (' +
                currentLeader.id + ')');
            }
            // if (headers['GE WINNER INDICATOR'] &&
            //   !currentLeader[headers['GE WINNER INDICATOR']]) {
            //   console.log(currentLeader[headers['LAST NAME']].v +
            //     ' (' + currentLeader[headers['PARTY']].v + ') ' +
            //     currentState + ' - ' + currentRace);
            // }
          }
          currentState = row[headers['STATE']].v;
          currentRace = row[headers['DISTRICT']].v.toString();
          currentCandidate = row;
          currentLeader = row;
          currentRaceHasRunoff = row[headers['GE RUNOFF ELECTION VOTES (LA)']] ?
            true : false;
          currentLeaderVotes = currentRaceHasRunoff ?
            row[headers['GE RUNOFF ELECTION VOTES (LA)']].v :
            row[headers['GENERAL']].v;
        } else {
          if (currentRaceHasRunoff) {
            if (row[headers['GE RUNOFF ELECTION VOTES (LA)']] &&
              row[headers['GE RUNOFF ELECTION VOTES (LA)']].v >
                currentLeaderVotes) {
              currentLeader = row;
              currentLeaderVotes =
                row[headers['GE RUNOFF ELECTION VOTES (LA)']].v;
            }
          } else {
            if (row[headers['GENERAL']].t === 'n' &&
              row[headers['LAST NAME']].v ===
              currentCandidate[headers['LAST NAME']].v) {
                currentCandidate[headers['GENERAL']].v +=
                  row[headers['GENERAL']].v;
            } else {
              currentCandidate = row;
            }
            if (currentCandidate[headers['GENERAL']].v > currentLeaderVotes) {
              currentLeader = currentCandidate;
              currentLeaderVotes = currentCandidate[headers['GENERAL']].v;
            }
          }
        }
      }
      if (row[headers['GENERAL']] &&
        row[headers['GENERAL']].t === 'n') {
        if (row[headers['PARTY']]) {
          if (demLabels.indexOf(row[headers['PARTY']].v) > -1) {
            states[row[headers['STATE']].v].demVotes +=
              row[headers['GENERAL']].v;
          } else if (gopLabels.indexOf(row[headers['PARTY']].v) > -1) {
            states[row[headers['STATE']].v].gopVotes +=
              row[headers['GENERAL']].v;
          } else {
            states[row[headers['STATE']].v].otherVotes +=
              row[headers['GENERAL']].v;
            problems[row[headers['PARTY']].v] = true;
          }
        }
      }
    }
  });
  // console.log(problems);
  if (currentLeader) {
    if (demLabels.indexOf(currentLeader.K.v) > -1) {
      states[currentState].demWinners += 1;
    } else if (gopLabels.indexOf(currentLeader.K.v) > -1) {
      states[currentState].gopWinners += 1;
    } else if (indLabels.indexOf(currentLeader.K.v) > -1) {
      states[currentState].indWinners += 1;
    } else {
      console.log(currentLeader.C.v + ' - ' + currentLeader.K.v +
        ' - ' + currentLeader.H.v + ' (' + currentLeader.id + ')');
    }
    // console.log(currentLeader.H.v + ' (' + currentLeader.K.v + ') ' +
    //   currentState + ' - ' + currentRace);
  }
  return states;
}

function addProportional(states) {
  noReps.forEach((key) => {
    delete states[key];
  });
  for (s in states) {
    if (states[s].abbreviation && states[s].demVotes > 0) {
      const state = states[s];
      const dVotes = state.demVotes;
      const rVotes = state.gopVotes;
      const iVotes = state.otherVotes;
      const totalReps = state.demWinners + state.gopWinners + state.indWinners;
      const totalVotes = dVotes + rVotes + iVotes;
      let demProp = Math.round(totalReps * state.demVotes / totalVotes);
      let gopProp = Math.round(totalReps * state.gopVotes / totalVotes);
      let indProp = Math.round(totalReps * state.otherVotes / totalVotes);
      if (demProp + gopProp + indProp < totalReps) {
        if (dVotes > rVotes && dVotes > iVotes) {
          demProp += 1;
        }
        if (rVotes > dVotes && rVotes > iVotes) {
          gopProp += 1;
        }
        if (iVotes > dVotes && iVotes > rVotes) {
          indProp += 1;
        }
      }
      if (demProp + gopProp + indProp > totalReps) {
        if (dVotes < rVotes && dVotes < iVotes) {
          demProp -= 1;
        }
        if (rVotes < dVotes && rVotes < iVotes) {
          gopProp -= 1;
        }
        if (iVotes < dVotes && iVotes < rVotes) {
          indProp -= 1;
        }
      }
      if (demProp + gopProp + indProp !== totalReps) {
        console.log(state);
      }
      state.totalReps = totalReps;
      state.offset = ((demProp - state.demWinners) +
        (state.gopWinners - gopProp)) / 2;
      state.demIfProportional = demProp;
      state.gopIfProportional = gopProp;
      state.indIfProportional = indProp;
    }
  }
}

function summaryOfStates(states) {
  let totalReps = 0;
  let totalDem = 0;
  let totalGop = 0;
  let totalInd = 0;
  let totalDemProportional = 0;
  let totalGopProportional = 0;
  let totalIndProportional = 0;
  let totalOffset = 0;
  for (s in states) {
    if (states[s].abbreviation) {
      const state = states[s];
      totalDem += state.demWinners;
      totalGop += state.gopWinners;
      totalInd += state.indWinners;
      totalDemProportional += state.demIfProportional;
      totalGopProportional += state.gopIfProportional;
      totalIndProportional += state.indIfProportional;
      totalOffset += state.offset;
      // let stateReps = 0;
      // stateReps += state.demWinners;
      // stateReps += state.gopWinners;
      // stateReps += state.indWinners;
      // console.log(states[s].abbreviation + ': ' + stateReps);
    }
  }
  totalReps = totalDem + totalGop + totalInd;
  return {
    totalDem: totalDem,
    totalGop: totalGop,
    totalInd: totalInd,
    totalDemProportional: totalDemProportional,
    totalGopProportional: totalGopProportional,
    totalIndProportional: totalIndProportional,
    totalReps: totalReps,
    totalOffset: totalOffset,
  };
}

function addFecByParty(states, fecByParty) {
  for (s in states) {
    if (states[s].abbreviation) {
      states[s].FecTotals = fecByParty[states[s].abbreviation];
    }
  }
}

function fecYearData(year) {
  const workbook = XLSX.readFile('xls/' + year + '.xls');
  // console.log(workbook.SheetNames);
  const houseResultsSheet = workbook.Sheets[houseSheetNames[year]];
  const rows = rowsFromWorksheet(houseResultsSheet);
  let parsed = houseTableParsed(rows);
  addProportional(parsed);
  addFecByParty(parsed, houseByParty(workbook, year));
  const summary = summaryOfStates(parsed);
  return {states: parsed, summary: summary};
}

function houseByParty(workbook, year) {
  const abbrevColumn = year === 2010 ? 'B' : 'A';
  const dColumn = year === 2010 ? 'F' : 'E';
  const rColumn = year === 2010 ? 'G' : 'F';
  const iColumn = year === 2010 ? 'H' : 'G';
  const houseByPartySheet = workbook.Sheets[houseBySheetNames[year]];
  const rows = rowsFromWorksheet(houseByPartySheet);
  let states = {};
  rows.forEach((row) => {
    if (row[abbrevColumn] &&
      row[dColumn] && row[dColumn].t === 'n' &&
      row[rColumn] && row[rColumn].t === 'n') {
      states[row[abbrevColumn].v] = {D: row[dColumn].v, R: row[rColumn].v};
      states[row[abbrevColumn].v].I = row[iColumn] ? row[iColumn].v : 0;
    }
  });
  return states;
}

if (require.main === module) {
  let fec = {};
  years.forEach((year, i) => {
    console.log('------- ' + year + ' -------');
    fec[year] = fecYearData(year);
    console.log(fec[year].summary);
  });
  fs.writeFile('docs-js/fec.json', JSON.stringify(fec, null, 2), (err) => {
    if (err !== null) {
      console.error(err);
    }
  });
}

module.exports = {
  columnHeaders: columnHeaders,
  houseByParty: houseByParty,
  fecYearData: fecYearData,
};