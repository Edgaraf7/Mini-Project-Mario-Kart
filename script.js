window.onload = () => {

  const startBtn = document.getElementById('start-race-btn');
  const resetBtn = document.getElementById('reset-race-btn');
  const player1 = document.getElementById('player1');
  const player2 = document.getElementById('player2');
  const audioWinner = document.getElementById('audioWinner');
  const player1WinsDisplay = document.getElementById('player1-wins');
  const player2WinsDisplay = document.getElementById('player2-wins');
  const player1Trophy = document.getElementById('player1-trophy');
  const player2Trophy = document.getElementById('player2-trophy');
  const rules = document.getElementById('rules'); // Adicionado

  let player1Wins = 0;
  let player2Wins = 0;
  let raceInProgress = false;

  player1.style.marginLeft = 0;
  player2.style.marginLeft = 0;

  startBtn.addEventListener('click', () => {
    if (!raceInProgress) {
      raceInProgress = true;
      startBtn.disabled = true;
      resetBtn.disabled = true;

      // Oculta as regras ao clicar em iniciar
      rules.style.display = 'none';

      const intervalId = setInterval(() => {
        player1.style.marginLeft = parseInt(player1.style.marginLeft) + Math.random() * 300 + 'px';
        player2.style.marginLeft = parseInt(player2.style.marginLeft) + Math.random() * 300 + 'px';
        const player1Win = parseInt(player1.style.marginLeft) > window.innerWidth;
        const player2Win = parseInt(player2.style.marginLeft) > window.innerWidth;

        if (player1Win && player1Wins < player2Wins + 2) {
          if (!player2Win) {
            audioWinner.play();
            alert('PLAYER 1 GANHOU!');
            player1Wins += 2;
            player1WinsDisplay.textContent = player1Wins;
            // Adiciona emoji de troféu ao jogador 1
            player1Trophy.textContent = player1Wins > player2Wins ? '🏆' : '';
            // Remove emoji de troféu do jogador 2
            player2Trophy.textContent = player2Wins > player1Wins ? '🏆' : '';
          }
          resetCars();
          clearInterval(intervalId);
          raceInProgress = false;
          startBtn.disabled = false;
          resetBtn.disabled = false;
          // Mostra as regras novamente após a corrida
          rules.style.display = 'block';
        }

        if (player2Win && player2Wins < player1Wins + 2) {
          if (!player1Win) {
            audioWinner.play();
            alert('PLAYER 2 GANHOU!');
            player2Wins += 2;
            player2WinsDisplay.textContent = player2Wins;
            // Adiciona emoji de troféu ao jogador 2
            player2Trophy.textContent = player2Wins > player1Wins ? '🏆' : '';
            // Remove emoji de troféu do jogador 1
            player1Trophy.textContent = player1Wins > player2Wins ? '🏆' : '';
          }
          resetCars();
          clearInterval(intervalId);
          raceInProgress = false;
          startBtn.disabled = false;
          resetBtn.disabled = false;
          // Mostra as regras novamente após a corrida
          rules.style.display = 'block';
        }

        // Adicionando condição de empate
        if (player1Win && player2Win) {
          alert('EMPATE! 1 PONTO PARA CADA!');
          player1Wins++;
          player2Wins++;
          player1WinsDisplay.textContent = player1Wins;
          player2WinsDisplay.textContent = player2Wins;
          resetCars();
          clearInterval(intervalId);
          raceInProgress = false;
          startBtn.disabled = false;
          resetBtn.disabled = false;
          // Mostra as regras novamente após a corrida
          rules.style.display = 'block';
        }
      }, 100);
    }
  });

  const resetCars = () => {
    player1.style.marginLeft = 0;
    player2.style.marginLeft = 0;
  }

  resetBtn.addEventListener('click', () => {
    if (!raceInProgress) {
      resetCars();
      player1Wins = 0;
      player2Wins = 0;
      player1WinsDisplay.textContent = player1Wins;
      player2WinsDisplay.textContent = player2Wins;
      // Mostra as regras novamente ao clicar em resetar
      rules.style.display = 'block';
      // Remover emojis de troféu ao resetar
      player1Trophy.textContent = '';
      player2Trophy.textContent = '';
    }
  });

  const cars = document.getElementsByClassName('car');
  const alternatives = document.getElementsByClassName('playersImages');

  for (let index = 0; index < cars.length; index += 1) {
    cars[index].addEventListener('click', (event) => {
      const playerSelect = document.querySelector('.selected');
      if (playerSelect) {
        playerSelect.classList.remove('selected');
      }
      event.target.classList.add('selected');
    })
  }

  for (let index = 0; index < alternatives.length; index += 1) {
    alternatives[index].addEventListener('click', (event) => {
      const playerSelect = document.querySelector('.selected');
      if (playerSelect) {
        playerSelect.style.backgroundImage = `url(${event.target.src})`;
        playerSelect.classList.remove('selected');
      }
    })
  }

}
