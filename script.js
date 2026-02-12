const audio = document.getElementById('bg-audio');
const video = document.getElementById('background-video');
const overlay = document.getElementById('overlay-start');
const mainContent = document.getElementById('main-content');
const volumeSlider = document.getElementById('volume-slider');


audio.volume = volumeSlider.value || 0.5;

function initPage() {

    audio.play().catch(e => console.log("Erreur audio:", e));
    

    video.play();
    

    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.display = 'none';
        mainContent.style.opacity = '1';
    }, 500);
}


let lastVolume = volumeSlider.value;

function toggleMute() {
    if (audio.volume > 0) {
        lastVolume = audio.volume;
        audio.volume = 0;
        volumeSlider.value = 0;
    } else {
        audio.volume = lastVolume || 0.5;
        volumeSlider.value = audio.volume;
    }
    updateIcon(audio.volume);
}


volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value;
    updateIcon(audio.volume);
});


function updateIcon(val) {
    if (val == 0) {
        volumeIcon.className = "fa-solid fa-volume-xmark";
    } else if (val < 0.5) {
        volumeIcon.className = "fa-solid fa-volume-low";
    } else {
        volumeIcon.className = "fa-solid fa-volume-high";
    }
}
