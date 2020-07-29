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
            timer.innerHTML = hour + ":" + minute + ":" + seconds; //add the result in a div called 'timer'          
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

            if (count === 20){ //how long it takes to the jump
                clearInterval(timerId)
                //to stop the up fuctionality
            // console.log('down')

                let downTimerId = setInterval(function (){
                    if (count === 0){
                        clearInterval(downTimerId)
                        // stop the item sink down
                        jumping = false; // only jump when its on the ground
                    }
                    position = position - 5;
                    count --
                    position = position * gravity; 
                    
                    cat.style.bottom = position + 'px';
                }, 15)
            }      
            //move up
            //console.log('up')
            position = position + 50; //how high it jumps
            count ++
            position = position * gravity;
            cat.style.bottom = position + 'px';
        }, 10) //the speed of the cat 

    }
    
    function allClouds (){
        let randomTime = Math.random() * 6000 // * 5 second that obstacles come out 
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
                
                skyPosition = skyPosition - 5;
                sky.style.left = skyPosition + 'px';
            }
        }, 40)//set the cloud running
            if(!gameOver)setTimeout(allClouds, randomTime)
            
        
} allClouds()  
    

    function allObstacles (){
        //reset.style.opacity= 0;
        //cat.style.opacity=1;
        let randomTime = Math.random() * 6000 // * 6 second that obstacles come out 
        let obstaclePosition = 1500; // come from page
        const obstacle = document.createElement('div')
        if (!gameOver) obstacle.classList.add('obstacle')
        grid.appendChild(obstacle)
        obstacle.style.left = obstaclePosition + 'px';


        //set the obstacle running
        let timerId = setInterval(function(){
            if (obstaclePosition > 0 && obstaclePosition < 60 && position < 60)  {
                clearInterval(timerId);
                gameOver = true; 
                reset.style.opacity= 1;
                //cat.style.opacity=1;
                //obstacle.style.opacity=0;       
                while (grid.firstChild) { // remove all the grid children
                grid.removeChild(grid.lastChild)}
                //document.querySelectorAll('.obstacle')
            }
            else{
            
            obstaclePosition = obstaclePosition - 1; //speed of obstacle
            obstacle.style.left = obstaclePosition + 'px';  
            } 
        }, 10)
          if (!gameOver)setTimeout(allObstacles, randomTime)//obstacles come out in random time
    }
    allObstacles()

        reset.addEventListener('click', function(){
        location.reload()
    })
})


