async function loadpeopleinspace() {
    try {
        const response = await fetch('http://api.open-notify.org/astros.json');
        const data = await response.json();

        const container = document.getElementById('peopleinspace');
        container.innerHTML = '';

        data.people.forEach(async (person) => {
            const card = document.createElement('div');
            card.className = 'card';
            let imagesrc = 'astronaut.png';
            try {
                const nasaRes = await fetch(`https://images-api.nasa.gov/search?q=${person.name}&media_type=image`);
                const nasaData = await nasaRes.json();
                if (nasaData.collection.items.length > 0 && nasaData.collection.items[0].links && nasaData.collection.items[0].links[0].href) {
                    imagesrc = nasaData.collection.items[0].links[0].href;
                } else {
                    imagesrc = 'astronaut.png';
                }
            } catch {
                imagesrc = 'astronaut.png';
            }
            card.innerHTML = `
                <div class="card-image-wrapper">
                    <img src="${imagesrc}" alt="${person.name}" class="card-image">
                </div>
                <h3 class="card-title">${person.name}</h3>
                <p>Craft: ${person.craft}</p>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

loadpeopleinspace();