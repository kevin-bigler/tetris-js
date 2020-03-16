# TODO

- add linting (`eslint`)
- add types in an opt-in fashion (`flow` + `flow-runtime`)
- inject configuration instead of hard-coding it in class properties
- add config yaml files
- inject dependencies
- create event-based system for handling input and game state
- modify piece factory
- modify rotation logic
- add more UI elements to the game board:
    - timer (counting UP)
    - score
    - preview next piece
    - level number (gravity value)
- playtest & update gravity setup
- create scoring logic
- create unit tests
- swap `console.log`s for a logger, like `bunyan`, `winston`, or `roarr` + configure log level options
- add menus

## 3/15/2020

- switch to game loop
- create a "do every x milliseconds" interface/tool. integrate in game loop. probably a singleton that manages time-based events
    - can use for drawing
    - can use for checking game state
    - can use for taking input/converting to game "triggered" events like moving a piece or pressing pause
- create game states so we can pause, menu, etc

### TimedEventsManager

- (en)queue / set / add
    - callback, time (duration/interval), repeat (bool, default true)
    
### GameEventsManager

these are triggered. basically, do this next chance we get.

often caused by input (eg b/c left is pressed, trigger a GameEvent "Move Piece Left")

- (en)queue
- flush (do this on a schedule, ie with the TimedEventsManager)

examples:
- pause / unpause
- open menu
- rotate piece clockwise
- rotate piece counterclockwise
- move piece left/right/down
- update points (?)
- win
- lose
- open X screen
