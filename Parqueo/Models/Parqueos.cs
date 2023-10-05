using Parqueo.Models.Interfaces;

namespace Parqueo.Models
{
    public class Parqueos : IParqueos
    {
        public int idParqueo { get; set; }
        public string Nombre { get; set; }
        public int CantidadMaximaVehiculos { get; set; }
        public DateTime HoraApertura { get; set; }
        public DateTime HoraCierre { get; set; }
        public float TarifaHora { get; set; }
        public float TarifaMediaHora { get; set; }
    }
}
