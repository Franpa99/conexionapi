const dogImage = document.getElementById('dogImage');
const audio = document.getElementById('audio');
const loader = document.getElementById('loader');
const breedName = document.getElementById('breedName');
const breedInfo = document.getElementById('breedInfo');
const dogFact = document.getElementById('dogFact');
const modeIndicator = document.getElementById('modeIndicator');
const dogCount = document.getElementById('dogCount');
const muteBtn = document.getElementById('muteBtn');

let isPlaying = false;
let isLoading = false;
let minnieMode = false;
let isMuted = false;
let dogsViewed = 0;
let retryCount = 0;
const MAX_RETRIES = 3;

const minnieImages = [
    'images/minnie/3c361ba7-1d84-4aa5-b889-a2a4306390ae.jpg',
    'images/minnie/73523c87-7ab5-4aca-83e8-0f92b707b339.jpg',
    'images/minnie/74945961-ac6b-406a-854b-be6a39a9b262.jpg',
    'images/minnie/90eab1c0-a81a-425b-af1d-c3162f65716f.jpg',
    'images/minnie/aa51f1f6-e131-42b5-bb31-6f3ab0d9f815.jpg'
];

const dogFacts = [
    "¡Las narices de los perros están húmedas para ayudar a absorber sustancias químicas del olfato!",
    "El sentido del olfato de un perro es de 10,000 a 100,000 veces más agudo que el de los humanos.",
    "¡Los perros pueden entender hasta 250 palabras y gestos!",
    "El perro más alto del mundo mide 112 cm (un Gran Danés).",
    "Los perros solo sudan a través de las almohadillas de sus patas.",
    "La huella nasal de un perro es única, como la huella digital de una persona.",
    "Los perros sueñan igual que los humanos, especialmente los cachorros y perros mayores.",
    "Tres perros sobrevivieron al hundimiento del Titanic.",
    "La canción 'A Day in the Life' de The Beatles tiene una frecuencia que solo los perros pueden oír.",
    "Los cachorros nacen ciegos, sordos y sin dientes.",
    "Los perros pueden enamorarse liberando oxitocina cuando interactúan con humanos.",
    "El sentido del olfato de un Bloodhound puede usarse como evidencia en tribunales.",
    "Los perros pueden aprender más de 1000 palabras.",
    "El Lundehund Noruego es el único perro con 6 dedos en cada pata.",
    "¡Las orejas de los perros tienen más de 18 músculos, permitiéndoles moverse independientemente!"
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

function getRandomDogFact() {
    const index = Math.floor(Math.random() * dogFacts.length);
    return dogFacts[index];
}

function updateCounter() {
    dogsViewed++;
    dogCount.textContent = dogsViewed;
    dogCount.style.transform = 'scale(1.3)';
    setTimeout(() => {
        dogCount.style.transform = 'scale(1)';
    }, 300);
}

function toggleMute() {
    isMuted = !isMuted;
    audio.muted = isMuted;
    muteBtn.textContent = isMuted ? '🔇' : '🔊';
}

function updateModeIndicator() {
    if (minnieMode) {
        modeIndicator.classList.remove('hidden');
    } else {
        modeIndicator.classList.add('hidden');
    }
}

async function fetchRandomDogImage() {
    if (isLoading) return;

    isLoading = true;
    loader.classList.remove('hidden');
    breedInfo.classList.add('hidden');
    dogImage.style.opacity = 0;
    
    try {
        let imageUrl = '';

        if (minnieMode) {
            imageUrl = getRandomMinnieImage();
        } else {
            const response = await fetch('https://dog.ceo/api/breeds/image/random');
            if (!response.ok) {
                throw new Error('API request failed');
            }
            const data = await response.json();
            imageUrl = data.message;
        }
        
        const breed = minnieMode ? 'Minnie' : formatBreedName(imageUrl);
        const fact = getRandomDogFact();

        setTimeout(() => {
            dogImage.src = imageUrl;
            dogImage.style.opacity = 1;
            loader.classList.add('hidden');
            
            if (breed) {
                breedName.textContent = breed;
                dogFact.textContent = `🐾 ${fact}`;
                breedInfo.classList.remove('hidden');
            }
            
            updateCounter();
            retryCount = 0;
            isLoading = false;
        }, 500);
    } catch (error) {
        console.error('Error al cargar la imagen del perro:', error);
        
        if (retryCount < MAX_RETRIES) {
            retryCount++;
            console.log(`Retrying... (${retryCount}/${MAX_RETRIES})`);
            loader.querySelector('p').textContent = `Reintentando... (${retryCount}/${MAX_RETRIES})`;
            isLoading = false;
            setTimeout(() => fetchRandomDogImage(), 1000);
        } else {
            loader.querySelector('p').textContent = 'Error. Click para reintentar.';
            retryCount = 0;
            isLoading = false;
            setTimeout(() => {
                loader.classList.add('hidden');
                loader.querySelector('p').textContent = 'Cargando...';
            }, 3000);
        }
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
        updateModeIndicator();
        fetchRandomDogImage();
    } else if (event.key === ' ' || event.key === 'Spacebar') {
        event.preventDefault();
        if (!isPlaying) {
            audio.play();
            isPlaying = true;
        }
        fetchRandomDogImage();
    }
});

muteBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleMute();
});

// Smooth transition for counter
dogCount.style.transition = 'transform 0.3s ease';
