// Document Object Model
const timer = document.querySelector('#timer')
const start = document.querySelector('#start')
const pause = document.querySelector('#pause')
const clear = document.querySelector('#clear')
const pauseStatus = document.querySelector('#pause-status')
//

// Application Settings
const defaultTimer = 1000;
let timerUpdate, running = false;
let  hour = 0, minute = 0, second = 0;
//

// Time GET and SET methods
const setHour = (value) => { hour = value; }
const setMinute = (value) => { minute = value; }
const setSecond = (value) => { second = value; }

const getHour = () => hour;
const getMinute = () => minute;
const getSecond = () => second;
//

// Stopwatch running status
const setRunningStatus = (value = false) => running = value;
const getRunningStatus = () => running;
//

// Toggle pause status (show and hide methods)
const showPauseStatus = () => pauseStatus.classList.add('active')
const hidePauseStatus = () => pauseStatus.classList.remove('active')
//

// Pad with a leading zero
const fixNumber = (number) => number < 10 ? `0${number}` : number;
//

// Update timer HTML element
const updateTimer = () => timer.innerHTML = `${fixNumber(hour)}:${fixNumber(minute)}:${fixNumber(second)}`
//

const App = () =>
{
    pause.addEventListener('click', () => stopApp() )
    clear.addEventListener('click', () => stopApp(true) )

    start.addEventListener('click', () => {
        if(getRunningStatus() === false)
        {
            timerUpdate = setInterval(() => {
                setSecond(getSecond() + 1);
        
                if(getSecond() === 60)
                {
                    setSecond(0);
                    if(getMinute() < 59) { setMinute(getMinute() + 1); }
                    else 
                    {
                        setHour(getHour() + 1);
                        setMinute(0);
                    }
                }
                
                updateTimer();
            }, defaultTimer)
            setRunningStatus(true);
            hidePauseStatus()
        }
    })

    const stopApp = (clearButton = false) =>
    {
        switch(clearButton)
        {
            case true:
                setHour(0), setMinute(0), setSecond(0) 
                hidePauseStatus()
                break;

            case false:
                showPauseStatus()
                break;
        }
        setRunningStatus(false);
        clearInterval(timerUpdate)
        updateTimer()
    }
}

App();