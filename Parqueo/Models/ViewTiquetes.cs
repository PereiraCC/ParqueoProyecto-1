using Parqueo.Models.Interfaces;

namespace Parqueo.Models
{
    public class ViewTiquetes
    {
        public float TarifaHora { get; set; }
        public float TarifaMediaHora { get; set; }
        public int cantidadParqueo { get; set; }
        public List<Tiquetes> tiquetes { get; set; }
    }
}
