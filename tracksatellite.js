const API_KEY="MU4ZJ8-LYRWYF-27KB6D-5Q2U"
const proxy="https://cors-anywhere.herokuapp.com/";
let currentId= 25544;

function getCoordinates(){
    return new Promise((resolve,reject)=>{
        navigator.geolocation.getCurrentPosition(resolve,reject)
    })
}

async function loadsatellite(satelliteId) {
    try {
            const position=await getCoordinates()   
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const alt = 0;
            const url= `https://api.n2yo.com/rest/v1/satellite/positions/${satelliteId}/${lat}/${lon}/${alt}/1?apiKey=${API_KEY}`
            const response = await fetch (proxy + url);
            if (!response.ok) throw new Error("Failed to load");
            const data = await response.json();
            console.log(data);
            const satLat = data.positions[0].satlatitude.toFixed(4);
            const satLon = data.positions[0].satlongitude.toFixed(4);
            const name = data.info.satname;
            document.getElementById("satName").textContent = name;
            document.getElementById("lat").textContent = satLat;
            document.getElementById("lon").textContent = satLon;
        
    } catch (error) {
        console.error("Cannot fetch satellite", error);
    }
}
document.getElementById("searchBtn").addEventListener("click",()=>
{
    const id = document.getElementById("searchInput").value.trim();
    if (id){
        currentId=id;
        loadsatellite(id);
    }
});
setInterval(()=>
    loadsatellite(currentId),30000
);
loadsatellite(currentId);