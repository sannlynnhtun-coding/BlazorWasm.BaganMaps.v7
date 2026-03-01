namespace BlazorWasm.MapsV2.Models;

public class TravelRouteModel
{
    public string TravelRouteId { get; set; } = default!;
    public string TravelRouteName { get; set; } = default!;
    public string TravelRouteDescription { get; set; } = default!;
    public List<BaganMapInfoModel> PagodaList { get; set; } = new();
    public List<string>? PagodaIds { get; set; } = new();
}
