namespace BlazorWasm.Maps.Models;

public class TravelRouteModel
{
    public string TravelRouteId { get; set; }
    public string TravelRouteName { get; set; }
    public string TravelRouteDescription { get; set; }
    public List<BaganMapInfoModel> PagodaList { get; set; }
}
