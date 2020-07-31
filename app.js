document.addEventListener('DOMContentLoaded', () =>{
    const cat = document.querySelector('.cat')
    const grid = document.querySelector('.grid')
    const text = document.querySelector('.text')
    const reset = document.querySelector('#reset')
    const timer = document.querySelector('#timer')
    let jumpSound = document.getElementById('sound');
    reset.style.opacity= 0;
    text.style.opacity= 1;
    let jumping = false
    let gravity = 0.9
    let gameOver = false
    let position = 0;// the position space that cat moving upward   
    let timerId = setInterval(countTimer, 1000) //  called by setInterval function every second
    let totalSeconds = 0;
    
    reset.addEventListener('click', function(){
        location.reload()
    })

    //count up timer
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
    
    //space keycode
    function pressed(e){   
        if(e.keyCode === 32) { //space key
            if (!jumping){
                jumping = true;
                jump(); // execute jump if its true
            }   
        }
        if(jumping = true && !gameOver){ 
            text.style.opacity = 0; //"press space key t0 jump" text will be gone
            jumpSound.play(); // sound FX play when game starts
        }
        else{
            text.style.opacity = 1;
        }
    }   
    document.addEventListener('keyup', pressed) // keyup= when the key is released on the keyboard

    // function for the cat : set height count, the gravity, and speed when it goes up and down.
    function jump() {    
        let count = 0
        let timerId = setInterval(function(){
            //move down 
            if (count === 40){ //the height counts between the jump
                clearInterval(timerId)// stop jumping up
                // console.log('down')
                let downTimerId = setInterval(function (){
                    if (count === 0){
                        clearInterval(downTimerId)// stop the item sink down
                        jumping = false; // only jump when its on the ground
                    }
                    position = position - 0.5; // how low it drops
                    count --
                    position = position * gravity; //*0.9
                    cat.style.bottom = position + 'px';
                }, 10)// the speed when it drops down
            }      
            //move up
            //console.log('up')
            position = position + 50; //how high it jumps
            count ++
            position = position * gravity;//*0.9
            cat.style.bottom = position + 'px'; 
        }, 5) //the speed when it jumps 
    }
    
    //cloud function :
    function allClouds (){
        let randomTime = Math.random() * 4000 // * 4 second that cloud come out 
        let skyPosition = 1500; // where the clouds come in from page
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
        }, 15)//set the multiple clouds running speed
            if(!gameOver)setTimeout(allClouds, randomTime)       
    } allClouds()  
    
    //spikes and gameover 
    function allSpikes (){
        let randomTime = Math.random() * 5000 // * 5 second that obstacles come out 
        let spikePosition = 1500; // come from page
        const spike = document.createElement('div')
        if (!gameOver) spike.classList.add('spike')
        grid.appendChild(spike)
        spike.style.left = spikePosition + 'px';

        // gameover function
        let timerId = setInterval(function(){
            if (spikePosition > 0 && spikePosition < 90 && position < 90)  { // spikes and cat position
                clearInterval(timerId);
                gameOver = true;       
                reset.style.opacity= 1; // shows reset button
                sun.style.animation = 'pause'; // sun animation stop
                grass.style.animation = 'pause'; // grass animation stop
                flower.style.animation = 'pause'; //flower animation stop
                while (grid.firstChild) { // remove all the grid children: the player cat and spikes
                grid.removeChild(grid.lastChild)}
            }
            else{           
            spikePosition = spikePosition - 15; // speed of the obstacles
            spike.style.left = spikePosition + 'px';  
            } 
        }, 35)
          if (!gameOver)setTimeout(allSpikes, randomTime)//obstacles come out in random time
    }
    allSpikes()   
 
})


