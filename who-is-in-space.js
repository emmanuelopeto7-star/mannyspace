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
            let timeinspace = 'N/A';
            try{ 
             const spaceRes = await fetch(`https://ll.thespacedevs.com/2.2.0/astronaut/?search=${person.name}`);
             const spaceData = await spaceRes.json();
             if (spaceData.results.length > 0) {
                const astronaut = spaceData.results[0];
                imgSrc = astronaut.profile_image;
                timeinSpace = astronaut.time_in_space;
             }
            }catch{}
            
        
            card.innerHTML = `
            <div class="card-image-wrapper">
                <img src=${imagesrc} alt="${person.name}" class="card-image">
                </div>
                <h3 class="card-title">${person.name}</h3>
                <p>Craft: ${person.craft}</p>
                <p>Time in Space: ${timeinspace}</p>
            `;
            container.appendChild(card);
    })
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

loadpeopleinspace();