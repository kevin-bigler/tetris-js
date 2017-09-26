import * as PIXI from 'pixi.js';
// import {Application} from 'pixi.js';
// import GreatDane from './GreatDane2.js';
import GameEngine from './GameEngine.js';

console.log('');
console.log('');
console.log('');
console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-');
console.log('MY AWESOME APP');
console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-');
console.log('');
console.log('');


const gameEngine = new GameEngine();
gameEngine.initialize();
gameEngine.newGame();