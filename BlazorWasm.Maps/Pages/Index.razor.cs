
using BlazorWasm.Maps.Models;
using Microsoft.JSInterop;
using Newtonsoft.Json;

namespace BlazorWasm.Maps.Pages
{
    public partial class Index
    {
        private List<BaganMapInfoModel> _baganMapInfo;
        private List<BaganMapInfoDetailModel> _baganMapInfoDetail;

        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                await LoadMap();
            }
        }

        private async Task LoadMap()
        {
            _baganMapInfo = _mapService.BaganMapInfo;
            _baganMapInfoDetail = _mapService.BaganMapInfoDetail;
            await _jsRuntime.InvokeVoidAsync("loadMap", JsonConvert.SerializeObject(_baganMapInfo));
        }
    }
}
