window.loadMap = function (data, dotNetHelper) {
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2Fubmx5bm5odHVuLWRldiIsImEiOiJjbG9ia2FoeGkwY25iMmpvNGJ4MDUyY3ZlIn0.FpDwK1yUPLSg_FPnLe_uzQ';
    const geojson = JSON.parse(data);

    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [94.905, 21.160],
        zoom: 11
    });

    let geojsonLatLongList = [];
    var count = 0;

    for (var i = 0; i < geojson.length; i++) {
        const marker = geojson[i];
        if (marker.Longitude == 0 || marker.Latitude == 0) continue;

        const el = document.createElement('div');
        const width = 40;
        const height = 40;
        el.className = 'marker';
        el.style.backgroundImage = `url(images/pagoda.png)`;
        el.style.width = `${width}px`;
        el.style.height = `${height}px`;
        el.style.backgroundSize = '100%';

        if (i !== geojson.length - 1) {
            el.innerHTML = `
                <div style="position: absolute; margin-top: -32px; width: 280px; display: flex; align-items: center; gap: 6px; pointer-events: none;">
                    <div style="flex-shrink: 0; width: 22px; height: 22px; display: flex; align-items: center; justify-center; border-radius: 9999px; background-color: #849258; color: white; font-size: 10px; font-weight: bold; border: 2px solid white; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);">
                        ${++count}
                    </div>
                    <div style="padding: 2px 8px; border-radius: 8px; background-color: rgba(255, 255, 255, 0.9); font-size: 11px; font-weight: 700; color: #1a1c13; border: 1px solid #d9e2b1; box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1); backdrop-filter: blur(4px);">
                        ${marker.PagodaMmName}
                    </div>
                </div>`;
        }

        el.addEventListener('click', () => {
            dotNetHelper.invokeMethodAsync('Detail', marker.Id);
        });

        let coordinates = [marker.Longitude, marker.Latitude];
        new mapboxgl.Marker(el)
            .setLngLat(coordinates)
            .addTo(map);

        geojsonLatLongList.push(coordinates);
    }

    map.on('load', function () {
        const geojson2 = {
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': geojsonLatLongList
                    }
                }
            ]
        };

        map.addSource('LineString', {
            'type': 'geojson',
            'data': geojson2
        });

        map.addLayer({
            'id': 'LineString',
            'type': 'line',
            'source': 'LineString',
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                'line-color': '#849258',
                'line-width': 4,
                'line-opacity': 0.6
            }
        });
    });
}