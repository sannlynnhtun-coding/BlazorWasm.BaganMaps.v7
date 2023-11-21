using BlazorWasm.Maps.Models;
using Microsoft.JSInterop;
using Newtonsoft.Json;

namespace BlazorWasm.Maps.Pages
{
    public partial class Index
    {
        private List<BaganMapInfoModel> _baganMapInfo;
        private List<BaganMapInfoDetailModel> _baganMapInfoDetail;
        private DotNetObjectReference<Index>? objRef;
        private BaganMapInfoModel? _head;
        private BaganMapInfoDetailModel? _detail;

        private List<TravelRouteModel> _travelRoute;

        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                objRef = DotNetObjectReference.Create(this);

                _travelRoute = _mapService.TravelRouteList();

                //await LoadMap();
                //await GetRoute("7C1DDEED-1B9E-4B54-8AE9-986BB44C42C1"); // day 1
                await GetRoute("5381343D-1F64-4D39-849A-E889C554B5E6"); // day 2

                StateHasChanged();
            }
        }

        private async Task LoadMap()
        {
            _baganMapInfo = _mapService.BaganMapInfo;
            _baganMapInfoDetail = _mapService.BaganMapInfoDetail;
            await _jsRuntime.InvokeVoidAsync(
                "loadMap",
                JsonConvert.SerializeObject(_baganMapInfo),
                objRef);
        }

        public void Dispose()
        {
            objRef?.Dispose();
        }

        [JSInvokable]
        public void Detail(string id)
        {
            Console.WriteLine(id);
            _head = _mapService.BaganMapInfo.FirstOrDefault(x => x.Id == id);
            _detail = _mapService.BaganMapInfoDetail.FirstOrDefault(x => x.Id == id);
            Console.WriteLine(JsonConvert.SerializeObject(_detail));
            lightDismissPanelOpen = true;
            StateHasChanged();
        }

        private async Task GetRoute(string travelRouteId)
        {
            await Task.Delay(TimeSpan.FromMilliseconds(500));
            if (travelRouteId is null)
            {
                await LoadMap();
                return;
            }
            var _baganMapInfo = _mapService.TravelRouteList()
                .FirstOrDefault(x => x.TravelRouteId == travelRouteId);
            await _jsRuntime.InvokeVoidAsync(
               "loadMap",
               JsonConvert.SerializeObject(_baganMapInfo.PagodaList.ToList()),
               objRef);
        }

        protected override async Task OnParametersSetAsync()
        {
            await GetRoute(Id);
        }
    }
}