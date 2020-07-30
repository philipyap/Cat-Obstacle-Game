
# Project 1 - Cat-Obstacle-Game 

## Introduction
#### This is an obstacle game that similar to Chrome Dinasour Game that the play would need to jump over the obstacles in order to keep the game going. The Cat is the player and the spikes are the obstacles that cat needs to jump to avoid from getting hit. It is an easy and simple game that everyone can play it. 

#### First, we create the palyer cat in html and css 
```
HTML=
<div class="grid">
         <div class="cat"></div>
</div> 

CSS=
.cat{
    width: 150px;
    height: 149px;
    position: absolute; 
    display: flex;
    bottom: 0px;
    background-image: url(image/cat1.png);
}    


```
#### Then, we create a key button for jumping while pressing "SPACE" key, and set the jump function for the player cat
```
JS=
const cat = document.querySelector('.cat')
const grid = document.querySelector('.grid')
let jumping = false
let gravity = 0.9

//Use Keycode(32) as the SPACE key; 
function pressed(e){  
       
        if(e.keyCode === 32) {
            if (!jumping){
                jumping = true;
                jump(); // execute jump if its true
            }   
        }
    }   
    document.addEventListener('keyup', pressed) // keyup= when the key is released on the keyboard

Set jump function for the player cat;
    
    function jump() {    
        let count = 0
        let timerId = setInterval(function(){
            //move down 
            if (count === 40){ //the count between the jump
                clearInterval(timerId)//to stop the up fuctionality
                // console.log('down')
                let downTimerId = setInterval(function (){
                    if (count === 0){
                        clearInterval(downTimerId)
                        // stop the item sink down
                        jumping = false; // only jump when its on the ground
                    }
                    position = position - 0.5; // how low it drops
                    count --
                    position = position * gravity; //*0.9
                    cat.style.bottom = position + 'px';
                }, 7)// the speed when it drops down
            }      
            //move up
            //console.log('up')
            position = position + 50; //how high it jumps
            count ++
            position = position * gravity;//*0.9
            cat.style.bottom = position + 'px'; 
        }, 5) //the speed when it jumps 
    }
```
#### After we have setup the player cat, we can create a new element and function for the obstacles which we are using spikes here. The gameover loop will be created in spike function as well.
```
css=
.spike{         
     width: 60px;
     height: 60px;
     position: absolute;
     display: flex;
     bottom: 10px ;
     background-image: url(image/spikes-png.png);
}

JS =
function allSpikes (){
        let randomTime = Math.random() * 4000 // * 4 second that obstacles come out 
        let spikePosition = 1500; // come from page
        const spike = document.createElement('div')
        if (!gameOver) spike.classList.add('spike')
        grid.appendChild(spike)
        spike.style.left = spikePosition + 'px';

        //set the obstacle running and gameover
        let timerId = setInterval(function(){
            
            spikePosition = spikePosition - 15; // speed of the obstacles
            spike.style.left = spikePosition + 'px';  
            
        }, 25)
        setTimeout(allSpikes, randomTime)//obstacles come out in random time
    }
    allSpikes()
```
#### The player cat and spikes should be able to jump and move now. Next, we create a new element and function for the clouds in JS file
```
CSS= 
.sky {
    display: flex;
    position: absolute;
    top: 30px;
    background-image: url(image/cloud10.png);
    width: 300px; 
    height: 167px;
}

JS=
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
```
#### After that, we can add some images and animation to the background
```
HTML=
<div id="house"></div>
<div id="tree"></div>
<div id="flower"></div>
<div id="grass"></div>
<div id="sun"></div>

CSS=
#tree{
    width: 500px;
    height: 559px;
    position: absolute;
    display: flex;
    left: -100px;
    bottom: 10px;
    background-image: url(image/cherry\ blossom.png);
}

#house{
    width: 600px;
    height: 266px;
    position: absolute;
    display: flex;
    bottom: 30px;
    right: -15px;
    background-image: url(image/house.png);
}

#sun {
    width: 250px ;
    height: 253px;
    top: 50px;
    right: 100px;
    position: absolute;
    display: flex;
    background-image: url(image/sun.png);
    animation: move 30s linear infinite;
    -webkit-animation: move 30s linear infinite ;
    -moz-animation: move 30s linear infinite;   
    
}

#flower{
    display: flex;
    position: absolute;
    bottom: 20px;
    background-image: url(image/flower2.png);
    background-repeat: repeat-x;
    width: 200%; 
    height: 90px;
    animation: slideright 2000s infinite linear;
    -webkit-animation: slideright 2000s infinite linear;
}

#grass{
    display: flex;
    position: absolute;
    bottom: 10px;
    background-image: url(image/background.png);
    background-repeat: repeat-x;
    width: 200%; 
    height: 92px;
    animation: slideright 2000s infinite linear;
    -webkit-animation: slideright 2000s infinite linear;
  }

  @keyframes move {
   
    100%{
         -webkit-transform: rotate(360deg);
    }
  }
  
  @-webkit-keyframes move {
     
     100%{
        -webkit-transform: rotate(360deg);
    }
  } 
   
  @-moz-keyframes move{
      100%{
        -webkit-transform: rotate(360deg);
      }
  }
  
  @keyframes slideright {
    from {
        background-position: 10000%;
    }
    to {
        background-position: 0%;
    }
  }
  
  @-webkit-keyframes slideright {
    from {
        background-position: 10000%;
    }
    to {
        background-position: 0%;
    }
  }
```
#### The jump sound effect can be add it in to make the game lively. The play() is created in pressed function
```
HTML=
<audio src="./music/button-14.wav" id= "sound"></audio>

JS=
let jumpSound = document.getElementById('sound');

if(jumping = true){ // the text gets invisible only when player press space key
            jumpSound.play(); // HERE
        }
```
#### We want the player knows that the game starts by pressing the "SPACE" key. In order to do that, we add the text element and hide it while the player press the "SPACE" key. the invisible text loop sets in pressed function
```
HTML=
<div class="text">press 'SPACE' key to jump</div>

CSS=
.text{
    font-size: 20px;
    color: lightgray;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    font-weight: bold;
    display: flex;
    position: absolute;
    top: 180px;
    left: 400px;
} 

JS=
const text = document.querySelector('.text')

text.style.opacity= 1;

if(jumping = true){ // the text gets invisible only when player press space key
            text.style.opacity = 0;
            jumpSound.play();
        }
        else{
            text.style.opacity = 1;
        }
```

