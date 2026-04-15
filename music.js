const bgMusic = new Audio("assets/bg.wav");

bgMusic.loop = true;

bgMusic.volume = 0.1;
bgMusic.preload = "auto";

let isMusicPlaying = false;

function startMusicPlay(){
    if(!isMusicPlaying){
        bgMusic.play().then(()=>{
            isMusicPlaying = true;
        }).catch(err=>{
            console.log("Browser Blocked The Audio:",err);
        })
    }
};

document.addEventListener('click',startMusicPlay);
document.addEventListener('keydown',startMusicPlay);