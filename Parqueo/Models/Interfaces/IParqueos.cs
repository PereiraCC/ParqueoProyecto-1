namespace Parqueo.Models.Interfaces
{
    public interface IParqueos
    {
        int idParqueo { get; set; }

        string Nombre { get; set; }

        int CantidadMaximaVehiculos { get; set; }

        DateTime HoraApertura { get; set; }

        DateTime HoraCierre { get; set; }

        float TarifaHora { get; set; }

        float TarifaMediaHora { get; set; }
    }
}
