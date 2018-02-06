# What would the US House look like if each state selected its representatives proportionally?

Of all our national elections, it would be reasonable to expect the results of our elections for the House of Representatives to most closely reflect the will of the people. As opposed to elections for the Senate and the Presidency, the House provides representation proportional to each state's population. The 2000 and 2016 elections reminded us that it is possible to win the Presidency with fewer votes than one's opponent, as long as those votes are in the right places. It is also possible for one party to win control of the House of Representatives while winning fewer votes nation-wide. In the seven electoral cycles since 2004, this has happened once - in 2012.

<div class="js-figure">
<div class="figure-title">Fig 1. Vote share by cycle (all numbers are percentages)</div>
<div id="fig1-vote-share-by-year" class="fig1"></div>
</div>

[Proportional representation systems](https://en.wikipedia.org/wiki/Proportional_representation) are arguably more democratic than [winner-take-all](https://en.wikipedia.org/wiki/Plurality_voting) systems. Article I, section 2 of the Constitution specifies that House members be chosen "by the people", so we are never going to have something resembling proportional representation. I was curious, though... what would the House of Representatives look like if each state selected its representatives proportionally?

In this imagined system, each state would still have its number of representatives determined by the census. Instead of voting for members by winner-take-all elections in districts, voters in each state would vote for a slate of candidates by party. For example in Connecticut, which has five representatives, if 60% of voters vote for the Democratic candidates and 40% of the voters vote for the Republicans, the state would send three Democrats and two Republicans to Congress.

For approximating the party preferences of voters, this experiment uses the election results [compiled by the FEC](https://transition.fec.gov/pubrec/electionresults.shtml). These results are available in in Excel format dating back to 2004. It interprets a vote for a candidate of a specific party as a preference for that party. Ideally there would be a better way of determining a voter's party preference - perhaps averaging the votes for house members with the results of statewide elections.

The most obvious takeaway from this data is how skewed a state's Congressional delegation is relative to the statewide party preferences of its voters. For example in Virginia in 2016, more voters voted for Democratic candidates for the US House than for Republican candidates but the state sent seven Republicans and four Democrats to Congress.

This skewing often demonstrates the effects of gerrymandering, but this outcome can happen without obvious gerrymandering. For example in California, where district lines are drawn by a citizens commission, the Democrats' share of the House delegation is 74% despite a statewide vote margin of 64% to 35% (with slightly less than 1% voting for third-party candidates). This can happen in fairly drawn districts if a state's preference for a party is geographically uniform.

One of the more interesting (to me) conclusions of this experiment is how many states would send at least one third-party candidate to Congress if its delegation were selected proportionally. In Texas in 2016, 5.75% of its voters cast ballots for third-party candidates. If the delegation were selected proportionally from state-wide ballots, Texas would send two third-party candidates to Congress.

<div class="js-figure">
<div class="figure-title">Fig 2. Interactive demo (select election cycle dropdown to change year)</div>
<div id="fig2-interactive-demo" class="fig2"></div>
</div>

## Some imagined questions (and answers)

### Can you share how you arrived at these numbers?

Sure! The source code for everything is [on github](https://github.com/esonderegger/us-house-if-proportional).

### Your numbers look a little different from the FEC's numbers in their "House votes by party" sheets. Why is that?

The FEC tallies all votes cast for candidates by party in the cycle, including special elections and runoff elections. This means that sometimes the voters of a district get counted twice. For example, in Louisiana, if the 3rd and 5th districts have runoff elections and the others do not (as happened in 2016) the FEC's votes cast by party methodology would give those districts twice as much weight if what one wants is an estimate of voters' party pref state-wide. This also happens when there is an election for an unexpired term in addition to the regular election.
