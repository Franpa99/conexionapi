const dogImage = document.getElementById('dogImage');
const audio = document.getElementById('audio');
const loader = document.getElementById('loader');
const breedName = document.getElementById('breedName');

let isPlaying = false;
let isLoading = false;
let minnieMode = false;

const minnieImages = [
    '2d721226-cddf-4036-bb5b-32f47f35ccd9.jpg',
    '3c361ba7-1d84-4aa5-b889-a2a4306390ae.jpg',
    '46b7ec6d-b617-4e00-b421-beaf7dd02bc4.jpg',
    '73523c87-7ab5-4aca-83e8-0f92b707b339.jpg',
    '74945961-ac6b-406a-854b-be6a39a9b262.jpg',
    '90eab1c0-a81a-425b-af1d-c3162f65716f.jpg',
    'aa51f1f6-e131-42b5-bb31-6f3ab0d9f815.jpg',
    'dd08954f-5d8a-4c1d-862a-3a3422f782be.jpg',
    'e4fa4d78-4660-45f9-a74c-f0dc1f8490a8.jpg',
    'f19e3d6b-6262-4b1c-b09e-4d10642788c1.jpg'
];

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

function getRandomMinnieImage() {
    const index = Math.floor(Math.random() * minnieImages.length);
    return minnieImages[index];
}

async function fetchRandomDogImage() {
    if (isLoading) return;

    isLoading = true;
    loader.classList.remove('hidden');
    breedName.classList.add('hidden');
    dogImage.style.opacity = 0;
    
    try {
        let imageUrl = '';

        if (minnieMode) {
            imageUrl = getRandomMinnieImage();
        } else {
            const response = await fetch('https://dog.ceo/api/breeds/image/random');
            const data = await response.json();
            imageUrl = data.message;
        }
        
        const breed = minnieMode ? 'Minnie' : formatBreedName(imageUrl);

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

document.addEventListener('keydown', (event) => {
    if (event.key.toLowerCase() === 'm') {
        minnieMode = !minnieMode;
        console.log(`Modo Minnie: ${minnieMode ? 'ACTIVADO' : 'DESACTIVADO'}`);
        fetchRandomDogImage();
    }
});
