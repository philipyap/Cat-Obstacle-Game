document.addEventListener('DOMContentLoaded', () =>{
    const cat= document.querySelector('.cat')
    const grid = document.querySelector('.grid')
    const text = document.querySelector('.text')
    const reset = document.querySelector('#reset')
    const timer = document.querySelector('#timer')
    reset.style.opacity= 0;
    text.style.opacity= 1;
    let jumping = false
    let gravity = 0.9
    let gameOver = false
    let position = 0;// the position space that cat moving upward   
    let timerId = setInterval(countTimer, 1000) //  called by setInterval function every second
    let totalSeconds = 0;

    function countTimer(){
        if(!gameOver){
            ++totalSeconds;
            let hour = Math.floor(totalSeconds / 3600) // count hour
            let minute = Math.floor((totalSeconds- hour * 3600) / 60); //count minute: substruct hours secounds from total seconds
            let seconds = totalSeconds-(hour*3600 + minute*60); // count seconds: substruct hours and minutes seconds from total seconds
            timer.innerHTML = "TIMER: " + hour + ":" + minute + ":" + seconds; //add the result in a div called 'timer'          
        }
        else{
            clearInterval(timerId);
        } 
    }
    countTimer()
    
    function pressed(e){      
        if(e.keyCode === 32) {
            if (!jumping){
                jumping = true;
                jump(); // execute jump if its true
            }   
        }
        if(jumping = true){
            text.style.opacity = 0;
        }
        else{
            text.style.opacity = 1;
        }
    }
    
    document.addEventListener('keyup', pressed) // keyup= when the key is released on the keyboard

    function jump() {    
        let count = 0
        let timerId = setInterval(function(){
            //move down 
            if (count === 30){ //the count between the jump
                clearInterval(timerId)
                //to stop the up fuctionality
                // console.log('down')
                let downTimerId = setInterval(function (){
                    if (count === 0){
                        clearInterval(downTimerId)
                        // stop the item sink down
                        jumping = false; // only jump when its on the ground
                    }
                    position = position - 2; // how low it drops
                    count --
                    position = position * gravity; 
                    cat.style.bottom = position + 'px';
                }, 10)// the speed when it drops down
            }      
            //move up
            //console.log('up')
            position = position + 50; //how high it jumps
            count ++
            position = position * gravity;
            cat.style.bottom = position + 'px'; 
        }, 10) //the speed when it jumps 
    }
    
    function allClouds (){
        let randomTime = Math.random() * 6000 // * 6 second that cloud come out 
        let skyPosition = 1500; // come from page
        const sky = document.createElement('div') 
        if(!gameOver)sky.classList.add('sky')
        grid.appendChild(sky)
        sky.style.left = skyPosition + 'px';  
        let timerId = setInterval(function(){
            if(gameOver){
                clearInterval(timerId)
            }        
            else{
                skyPosition = skyPosition - 3; // speed of the cloud
                sky.style.left = skyPosition + 'px';
            }
        }, 30)//set the multiple clouds running speed
            if(!gameOver)setTimeout(allClouds, randomTime)       
    } allClouds()  
    
    function allObstacles (){
        let randomTime = Math.random() * 4000 // * 7 second that obstacles come out 
        let obstaclePosition = 1500; // come from page
        const obstacle = document.createElement('div')
        if (!gameOver) obstacle.classList.add('obstacle')
        grid.appendChild(obstacle)
        obstacle.style.left = obstaclePosition + 'px';

        //set the obstacle running
        let timerId = setInterval(function(){
            if (obstaclePosition > 0 && obstaclePosition < 100 && position < 100)  {
                clearInterval(timerId);
                gameOver = true; 
                reset.style.opacity= 1;       
                while (grid.firstChild) { // remove all the grid children
                grid.removeChild(grid.lastChild)}
            }
            else{           
            obstaclePosition = obstaclePosition - 15; // speed of the obstacles
            obstacle.style.left = obstaclePosition + 'px';  
            } 
        }, 30)
          if (!gameOver)setTimeout(allObstacles, randomTime)//obstacles come out in random time
    }
    allObstacles()

    reset.addEventListener('click', function(){
        location.reload()
    })
})


