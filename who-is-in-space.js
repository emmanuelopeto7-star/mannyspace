async function loadpeopleinspace() {
    try {
        const response = await fetch('http://api.open-notify.org/astros.json');
        const data = await response.json();

        const container = document.getElementById('peopleinspace');
        container.innerHTML = '';

        data.people.forEach(person => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
            <div class="card-image-wrapper">
                <img src="astronaut.png" alt="${person.name}" class="card-image">
                </div>
                <h3 class="card-title">${person.name}</h3>
                <p>Craft: ${person.craft}</p>
            `;
            container.appendChild(card);
        })
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
loadpeopleinspace();