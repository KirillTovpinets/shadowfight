const express = require('express');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');

const router = express.Router();

function arithmTask(task, level) {
  const gameTask = task;
  const operators = ['*', '/', '-', '+'];
  let max = 0;
  let min = 0;
  let operatorIndex = 0;
  let firstOperand = '';
  let secondOperand = '';
  let solution = 0;
  operatorIndex = Math.floor(Math.random() * (operators.length));
  const operator = operators[operatorIndex];
  switch (level) {
    case 1:
      max = 10;
      break;
    case 2:
      max = 15;
      break;
    case 3:
      max = 20;
      min = 5;
      break;
    case 4:
      max = 25;
      min = 10;
      break;
    case 5:
      max = 30;
      min = 15;
      break;
    default:
      break;
  }
  firstOperand = Math.floor(Math.random() * (max - min)) + min;
  secondOperand = Math.floor(Math.random() * (max - min)) + min;
  switch (operator) {
    case '*':
      solution = firstOperand * secondOperand;
      gameTask.task = `${firstOperand} * ${secondOperand}`;
      break;
    case '/':
      if (firstOperand < secondOperand) {
        firstOperand *= secondOperand;
      }
      solution = firstOperand / secondOperand;
      gameTask.task = `${firstOperand} / ${secondOperand}`;
      break;
    case '-':
      solution = firstOperand - secondOperand;
      gameTask.task = `${firstOperand} - ${secondOperand}`;
      break;
    case '+':
      solution = firstOperand + secondOperand;
      gameTask.task = `${firstOperand} + ${secondOperand}`;
      break;
    default:
      break;
  }
  gameTask.solution = solution;
  return gameTask;
}
function getWord(level) {
  const vocabulary = JSON.parse(fs.readFileSync(path.join(__dirname, '../../dist/game/assets/data/vocabulary.json')));
  const minLetter = 3;
  const maxLetter = minLetter + level;
  const words = _.filter(vocabulary, word => word.english.length < maxLetter);
  const wordIndex = Math.floor(Math.random() * words.length);
  return words[wordIndex];
}
function traslationTask(task, level) {
  const gameTask = task;
  const taskWord = getWord(level);
  gameTask.task = taskWord.english;
  gameTask.solution = taskWord.russian;
  return gameTask;
}

function dragdropTask(task, level) {
  const gameTask = task;
  const word = getWord(level);
  const wordArr = word.english.split('');
  const shuffled = _.shuffle(wordArr);
  gameTask.task = shuffled;
  gameTask.solution = wordArr;
  return gameTask;
}

router.use('/', (req, res) => {
  const params = req.body;
  const taskList = JSON.parse(fs.readFileSync(path.join(__dirname, '../../dist/game/assets/data/tasks.json')));
  let task = taskList.find(el => el.type === params.type);
  let word = {};
  switch (params.type) {
    case 'arithmetics':
      task = arithmTask(task, params.level);
      break;
    case 'translation':
      task = traslationTask(task, params.level);
      break;
    case 'drag&drop':
      task = dragdropTask(task, params.level);
      break;
    case 'audio':
      word = getWord(params.level);
      task.task = word.english;
      task.solution = word.english;
      break;
    default:
      break;
  }
  res.send(task);
});
module.exports = router;
