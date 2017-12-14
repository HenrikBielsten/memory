

// The array that will be used to render the cards and to give each one an id
const cards = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H']

const game = document.querySelector('.game');
const board = document.querySelector('.board');
const instructions = document.querySelector('.instructions');
const cards_div = document.querySelector('.cards_div');
const start = document.querySelector('.start_button');
const timer_div = document.querySelector('.time_number');
const turn_div = document.querySelector('.turn_number');

// Arrays that will be updated during game play
const offset_array = [] // We push each created card to this array so that we can change animations for each card individually
const compare_array = [] // This is an empty array to which, when a card is clicked, we push values that we want to compare to see if they match.

// Counters used to keep track of different values during game play
var click_counter = 0; // This counts +1 each time a card is clicked. We use this to know when to turn over cards that did not match.
var turn_counter = 0; // This counts +1 each time click_counter hits 2. We use this value to show the user how many turns the game took them.
var timer = 0; // Counts the time from start of game to win state.
var match_counter = 0; // Counts number of matches. 8 means you win.

// Variables that change when
var timerVar = null; // Used to set a timer to count +1 every second with an interval. Also used to clear said interval and stop time.
var win_state = null; // Used to check if game has been won or not when pressing start.
