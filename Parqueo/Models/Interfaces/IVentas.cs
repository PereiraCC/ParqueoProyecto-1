using System;
namespace Parqueo.Models.Interfaces
{
	public interface IVenta
	{
		int idVenta { get; set; }

		string NombreParqueo { get; set; }

		DateTime fechaIngreso { get; set; }

		DateTime fechaSalida { get; set; }

		string placa { get; set; }

		float montoPagar { get; set; }

		string tiempoConsumido { get; set; }
	}
}

