
document.addEventListener('DOMContentLoaded', () => {
const cat= document.querySelector('.cat')
const grid = document.querySelector('.grid')
let jumping = false;
let gravity = 0.9;
let gameOver = false

function pressed(e){
    if(e.keyCode === 32) {
        if(jumping !== true){
            jump(); // essequt jump if its true
        }
        //console.log('works')
        jump();
    }
}
document.addEventListener('keyup', pressed) // keyup= when the key is released on the keyboard
let position = 0;// the position space that cat moving upward
function jump() {
     
     let count = 0
     let timerId = setInterval(function(){
        //move down 

        if (count === 20){
            clearInterval(timerId)
            //to stop the up fuctionality
            console.log('down')
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
            }, 5)
            
        }
               
        //move up 
        
        console.log('up')
        count ++
        position = position + 30; 
        position = position * gravity;
        cat.style.bottom = position + 'px';

    }, 5) //the speed of the cat 

}

    function allObstacles (){
        let randomTime = Math.random() * 4000 // * 4 second that obstacles come out 
        let obstaclePosition = 1000;
        const obstacle = document.createElement('div')
        obstacle.classList.add('obstacle')
        grid.appendChild(obstacle)
        obstacle.style.left = obstaclePosition + 'px';

        //set the obstacle running
        let timerId = setInterval(function(){
            if (obstaclePosition > 0 && obstaclePosition < 60 && position < 60) {
                clearInterval(timerId)
                alert('GameOver!')
                gameOver = true; 
            }

            obstaclePosition = obstaclePosition - 5; //speed of obstacle
            obstacle.style.left = obstaclePosition + 'px';
            
        }, 50)
         if (!gameOver) setTimeout(allObstacles, randomTime) //obstacles come out in random time
    }
    allObstacles()

})

