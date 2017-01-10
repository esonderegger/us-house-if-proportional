const expect = require('chai').expect;
const ConvertFec = require('../scripts/convert-fec.js');
const apportionment2000 = require('../misc/apportionment-2000.json');
const apportionment2010 = require('../misc/apportionment-2010.json');
const stateNames = Object.keys(apportionment2000);

describe('2014', function() {
  const yearData = ConvertFec.fecYearData(2014);
  it('has 435 winners', function() {
    expect(yearData.summary.totalReps).to.equal(435);
  });
  it('has correct dem and gop winners', function() {
    expect(yearData.summary.totalDem).to.equal(188);
    expect(yearData.summary.totalGop).to.equal(247);
  });
  it('has correct count of Democrats', function() {
    expect(yearData.summary.totalDem).to.equal(188);
  });
  it('has correct count of Republicans', function() {
    expect(yearData.summary.totalGop).to.equal(247);
  });
  stateNames.forEach(function(stateName) {
    const actualReps = apportionment2010[stateName];
    it('has correct number of reps for ' + stateName, function() {
      expect(yearData.states[stateName].totalReps).to.equal(actualReps);
    });
  });
  stateNames.forEach(function(stateName) {
    const stateData = yearData.states[stateName];
    it('has same number of D votes as FEC in ' + stateName, function() {
      expect(stateData.demVotes).to.equal(stateData.FecTotals.D);
    });
    it('has same number of R votes as FEC in ' + stateName, function() {
      expect(stateData.gopVotes).to.equal(stateData.FecTotals.R);
    });
    it('has same number of I votes as FEC in ' + stateName, function() {
      expect(stateData.otherVotes).to.equal(stateData.FecTotals.I);
    });
  });
});
describe('2012', function() {
  const yearData = ConvertFec.fecYearData(2012);
  it('has 435 winners', function() {
    expect(yearData.summary.totalReps).to.equal(435);
  });
  it('has correct count of Democrats', function() {
    expect(yearData.summary.totalDem).to.equal(201);
  });
  it('has correct count of Republicans', function() {
    expect(yearData.summary.totalGop).to.equal(234);
  });
  stateNames.forEach(function(stateName) {
    const actualReps = apportionment2010[stateName];
    it('has correct number of reps for ' + stateName, function() {
      expect(yearData.states[stateName].totalReps).to.equal(actualReps);
    });
  });
  stateNames.forEach(function(stateName) {
    const stateData = yearData.states[stateName];
    it('has same number of D votes as FEC in ' + stateName, function() {
      expect(stateData.demVotes).to.equal(stateData.FecTotals.D);
    });
    it('has same number of R votes as FEC in ' + stateName, function() {
      expect(stateData.gopVotes).to.equal(stateData.FecTotals.R);
    });
    it('has same number of I votes as FEC in ' + stateName, function() {
      expect(stateData.otherVotes).to.equal(stateData.FecTotals.I);
    });
  });
});
describe('2010', function() {
  const yearData = ConvertFec.fecYearData(2010);
  it('has 435 winners', function() {
    expect(yearData.summary.totalReps).to.equal(435);
  });
  it('has correct count of Democrats', function() {
    expect(yearData.summary.totalDem).to.equal(193);
  });
  it('has correct count of Republicans', function() {
    expect(yearData.summary.totalGop).to.equal(242);
  });
  stateNames.forEach(function(stateName) {
    const actualReps = apportionment2000[stateName];
    it('has correct number of reps for ' + stateName, function() {
      expect(yearData.states[stateName].totalReps).to.equal(actualReps);
    });
  });
  stateNames.forEach(function(stateName) {
    const stateData = yearData.states[stateName];
    it('has same number of D votes as FEC in ' + stateName, function() {
      expect(stateData.demVotes).to.equal(stateData.FecTotals.D);
    });
    it('has same number of R votes as FEC in ' + stateName, function() {
      expect(stateData.gopVotes).to.equal(stateData.FecTotals.R);
    });
    it('has same number of I votes as FEC in ' + stateName, function() {
      expect(stateData.otherVotes).to.equal(stateData.FecTotals.I);
    });
  });
});
describe('2008', function() {
  const yearData = ConvertFec.fecYearData(2008);
  it('has 435 winners', function() {
    expect(yearData.summary.totalReps).to.equal(435);
  });
  it('has correct count of Democrats', function() {
    expect(yearData.summary.totalDem).to.equal(257);
  });
  it('has correct count of Republicans', function() {
    expect(yearData.summary.totalGop).to.equal(178);
  });
  stateNames.forEach(function(stateName) {
    const actualReps = apportionment2000[stateName];
    it('has correct number of reps for ' + stateName, function() {
      expect(yearData.states[stateName].totalReps).to.equal(actualReps);
    });
  });
  stateNames.forEach(function(stateName) {
    const stateData = yearData.states[stateName];
    it('has same number of D votes as FEC in ' + stateName, function() {
      expect(stateData.demVotes).to.equal(stateData.FecTotals.D);
    });
    it('has same number of R votes as FEC in ' + stateName, function() {
      expect(stateData.gopVotes).to.equal(stateData.FecTotals.R);
    });
    it('has same number of I votes as FEC in ' + stateName, function() {
      expect(stateData.otherVotes).to.equal(stateData.FecTotals.I);
    });
  });
});
describe('2006', function() {
  const yearData = ConvertFec.fecYearData(2006);
  it('has 435 winners', function() {
    expect(yearData.summary.totalReps).to.equal(435);
  });
  it('has correct count of Democrats', function() {
    expect(yearData.summary.totalDem).to.equal(233);
  });
  it('has correct count of Republicans', function() {
    expect(yearData.summary.totalGop).to.equal(202);
  });
  stateNames.forEach(function(stateName) {
    const actualReps = apportionment2000[stateName];
    it('has correct number of reps for ' + stateName, function() {
      expect(yearData.states[stateName].totalReps).to.equal(actualReps);
    });
  });
  stateNames.forEach(function(stateName) {
    const stateData = yearData.states[stateName];
    it('has same number of D votes as FEC in ' + stateName, function() {
      expect(stateData.demVotes).to.equal(stateData.FecTotals.D);
    });
    it('has same number of R votes as FEC in ' + stateName, function() {
      expect(stateData.gopVotes).to.equal(stateData.FecTotals.R);
    });
    it('has same number of I votes as FEC in ' + stateName, function() {
      expect(stateData.otherVotes).to.equal(stateData.FecTotals.I);
    });
  });
});
describe('2004', function() {
  const yearData = ConvertFec.fecYearData(2004);
  it('has 435 winners', function() {
    expect(yearData.summary.totalReps).to.equal(435);
  });
  it('has correct count of Democrats', function() {
    expect(yearData.summary.totalDem).to.equal(202);
  });
  it('has correct count of Republicans', function() {
    expect(yearData.summary.totalGop).to.equal(232);
  });
  stateNames.forEach(function(stateName) {
    const actualReps = apportionment2000[stateName];
    it('has correct number of reps for ' + stateName, function() {
      expect(yearData.states[stateName].totalReps).to.equal(actualReps);
    });
  });
  stateNames.forEach(function(stateName) {
    const stateData = yearData.states[stateName];
    it('has same number of D votes as FEC in ' + stateName, function() {
      expect(stateData.demVotes).to.equal(stateData.FecTotals.D);
    });
    it('has same number of R votes as FEC in ' + stateName, function() {
      expect(stateData.gopVotes).to.equal(stateData.FecTotals.R);
    });
    it('has same number of I votes as FEC in ' + stateName, function() {
      expect(stateData.otherVotes).to.equal(stateData.FecTotals.I);
    });
  });
});
