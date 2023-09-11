const dogImage = document.getElementById('dogImage');
const audio = document.getElementById('audio');
let isPlaying = false;
async function fetchRandomDogImage() {
    try {
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        const data = await response.json();
        const imageUrl = data.message;
        dogImage.src = imageUrl;
    } catch (error) {
        console.error('Error al cargar la imagen del perro:', error);
    }
}

dogImage.addEventListener('click', () => {
    if (!isPlaying) {
        audio.play();
        isPlaying = true;
    }
    fetchRandomDogImage();
});