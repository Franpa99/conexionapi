const dogImage = document.getElementById('dogImage');
const audio = document.getElementById('audio');
const loader = document.getElementById('loader');
const breedName = document.getElementById('breedName');

let isPlaying = false;
let isLoading = false;

function formatBreedName(url) {
    const parts = url.split('/');
    const index = parts.indexOf('breeds');
    if (index !== -1 && parts[index + 1]) {
        const rawBreed = parts[index + 1];
        return rawBreed
            .split('-')
            .reverse()
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
    return null;
}

async function fetchRandomDogImage() {
    if (isLoading) return;

    isLoading = true;
    loader.classList.remove('hidden');
    breedName.classList.add('hidden');
    dogImage.style.opacity = 0;
    
    try {
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        const data = await response.json();
        const imageUrl = data.message;
        const breed = formatBreedName(imageUrl);

        setTimeout(() => {
            dogImage.src = imageUrl;
            dogImage. style.opacity = 1;
            loader.classList.add('hidden');
            
            if (breed) {
                breedName.textContent = breed;
                breedName.classList.remove('hidden');
            }
            
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
