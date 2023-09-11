const getDogImageButton = document.getElementById("getDogImage");
const dogImageContainer = document.getElementById("dogImageContainer");

getDogImageButton.addEventListener("click", () => {
    /* URL de la Dog API para obtener una imagen aleatoria */
    const apiUrl = "https://dog.ceo/api/breeds/image/random";
    /* Realiza la solicitud a la API */
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            /* Verifica si la respuesta contiene una URL de imagen */
            if (data && data.message) {
                /* Crea una imagen y establece su fuente */
                const dogImage = document.createElement("img");
                dogImage.src = data.message;
                /* Limpia el contenedor de imágenes existentes y agrega la nueva imagen */
                dogImageContainer.innerHTML = "";
                dogImageContainer.appendChild(dogImage);
            }
        })
        .catch(error => console.error("Error al obtener la imagen del perro:", error));
});