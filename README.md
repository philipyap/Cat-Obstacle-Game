
# Project 1 - Cat-Obstacle-Game 

## Intro
#### This is an obstacle game that similar to Chrome Dinasour Game that the play would need to jump over the obstacles in order to keep the game going. The Cat is the player and the spikes are the obstacles that cat needs to jump to avoid from getting hit.

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
Use Keycode(32) as the SPACE key; 
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
#### After we have setup the player cat, we can create a new element and function for the obstacles which we are using spikes here. The gameover loop is also created in spike function as well.
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
            if (spikePosition > 0 && spikePosition < 100 && position < 100)  { // spikes and cat position
                clearInterval(timerId);
                gameOver = true; 
                reset.style.opacity= 1;
                while (grid.firstChild) { // remove all the grid children: cat and spikes
                grid.removeChild(grid.lastChild)}
            }
            else{           
            spikePosition = spikePosition - 15; // speed of the obstacles
            spike.style.left = spikePosition + 'px';  
            } 
        }, 25)
          if (!gameOver)setTimeout(allSpikes, randomTime)//obstacles come out in random time
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

