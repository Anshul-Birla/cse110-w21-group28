/**
 * audio element for alert
 * @type {HTMLAudioElement}
 */
const horn = document.getElementById('alert-sound');
/**
 * the selector for work sound
 * @type {HTMLSelectElement}
 */
const workSoundSelector = document.getElementById('workSoundSelector');
/**
 * the selector for break sound
 * @type {HTMLSelectElement}
 */
const breakSoundSelector = document.getElementById('breakSoundSelector');
/**
 * string constant for air horn path
 * @type {String}
 */
const airHorn = './assets/audio/air-horn.mp3';
/**
 * string constant for celebration path
 * @type {String}
 */
const celebration = './assets/audio/celebration.mp3';
/**
 * string constant for error path
 * @type {String}
 */
const error = './assets/audio/error.mp3';
/**
 * string constant for noot path
 * @type {String}
 */
const noot = './assets/audio/noot.mp3';
/**
 * string constant for ping path
 * @type {String}
 */
const ping = './assets/audio/ping.mp3';
/**
 * string constant for siren path
 * @type {String}
 */
const siren = './assets/audio/siren.mp3';
/**
 * mute switch element
 * @type {HTMLInputElement}
 */
const muteSwitch = document.getElementById('muteSwitch');
/**
 * global to hold current selected path
 * @type {String}
 */
let workModeSoundPath = airHorn;
/**
 * global to hold current selected path
 * @type {String}
 */
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
