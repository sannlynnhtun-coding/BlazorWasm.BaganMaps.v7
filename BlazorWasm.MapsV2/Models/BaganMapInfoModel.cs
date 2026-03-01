namespace BlazorWasm.MapsV2.Models
{
    public class BaganMapInfoModel
    {
        public string Id { get; set; } = default!;
        public string PagodaMmName { get; set; } = default!;
        public string PagodaEngName { get; set; } = default!;
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
    }
}
