
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

        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                objRef = DotNetObjectReference.Create(this);
                await Task.Delay(TimeSpan.FromSeconds(2));
                await LoadMap();
            }
        }

        private async Task LoadMap()
        {
            _baganMapInfo = _mapService.BaganMapInfo;
            _baganMapInfoDetail = _mapService.BaganMapInfoDetail;
            await _jsRuntime.InvokeVoidAsync("loadMap", JsonConvert.SerializeObject(_baganMapInfo), objRef);
        }

        public void Dispose()
        {
            objRef?.Dispose();
        }

        [JSInvokable]
        public void Detail(string id)
        {
            var detail = _baganMapInfoDetail.FirstOrDefault(x => x.Id == id);
            Console.WriteLine(JsonConvert.SerializeObject(detail));
        }
    }
}
