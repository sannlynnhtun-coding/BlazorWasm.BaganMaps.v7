window.loadMap = function (data) {
    console.log(data);
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2Fubmx5bm5odHVuLWRldiIsImEiOiJjbG9ia2FoeGkwY25iMmpvNGJ4MDUyY3ZlIn0.FpDwK1yUPLSg_FPnLe_uzQ';
    const geojson = JSON.parse(data);

    const map = new mapboxgl.Map({
        container: 'map',
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [94.905, 21.160],
        zoom: 13
    });

    // Add markers to the map.
    for (const marker of geojson) {
        // Create a DOM element for each marker.
        const el = document.createElement('div');
        const width = 40;
        const height = 40;
        el.className = 'marker';
        el.style.backgroundImage = `url(images/pagoda.png)`;
        el.style.width = `${width}px`;
        el.style.height = `${height}px`;
        el.style.backgroundSize = '100%';

        el.addEventListener('click', () => {
            window.alert(marker.PagodaMmName);
        });


        let coordinates = [];
        coordinates.push(marker.Longitude);
        coordinates.push(marker.Latitude);
        // Add markers to the map.
        new mapboxgl.Marker(el)
            .setLngLat(coordinates)
            .addTo(map);
    }
}