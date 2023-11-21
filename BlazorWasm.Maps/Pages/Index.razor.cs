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

        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                objRef = DotNetObjectReference.Create(this);
                await Task.Delay(TimeSpan.FromSeconds(2));
                //await LoadMap();
                await GetRoute("7C1DDEED-1B9E-4B54-8AE9-986BB44C42C1");
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
            _head = _baganMapInfo.FirstOrDefault(x => x.Id == id);
            _detail = _baganMapInfoDetail.FirstOrDefault(x => x.Id == id);
            Console.WriteLine(JsonConvert.SerializeObject(_detail));
            lightDismissPanelOpen = true;
            StateHasChanged();
        }

        private async Task GetRoute(string travelRouteId)
        {
            var _baganMapInfo = _mapService.TravelRouteList()
                .FirstOrDefault(x => x.TravelRouteId == travelRouteId);
            await _jsRuntime.InvokeVoidAsync(
               "loadMap",
               JsonConvert.SerializeObject(_baganMapInfo.PagodaList.OrderBy(x=> x.Latitude).ToList()),
               objRef);
        }
    }
}