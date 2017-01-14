const expect = require('chai').expect;
const ConvertFec = require('../scripts/convert-fec.js');
const apportionment2000 = require('../misc/apportionment-2000.json');
const apportionment2010 = require('../misc/apportionment-2010.json');
const stateNames = Object.keys(apportionment2000);

const years = [
  2004,
  2006,
  2008,
  2010,
  2012,
  2014,
];

const apportionment = {
  2004: apportionment2000,
  2006: apportionment2000,
  2008: apportionment2000,
  2010: apportionment2000,
  2012: apportionment2010,
  2014: apportionment2010,
};

const membersByParty = {
  2004: {
    D: 201,
    R: 232,
    I: 1,
  },
  2006: {
    D: 233,
    R: 202,
    I: 0,
  },
  2008: {
    D: 257,
    R: 178,
    I: 0,
  },
  2010: {
    D: 193,
    R: 242,
    I: 0,
  },
  2012: {
    D: 201,
    R: 234,
    I: 0,
  },
  2014: {
    D: 188,
    R: 247,
    I: 0,
  },
};

const statesToIgnore = {
  2004: [],
  2006: [],
  2008: [],
  2010: [],
  2012: [
    'Kentucky', // has unexpired and full terms added together
    'Louisiana', // has runoff and general added together
    'Michigan', // has unexpired and full terms added together
    'New Jersey', // has unexpired and full terms added together
    'Washington', // has unexpired and full terms added together
  ],
  2014: [
    'Louisiana', // has runoff and general added together
    'Nevada', // has unexpired and full terms added together
    'New Jersey', // has unexpired and full terms added together
    'North Carolina', // has unexpired and full terms added together
    'Pennsylvania', // has write-in votes not listed on own rows
    'Virginia', // has unexpired and full terms added together
  ],
};

years.forEach(function(year) {
  describe(year.toString(), function() {
    const yearData = ConvertFec.fecYearData(year);
    it('has 435 winners', function() {
      expect(yearData.summary.totalReps).to.equal(435);
    });
    it('has correct count of Democrats', function() {
      expect(yearData.summary.totalDem).to.equal(membersByParty[year].D);
    });
    it('has correct count of Republicans', function() {
      expect(yearData.summary.totalGop).to.equal(membersByParty[year].R);
    });
    it('has correct count of Independents', function() {
      expect(yearData.summary.totalInd).to.equal(membersByParty[year].I);
    });
    stateNames.forEach(function(stateName) {
      const actualReps = apportionment[year][stateName];
      it('has correct number of reps for ' + stateName, function() {
        expect(yearData.states[stateName].totalReps).to.equal(actualReps);
      });
    });
    stateNames.forEach(function(stateName) {
      if (statesToIgnore[year].indexOf(stateName) === -1) {
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
      }
    });
  });
});