#### We also want the player to see the count up timer while the game runs
```
HTML=
<div id="timer"></div>

CSS=
#timer{
    font-size: 25px;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    color: gray;
    font-weight: bold;
    display: flex;
    position: absolute;
    top: 200px;
    left: 400px;
}  

JS=
const timer = document.querySelector('#timer')

let timerId = setInterval(countTimer, 1000) //  called by setInterval function every second
let totalSeconds = 0;

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

```
#### In order to stop the game, the play needs to be hit by a spike. Therefore, we create a gameover loop in allSpike fuction to stop the game if gameover is true
```
const reset = document.querySelector('#reset')
reset.style.opacity= 0;
let gameOver = false
let timerId = setInterval(function(){
            if (spikePosition > 0 && spikePosition < 90 && position < 90)  { // spikes and cat position
                clearInterval(timerId);
                gameOver = true; 
                reset.style.opacity= 1;
                while (grid.firstChild) { // remove all the grid children: the player cat and spikes
                grid.removeChild(grid.lastChild)}
            }
            else{           
            spikePosition = spikePosition - 15; // speed of the obstacles
            spike.style.left = spikePosition + 'px';  
            } 
        }, 30)
          if (!gameOver)setTimeout(allSpikes, randomTime)//obstacles come out in random time
    
```
#### Lastly, we create a reset button to restart the game when the player clicks it
```
HTML=
<button type ="reset" id="reset">Reset ?</button>

CSS=
#reset{
    border-radius: 10px;
    margin: 100px 200px 0 500px ;
    font-size: 30px;
    display: flex;   
}

JS=
const reset = document.querySelector('#reset')

//reset button
    reset.addEventListener('click', function(){
        location.reload()

```