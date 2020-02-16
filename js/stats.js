var winners = []; //array of statistics

const resetWinners = () => (winners = []);

const recordWinner = () => {
  const winner = game.allPlayers[0].name;
  winners.push(winner);
  console.log('Total games: ', winners.length, ':', statistics(winners)[1]);
};

const statistics = winners => {
  let winCount = {};
  winners.forEach(winner => {
    if (winCount[winner]) winCount[winner]++;
    else winCount[winner] = 1;
  });
  let percentage = {};
  winners.forEach(winner => {
    percentage[winner] =
      Math.round((winCount[winner] / winners.length) * 100) + '%';
  });
  return [winCount, percentage];
};
