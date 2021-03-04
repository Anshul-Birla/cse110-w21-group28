import {
    shortButtonColor, shortTimerColor, shortPageColor
} from './ColorVariables.js';

export function changeColor(document){
    const root = document.documentElement;
    const body = document.getElementByTagName('Body')[0];
    const timer = document.getElementById('')
    root.style.setProperty('--page-bg-color', shortPageColor);
    root.style.setProperty('--button-color', shortButtonColor);
    root.style.setProperty('--timer-bg-color', shortTimerColor);
    setAnimations(document);
}

function changeBody(body) {
    body.style.backgroundColor = '--page-bg-color-short';
    body.style.animation = 'background-animation';
    body.style.animationDuration = '2s';
}

function changeContainers(timerContainer) {
    timerContainer.style.backgroundColor = '--timer-bg-color-short';
    timerContainer.style.animation = 'timer-animation';
    timerContainer.style.animationDuration = '2s';
}