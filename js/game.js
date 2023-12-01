'use strict';

(() => {
  const getRandomIntInclusive = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  const outputRes = (botCount, playerCount) => {
    const res = `
      Счет:
      --------------
      Бот: ${botCount}
      Игрок: ${playerCount}
      --------------`;
    return res;
  };

  const isWinner = (botCount, playerCount) => {
    const winner = botCount > playerCount ? 'Бот выиграл' : 'Вы выиграли';
    if (playerCount <= 0 || botCount <= 0) {
      alert(`${outputRes(botCount, playerCount)}
      ${winner}`);
      return true;
    }
    return false;
  };

  const rcp = () => {
    const FIGURE_RU = ['камень', 'ножницы', 'бумага'];
    const result = {
      player: 0,
      bot: 0,
    };

    alert(`
    Определим, кто делает первый ход.
    Сыграем в игру "Камень, Ножницы, Бумага"`);

    const randomNumber = getRandomIntInclusive(0, FIGURE_RU.length - 1);
    const computerFigure = FIGURE_RU[randomNumber];
    const str = prompt(`${FIGURE_RU.join(', ')}?`);

    if (str === null) return;

    // prettier-ignore
    const playerFigure = FIGURE_RU
        .filter((word) => !word.indexOf(str.toLowerCase()))
        .join('');

    if (!playerFigure) {
      alert('Введите корректное значение');
      return rcp();
    }

    switch (true) {
      case computerFigure === playerFigure:
        alert(`
          Бот: ${computerFigure}
          Игрок: ${playerFigure}
          Ничья!`);
        break;
      case (['камень'].includes(computerFigure) &&
        ['ножницы'].includes(playerFigure)) ||
        (['ножницы'].includes(computerFigure) &&
          ['бумага'].includes(playerFigure)) ||
        (['бумага'].includes(computerFigure) &&
          ['камень'].includes(playerFigure)):
        alert(`
          Бот: ${computerFigure}
          Игрок: ${playerFigure}
          Победил бот!`);
        result.bot++;
        break;
      default:
        alert(`
          Бот: ${computerFigure}
          Игрок: ${playerFigure}
          Вы победили!`);
        result.player++;
        break;
    }

    if (result.bot === result.player) return rcp();
    if (result.bot > result.player) {
      return true;
    } else {
      return false;
    }
  };

  const game = () => {
    let bot;
    let player;

    const ball = {
      player: 5,
      bot: 5,
    };

    const win = rcp();

    win ? (bot = true) : (player = true);

    return function start() {
      console.log(`
      Старт игры`);
      console.log(`
      Количество шариков:
      Игрок: ${ball.player}
      Бот: ${ball.bot}`);

      const winner = isWinner(ball.bot, ball.player);
      if (!winner && player) {
        alert('Ваш ход');
        const countBall = prompt(`Введите число от 1 до ${ball.player}`);
        const randomNum = getRandomIntInclusive(1, ball.player);

        if (countBall === null) return;

        if (isNaN(countBall) || parseInt(countBall) === 0) {
          alert('Введите корректное число');
          return start();
        }

        // prettier-ignore
        // chooseEvenOrOdd(randomNum)
        switch (true) {
          case (randomNum % 2 === 0 && parseInt(countBall) % 2 === 0) ||
              (randomNum % 2 !== 0 && parseInt(countBall) % 2 !== 0):
            ball.bot += parseInt(countBall);
            ball.player -= parseInt(countBall);
            alert(`
            Бот угадал
                ${outputRes(ball.bot, ball.player)}`);
            break;
          default:
            ball.bot -= parseInt(countBall);
            ball.player += parseInt(countBall);
            alert(`
            Бот не угадал
                ${outputRes(ball.bot, ball.player)}`);
            break;
        }
        player = false;
        bot = true;

        return start();
      } else if (!winner && bot) {
        alert('Ход бота');
        const randomNum = getRandomIntInclusive(1, ball.bot);
        const answer = confirm('Число четное?');

        switch (true) {
          case (answer && randomNum % 2 === 0) ||
            (!answer && randomNum % 2 !== 0):
            ball.bot -= parseInt(randomNum);
            ball.player += parseInt(randomNum);
            alert(`
            Вы угадали
                ${outputRes(ball.bot, ball.player)}`);
            break;
          default:
            ball.bot += parseInt(randomNum);
            ball.player -= parseInt(randomNum);
            alert(`
            Вы не угадали
                ${outputRes(ball.bot, ball.player)}`);
            break;
        }
        bot = false;
        player = true;

        return start();
      } else {
        const next = confirm('Продолжить игру?');
        if (next) {
          player = true;
          bot = false;

          ball.player = 5;
          ball.bot = 5;
          return start();
        } else {
          return;
        }
      }
    };
  };

  window.marbles = game;
})();
