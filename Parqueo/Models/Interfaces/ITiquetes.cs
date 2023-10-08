using System;
namespace Parqueo.Models.Interfaces
{
	public interface ITiquetes
	{
		int idTiquete { get; set; }

		DateTime fechaIngreso { get; set; }

		DateTime fechaSalida { get; set; }

		string placa { get; set; }

		float montoPagar { get; set; }
    }
}

