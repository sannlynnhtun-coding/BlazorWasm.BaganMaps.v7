namespace BlazorWasm.MapsV2.Models
{
    public class BaganMapInfoResponseModel
    {
        public List<BaganMapInfoModel> BaganMapInfoHead { get; set; } = default!;
        public List<BaganMapInfoDetailModel> BaganMapInfoDetail { get; set; } = default!;
    }
}
