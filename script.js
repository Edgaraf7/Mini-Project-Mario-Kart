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
  const rules = document.getElementById('rules');
  const selectPlayerText = document.querySelector('.selectPlayer');

  let player1Wins = 0;
  let player2Wins = 0;
  let raceInProgress = false;

  player1.style.marginLeft = 0;
  player2.style.marginLeft = 0;

  // Função para exibir mensagem na tela
  function showMessage(message) {
    // Salva o conteúdo original do selectPlayerText
    const originalContent = selectPlayerText.innerHTML;
    // Substitui o conteúdo pelo texto da mensagem
    selectPlayerText.innerHTML = message;

    setTimeout(() => {
      // Restaura o conteúdo original após 1 segundo
      selectPlayerText.innerHTML = originalContent;
    }, 1000); // Remove a mensagem após 1 segundo
  }

  startBtn.addEventListener('click', () => {
    if (!raceInProgress) {
      raceInProgress = true;
      startBtn.disabled = true;
      resetBtn.disabled = true;
      rules.style.display = 'none';

      const intervalId = setInterval(() => {
        player1.style.marginLeft = parseInt(player1.style.marginLeft) + Math.random() * 300 + 'px';
        player2.style.marginLeft = parseInt(player2.style.marginLeft) + Math.random() * 300 + 'px';
        const player1Win = parseInt(player1.style.marginLeft) > window.innerWidth;
        const player2Win = parseInt(player2.style.marginLeft) > window.innerWidth;

        if (player1Win && player1Wins < player2Wins + 2) {
          if (!player2Win) {
            audioWinner.play();
            showMessage('PLAYER 1 GANHOU!');
            player1Wins += 2;
            player1WinsDisplay.textContent = player1Wins;
            player1Trophy.textContent = player1Wins > player2Wins ? '🏆' : '';
            player2Trophy.textContent = player2Wins > player1Wins ? '🏆' : '';
          }
          resetCars();
          clearInterval(intervalId);
          raceInProgress = false;
          startBtn.disabled = false;
          resetBtn.disabled = false;
          rules.style.display = 'block';
        }

        if (player2Win && player2Wins < player1Wins + 2) {
          if (!player1Win) {
            audioWinner.play();
            showMessage('PLAYER 2 GANHOU!');
            player2Wins += 2;
            player2WinsDisplay.textContent = player2Wins;
            player2Trophy.textContent = player2Wins > player1Wins ? '🏆' : '';
            player1Trophy.textContent = player1Wins > player2Wins ? '🏆' : '';
          }
          resetCars();
          clearInterval(intervalId);
          raceInProgress = false;
          startBtn.disabled = false;
          resetBtn.disabled = false;
          rules.style.display = 'block';
        }

        if (player1Win && player2Win) {
          showMessage('EMPATE! 1 PONTO PARA CADA!');
          player1Wins++;
          player2Wins++;
          player1WinsDisplay.textContent = player1Wins;
          player2WinsDisplay.textContent = player2Wins;
          resetCars();
          clearInterval(intervalId);
          raceInProgress = false;
          startBtn.disabled = false;
          resetBtn.disabled = false;
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
      rules.style.display = 'block';
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
