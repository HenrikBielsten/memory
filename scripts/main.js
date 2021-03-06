// This goes through the entire logic of the memory game. I will at some point put everything into functions but I haven't had time yet unfortunately

// When the start button is clicked we clear the .board and reset all arrays and counters to 0. A function then sorts all the cards randomly. After 1.6 seconds (when the cards that are rendered below have finished their animation) we start counting seconds using setInterval.
start.addEventListener('click', (event) => {

  instructions.style.animation = "win_state_back .5s forwards"; // Makes the instructions animate out of sight

  if (win_state) {
    win_state.style.animation = "win_state_back .5s forwards"; // If the win_state is on screen it animates out of sight
  }

  // This makes sure that you can't click the restart button untill the last card is done animating. This is to prevent timer from bugging.
  start.style.pointerEvents = "none";
  setTimeout(function() {
    start.style.pointerEvents = "auto";
  }, 3000);

  cards_div.innerHTML = " "; // Clears board

  start.innerHTML = "Restart Game"; // Changes text displayed on .start_button

  offset_array.length = 0; // Sets offset_array (used to, in CSS, offset cards rendered below) to 0
  compare_array.length = 0; // Sets compare_array to 0

  clearInterval(timerVar); // If the timer is running this stops it

  turn_counter = 0; // Sets turn_counter to 0
  turn_div.innerHTML = turn_counter; // Makes sure the reset turn count is displayed on screen
  timer = 0; // Sets timer to 0
  timer_div.innerHTML = timer; // Makes sure the reset timer is displayed in screen
  match_counter = 0; // Sets match_counter to 0
  click_counter = 0; // Sets click_counter to 0

  // This creates a h1 element displaying a count down until game starts, gives it the class .count_down, appends it to .board and sets a style connected to an animation to make it animate on to the screen. We use setTimeouts to change the text in steps from 3 to GO! and then gives it a different animation so that it moves out of sight.
  const count_down = document.createElement('h1');
  count_down.classList.add('count_down');
  board.appendChild(count_down);
  count_down.style.animation = "count_down_in .5s forwards";
  count_down.innerHTML = "3";
  setTimeout(function() {
    count_down.innerHTML = "2";
  }, 1000)
  setTimeout(function() {
    count_down.innerHTML = "1";
  }, 2000)
  setTimeout(function() {
    count_down.innerHTML = "GO!";
  }, 3000)
  setTimeout(function() {
    count_down.style.animation = "count_down_offset .5s forwards";
  }, 3100)

  // We wait 3 seconds, using a setTimeout, until all the cards have finnished animating and then start counting the time in seconds
  setTimeout(function() {
    timerVar = setInterval(function() { // This counts +1 to timer variable once every second
      timer++;
      timer_div.innerHTML = timer; // This changes the output of the timer_div to always display the time in seconds
    }, 1000);
  }, 3000);

  cards.sort(function(a, b) { // Sorts the cards array in a random order
    return 0.5 - Math.random()
  });

  // This loops through the cards array and creates a new card for each element, each consisting of a container a front and a back. We also use dataset to give each card a letter from the array so we can easily style each cards back and compare the cards later.
  cards.forEach((card) => {

    const card_container = document.createElement('div'); // Creates the divs
    card_container.classList.add('card_container'); // Adds the class .card_container
    card_container.dataset.letter = card; // Sets data-letter
    cards_div.appendChild(card_container); // Appends to .board element

    const offset_cards = document.querySelector('.card_container')
    offset_array.push(card_container); // We push each card_container into an array for later use

    const card_div_front = document.createElement('div'); // Creates the divs
    card_div_front.classList.add('card_front'); // Adds the class .card_front
    card_container.appendChild(card_div_front); // Appends to .card_container element

    const card_div_back = document.createElement('div'); // Creates the divs
    card_div_back.classList.add('card_back'); // Adds the class .card_back
    card_div_back.dataset.letter = card; // Sets data-letter
    card_container.appendChild(card_div_back); // Appends to .card_container element

    // This makes sure that you can't click the cards untill the last card is done animating and the timer starts counting
    card_container.style.pointerEvents = "none";
    setTimeout(function() {
      card_container.style.pointerEvents = "auto";
    }, 3000);
  })

  // Here we set a different duration for each cards initial animation using the array we pushed the card_containers to above
  offset_array[0].style.animationDuration = "3s";
  offset_array[1].style.animationDuration = "2.9s";
  offset_array[2].style.animationDuration = "2.8s";
  offset_array[3].style.animationDuration = "2.7s";
  offset_array[4].style.animationDuration = "2.3s";
  offset_array[5].style.animationDuration = "2.4s";
  offset_array[6].style.animationDuration = "2.5s";
  offset_array[7].style.animationDuration = "2.6s";
  offset_array[8].style.animationDuration = "2.2s";
  offset_array[9].style.animationDuration = "2.1s";
  offset_array[10].style.animationDuration = "2s";
  offset_array[11].style.animationDuration = "1.9s";
  offset_array[12].style.animationDuration = "1.5s";
  offset_array[13].style.animationDuration = "1.6s";
  offset_array[14].style.animationDuration = "1.7s";
  offset_array[15].style.animationDuration = "1.8s";

  // When a card is clicked we add a "flipped state-class" to it, to make them flip over with an animation. The animation is specified in main.css. We also add 1 to our click_counter. To make sure you cannot click the card again while it's turned over we set the CSS property pointer-events to "none" on the .card_container.
  const rendered_cards = document.querySelectorAll('.card_container');

  Array.from(rendered_cards).forEach((card) => {
    card.addEventListener('click', (e) => {

      card.style.pointerEvents = "none"; // Makes the turned over card not clickable

      const card_front_flipped = e.target.querySelector('.card_front');
      card_front_flipped.classList.add('card_front_flipped'); // Adds .card_front_flipped

      const card_back_flipped = e.target.querySelector('.card_back');
      card_back_flipped.classList.add('card_back_flipped'); // Adds .card_back_flipped

      const data_letter = e.target.getAttribute('data-letter'); // Retrieves the data-letter from the clicked card

      click_counter++; // Adds 1 to click_counter variable

      // Each time click_counter hits 2 we add 1 to turn_counter. We do this to keep track of how many turns the game has taken to complete.
      if (click_counter == 2) {
        turn_counter++;
        turn_div.innerHTML = turn_counter; // Updates the turn_counter on screen to display current turn count
      }

      // Everytime a card is clicked we add that cards data-letter to compare_array. This way we can check if the cards were a match or not. The front and back of the clicked card are also added. We do this so that we can easily remove the previously added .card_front_flipped and .card_back_flipped classes (making the cards flip back to their original states). Further we also add the .card_container (card) so that we can change CSS properties for it later. All of this happens as long as the compare_array contains less than 8 items.
      if (compare_array.length < 8) {
        compare_array.push(data_letter, card_front_flipped, card_back_flipped, card); // Pushes the data to the compare_array
      }

      // Now, when the compare_array contains 8 items (i.e after 2 cards have been turned), we need to check if the cards were a match or not.
      if (compare_array.length == 8) {

        // If the cards data-letters matched we set the compare_array's lengt to 0 again, thus removing all the previously pushed data. We also reset our click_counter back to 0 and update our match_counter with 1.
        if (compare_array[0] == compare_array[4]) {

          compare_array.length = 0; // Resets compare_array

          click_counter = 0; // Resets the click_counter

          match_counter++; // Adds 1 match to the match_counter

          // When match_counter reaches 8 you've won the game. We then create a div that will contain information on how well you did playing the game. We also stop the timer.
          if (match_counter == 8) {

            clearInterval(timerVar); // Stops timer

            setTimeout(function() {
              win_state = document.createElement('div'); // Creates win_state div
              win_state.classList.add('win_state'); // Gives it .win_state class
              board.appendChild(win_state); // Appends it to .game

              const winner = document.createElement('h1'); // Creates winner h1 tag
              winner.classList.add('winner'); // Gives it .winner class
              win_state.appendChild(winner); // Appends it to .win_state

              const stats = document.createElement('h3'); // Creates stats h3 tag
              stats.classList.add('stats'); // Gives it .stats class
              win_state.appendChild(stats); // Appends it to .win_state

              winner.innerHTML = "You won, well done!"; // Displays win message
              stats.innerHTML = "You did it in " + timer + " seconds and it took you " + turn_counter + " turns"; // Displays your stats
            }, 500);
          }
        }

        // When two cards have been turned and they did NOT match AND we click a third card (i.e click_counter hits 3) we remove the "flipped state-class" for each card in the compare_array, we set the .card_contianer's pointer-events back to "auto" (so that they are again clickable), we set the compare_array to 0 thus clearing the previusly pushed data, we set the click_counter to 0 but then add 1 to it again (since we just clicked a card that needs to be counted as 1 click) and lastly we push the newly clicked cards data to the compare_array.
        if (compare_array[0] != compare_array[4] && click_counter == 3) {

          compare_array[1].classList.remove('card_front_flipped'); // Flipps front of card 1
          compare_array[2].classList.remove('card_back_flipped'); // Flipps back of card 1
          compare_array[3].style.pointerEvents = "auto"; // Sets CSS property pointer-events to "auto" for card 1
          compare_array[5].classList.remove('card_front_flipped'); // Flipps front of card 2
          compare_array[6].classList.remove('card_back_flipped'); // Flipps back of card 2
          compare_array[7].style.pointerEvents = "auto"; // Sets CSS property pointer-events to "auto" for card 2

          compare_array.length = 0; // Clears compare_array of data

          click_counter = 0; // Sets click_counter back to 0

          click_counter++; // Adds 1 to click_counter to account for the newly clicked card

          compare_array.push(data_letter, card_front_flipped, card_back_flipped, card); // Pushes data of the newly clicked card to compare_array
        }
      }
    })
  })
})
