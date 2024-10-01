console.log('%c HI', 'color: firebrick');

const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";

document.addEventListener('DOMContentLoaded', () => {
    fetchImages();
    fetchBreeds();

    const breedDropdown = document.getElementById('breed-dropdown');
    if (breedDropdown) {
        breedDropdown.addEventListener('change', (event) => {
            const filterLetter = event.target.value;
            const breedList = document.getElementById('dog-breeds').children;

            for (const li of breedList) {
                if (li.textContent.startsWith(filterLetter)) {
                    li.style.display = '';
                } else {
                    li.style.display = 'none';
                }
            }
        });
    } else {
        console.error("Breed dropdown not found.");
    }
});

function fetchImages() {
    fetch(imgUrl)
        .then(response => response.json())
        .then(data => {
            const imagesDiv = document.getElementById('dog-image-container');
            data.message.forEach(imageUrl => {
                const img = document.createElement('img');
                img.src = imageUrl;
                img.alt = "Dog Image";
                img.style.width = '200px';
                img.style.margin = '10px';
                imagesDiv.appendChild(img);
            });
        })
        .catch(error => console.error("Error fetching images:", error));
}

function fetchBreeds() {
    fetch(breedUrl)
        .then(response => response.json())
        .then(data => {
            const breeds = data.message;
            const breedList = document.getElementById('dog-breeds');

            for (const breed in breeds) {
                const li = document.createElement('li');
                li.textContent = breed;
                li.style.cursor = 'pointer';
                li.addEventListener('click', () => {
                    li.style.color = 'blue';
                });
                breedList.appendChild(li);
            }
        })
        .catch(error => console.error("Error fetching breeds:", error));
}
