const horn = document.getElementById('alert-sound');

const workSoundSelector = document.getElementById('workSoundSelector');
const breakSoundSelector = document.getElementById('breakSoundSelector');
const airHorn = './assets/audio/air-horn.mp3';
const celebration = './assets/audio/celebration.mp3';
const error = './assets/audio/error.mp3';
const noot = './assets/audio/noot.mp3';
const ping = './assets/audio/ping.mp3';
const siren = './assets/audio/siren.mp3';
const muteSwitch = document.getElementById('muteSwitch');

let workModeSoundPath = airHorn;
let breakModeSoundPath = celebration;

/**
 * Function that handles the logic for playing the sound
 * upon switching to work mode.
 */
export function workModeSound() {
  if (muteSwitch.checked === true) {
    return;
  }
  horn.setAttribute('src', workModeSoundPath);
  horn.play();
}

/**
 * Function that handles the logic for playing the sound
 * upon switching to break mode.
 */
export function breakModeSound() {
  if (muteSwitch.checked === true) {
    return;
  }
  horn.setAttribute('src', breakModeSoundPath);
  horn.play();
}

/**
 * Handles the changing of the sounds in settings.
 * @param {Event} e 
 */
function changeSound(e) {
  let path;
  switch (e.target.value) {
    case 'horn':
      path = airHorn;
      break;
    case 'celebration':
      path = celebration;
      break;
    case 'error':
      path = error;
      break;
    case 'noot':
      path = noot;
      break;
    case 'ping':
      path = ping;
      break;
    case 'siren':
      path = siren;
      break;
    default:
      path = airHorn;
      break;
  }
  if (muteSwitch.checked === false) {
    horn.setAttribute('src', path);
    horn.play();
  }
  if (e.target.id === 'workSoundSelector') {
    workModeSoundPath = path;
  } else {
    breakModeSoundPath = path;
  }
}

/**
 * add event listeners to the select menus
 */
workSoundSelector.addEventListener('change', changeSound);
breakSoundSelector.addEventListener('change', changeSound);
