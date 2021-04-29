// Defining constants
const video = document.getElementById('video');
const play = document.getElementById('play');
const stopp = document.getElementById('stop');//the extra "p" was added to fix a naming conflict, see below.
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

// This function plays and pauses the video. 
function toggleVideoStatus() {
    if (video.paused) {
        video.play();
       }   else {
        video.pause();
    }
}

//This function swaps the play and pause buttons.
function updatePlayIcon() {
    if(video.paused) {
        play.innerHTML = '<i class="far fa-play-circle fa-2x"></i>';
    }   else {
        play.innerHTML = '<i class="far fa-pause-circle fa-2x"></i>';
    }
}

//Updates the progress bar
function updateProgress() {
    progress.value = (video.currentTime / video.duration) * 100;

    //gets the minutes
    let mins = Math.floor(video.currentTime / 60);
    if(mins < 10) {
        mins = '0' + String(mins);
    }
    
    //gets the seconds
    let secs = Math.floor(video.currentTime % 60);
    if(secs < 10) {
        secs = '0' + String(secs);
    }

    //updates displayed time
    timestamp.innerHTML = `${mins}:${secs}`;
}

//Updates video progress bar and allows you to set progress with the bar.
function setVideoProgress() {
    video.currentTime = (+progress.value * video.duration) / 100;
}

//Pauses and resets video.
function stopVideo() {
    video.currentTime = 0;
    video.pause();
}

// Event Listeners.
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);

play.addEventListener('click', toggleVideoStatus);

// Ugh, I struggled with this stupid event listener when it was named "stop". 
// It came up as a function that is declared in the font awesomes script...maybe?, instead of the constant I defined.
// I changed the name for now, but I'm sure there is a way to designate importance or precedence of one 
// function over another or at least a better way to do this. 
stopp.addEventListener('click', stopVideo);

progress.addEventListener('change', setVideoProgress);
