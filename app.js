const App = () =>
{
    const timer = document.querySelector('#timer')
    const start = document.querySelector('#start')
    const pause = document.querySelector('#pause')
    const clear = document.querySelector('#clear')
    const pauseStatus = document.querySelector('#pause-status')
    let timerUpdate, running = false;
    let  hour = 0, minute = 0, second = 0;

    const fixNumber = (number) => 
    {
        let FixedNumber = number < 10 ? `0${number}` : number;
        return FixedNumber;
    }

    const updateTimer = () => timer.innerHTML = `${fixNumber(hour)}:${fixNumber(minute)}:${fixNumber(second)}`

    const stopApp = (zero = false) =>
    {
        switch(zero)
        {
            case true:
                hour = 0, minute = 0, second = 0 
                pauseStatus.classList.remove('active')
                break;

            case false:
                pauseStatus.classList.add('active')
                break;
        }
        running = false;
        clearInterval(timerUpdate)
        updateTimer()
    }

    pause.addEventListener('click', () => stopApp() )
    clear.addEventListener('click', () => stopApp(true) )
    
    start.addEventListener('click', () => {
        if(running === false)
        {
            timerUpdate = setInterval(() => {
                second++;
        
                if(second === 60)
                {
                    second = 0;
                    if(minute < 59) { minute++; }
                    else 
                    {
                        hour++;
                        minute = 0;
                    }
                }
                
                updateTimer();
            }, 1000)
            running = true;
            pauseStatus.classList.remove('active')
        }
    })
    
}

App();