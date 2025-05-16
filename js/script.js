const dogImage = document.getElementById('dogImage');
const audio = document.getElementById('audio');
const loader = document.getElementById('loader');

let isPlaying = false;
let isLoading = false;

async function fetchRandomDogImage() {
    if (isLoading) return;

    isLoading = true;
    loader.classList.remove('hidden');

    dogImage.style.opacity = 0;
    
    try {
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        const data = await response.json();
        const imageUrl = data.message;

        setTimeout(() => {
            dogImage.src = imageUrl;

            dogImage. style.opacity = 1;
            loader.classList.add('hidden');
            isLoading = false;
        }, 500);
    } catch (error) {
        console.error('Error al cargar la imagen del perro:', error);
        loader.textContent = 'Error cargando la imagen.';
        setTimeout(() => {
            loader.classList.add('hidden');
            loader.textContent = 'Cargando...';
            isLoading = false;
        }, 2000);
    }
}

dogImage.addEventListener('click', () => {
    if (!isPlaying) {
        audio.play();
        isPlaying = true;
    }
    fetchRandomDogImage();
});
