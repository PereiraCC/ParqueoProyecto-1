using System;
namespace Parqueo.Models.Interfaces
{
	public interface ITiquetes
	{
		int idTiquete { get; set; }

		int idParqueo { get; set; }

		string nombreParqueo { get; set; }

		int idEmpleado { get; set; }

		string nombreEmpleado { get; set; }

		DateTime fechaIngreso { get; set; }

		DateTime fechaSalida { get; set; }

		string placa { get; set; }

		float montoPagar { get; set; }

		string tiempoConsumido { get; set; }
    }
}

