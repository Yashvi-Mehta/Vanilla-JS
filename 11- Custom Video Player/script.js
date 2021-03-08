const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
//this is selecting all functions by attribute- [data-skip]
const ranges = player.querySelectorAll('.player__slider');

// Functions
function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
    // if (video.paused) {
    //     video.play()
    // }
    // else { video.pause(); }
}

function updateButton() {
    const icon = video.paused ? '►' : '❚ ❚';
    console.log(icon);
    toggle.textContent = icon;
}

function skip() {
    console.log(this.dataset);
    // gives the value associated to data-skip attribute
    video.currentTime += parseFloat(this.dataset.skip);
    //as skip is the value in dataset that we want to extract but it comes as a String so parse it
}

function handleRangeUpdate() {
    console.log(this.value);
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = video.currentTime / video.duration * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
    console.log(e);
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime=scrubTime;
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('click', handleRangeUpdate));
progress.addEventListener('mouseup',scrub);

// let mousedown = false;
// progress.addEventListener('click', scrub);
// progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
// progress.addEventListener('mousedown', () => mousedown = true);
// progress.addEventListener('mouseup', () => mousedown = false);