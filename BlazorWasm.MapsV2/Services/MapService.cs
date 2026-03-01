using BlazorWasm.MapsV2.Models;
using System.Net.Http.Json;

namespace BlazorWasm.MapsV2.Services
{
    public class MapService
    {
        private readonly HttpClient _http;
        private BaganMapInfoResponseModel? _mapData;
        private List<TravelRouteModel>? _travelRoutes;

        public MapService(HttpClient http)
        {
            _http = http;
        }

        public async Task LoadDataAsync()
        {
            if (_mapData != null) return;

            try
            {
                var mapDataJson = await _http.GetStringAsync("data/mapdata.json");
                _mapData = Newtonsoft.Json.JsonConvert.DeserializeObject<BaganMapInfoResponseModel>(mapDataJson);

                var travelRoutesJson = await _http.GetStringAsync("data/travelroutes.json");
                _travelRoutes = Newtonsoft.Json.JsonConvert.DeserializeObject<List<TravelRouteModel>>(travelRoutesJson);

                if (_travelRoutes != null && _mapData != null)
                {
                    foreach (var route in _travelRoutes)
                    {
                        route.PagodaList = _mapData.BaganMapInfoHead
                            .Where(p => route.PagodaIds != null && route.PagodaIds.Contains(p.Id))
                            .ToList();
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error loading map data: {ex.Message}");
            }
        }

        public List<BaganMapInfoModel> BaganMapInfo => _mapData?.BaganMapInfoHead ?? new();

        public List<BaganMapInfoDetailModel> BaganMapInfoDetail => _mapData?.BaganMapInfoDetail ?? new();

        public List<TravelRouteModel> TravelRouteList() => _travelRoutes ?? new();
    }
}
