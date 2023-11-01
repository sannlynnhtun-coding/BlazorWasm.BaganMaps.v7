window.loadMap = function (data) {
    console.log(data);
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2Fubmx5bm5odHVuLWRldiIsImEiOiJjbG9ia2FoeGkwY25iMmpvNGJ4MDUyY3ZlIn0.FpDwK1yUPLSg_FPnLe_uzQ';
    const geojson = {
        'type': 'FeatureCollection',
        'features': [
            {
                'type': 'Feature',
                'properties': {
                    'message': 'Foo',
                    'iconSize': [60, 60]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [-66.324462, -16.024695]
                }
            },
            {
                'type': 'Feature',
                'properties': {
                    'message': 'Bar',
                    'iconSize': [50, 50]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [-61.21582, -15.971891]
                }
            },
            {
                'type': 'Feature',
                'properties': {
                    'message': 'Baz',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [-63.292236, -18.281518]
                }
            },
            {
                'type': 'Feature',
                'properties': {
                    'message': 'Baz',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [94.90412,21.16295]
                }
            }
        ]
    };

    const map = new mapboxgl.Map({
        container: 'map',
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [94.7758353, 21.2009934],
        zoom: 5
    });

    // Add markers to the map.
    for (const marker of geojson.features) {
        // Create a DOM element for each marker.
        const el = document.createElement('div');
        //const width = marker.properties.iconSize[0];
        //const height = marker.properties.iconSize[1];
        const width = 60;
        const height = 60;
        el.className = 'marker';
        el.style.backgroundImage = `url(images/pagoda.png)`;
        el.style.width = `${width}px`;
        el.style.height = `${height}px`;
        el.style.backgroundSize = '100%';

        el.addEventListener('click', () => {
            window.alert(marker.properties.message);
        });

        // Add markers to the map.
        new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .addTo(map);
    }
}