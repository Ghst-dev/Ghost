const audio = document.getElementById('bg-audio');
const video = document.getElementById('background-video');
const overlay = document.getElementById('overlay-start');
const mainContent = document.getElementById('main-content');
const volumeSlider = document.getElementById('volume-slider');

// On pré-réglage le volume
audio.volume = volumeSlider.value || 0.5;

function initPage() {
    // 1. Lance la musique
    audio.play().catch(e => console.log("Erreur audio:", e));
    
    // 2. Lance la vidéo (si elle était en pause)
    video.play();
    
    // 3. Cache l'écran de démarrage et affiche le site
    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.display = 'none';
        mainContent.style.opacity = '1';
    }, 500);
}

// Gestion du bouton Mute (clic sur l'icône)
let lastVolume = volumeSlider.value;

function toggleMute() {
    if (audio.volume > 0) {
        lastVolume = audio.volume;
        audio.volume = 0;
        volumeSlider.value = 0;
    } else {
        audio.volume = lastVolume || 0.5; // Reprend le dernier volume ou 50% par défaut
        volumeSlider.value = audio.volume;
    }
    updateIcon(audio.volume);
}

// Gestion du slider (barre de son)
volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value;
    updateIcon(audio.volume);
});

// Mise à jour visuelle de l'icône
function updateIcon(val) {
    if (val == 0) {
        volumeIcon.className = "fa-solid fa-volume-xmark";
    } else if (val < 0.5) {
        volumeIcon.className = "fa-solid fa-volume-low";
    } else {
        volumeIcon.className = "fa-solid fa-volume-high";
    }
}