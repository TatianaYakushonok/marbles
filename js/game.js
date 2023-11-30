'use strict';

(() => {
  const getRandomIntInclusive = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  const outputRes = (botCount, playerCount) => {
    const winner = botCount > playerCount ? 'Бот выиграл' : 'Игрок выиграл';
    const res = `
      Счет:
      --------------
      Бот: ${botCount}
      Игрок: ${playerCount}
      --------------
      ${winner}`;
    return res;
  };

  const game = () => {
    const ball = {
      player: 5,
      bot: 5,
    };

    console.log('Старт игры');
    console.log(`Количество шариков:\nИгрок: ${ball.player}\nБот: ${ball.bot}`);

    return function start() {
      const countBall = prompt(`Введите число от 1 до ${ball.player}`);
      const randomNum = getRandomIntInclusive(1, ball.player);

      if (countBall === null) return;

      if (isNaN(countBall) || parseInt(countBall) === 0) {
        alert('Введите корректное число');
        return start();
      }

      // prettier-ignore
      switch (true) {
        case (randomNum % 2 === 0 && +countBall % 2 === 0) ||
            (randomNum % 2 !== 0 && +countBall % 2 !== 0):
          ball.bot += parseInt(countBall);
          ball.player -= parseInt(countBall);
          alert(`Угадал\n${outputRes(ball.bot, ball.player)}`);
          break;
        case (randomNum % 2 === 0 && +countBall % 2 !== 0) ||
            (randomNum % 2 !== 0 && +countBall % 2 === 0):
          ball.bot -= parseInt(countBall);
          ball.player += parseInt(countBall);
          alert(`Не угадал\n${outputRes(ball.bot, ball.player)}`);
          break;
      }

      if (ball.player <= 0 || ball.bot <= 0) {
        alert(`${outputRes(ball.bot, ball.player)}`);
        const next = confirm('Продолжить игру?');
        if (next) {
          ball.player = 5;
          ball.bot = 5;
          return start();
        } else {
          return;
        }
      }

      return start();
    };
  };

  window.marbles = game;
})();
