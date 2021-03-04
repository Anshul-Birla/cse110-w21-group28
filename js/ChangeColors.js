export function shortBreakColors(document){
    const body = document.getElementsByTagName('Body')[0];
    body.classList.add('short-break');

}

export function workModeColors(document){
    const body = document.getElementsByTagName('Body')[0];
    body.classList.remove('short-break');
    body.classList.remove('long-break');
}

export function longBreakColors(document){
    const body = document.getElementsByTagName('Body')[0];
    body.classList.add('long-break');
}