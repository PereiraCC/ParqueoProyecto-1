using System;
namespace Parqueo.Models.Interfaces
{
	public interface ITiquetes
	{
		int idTiquete { get; set; }

		DateTime fechaIngreso { get; set; }

		DateTime fechaSalida { get; set; }

		string placa { get; set; }

		float tarifaHora { get; set; }

        float tarifaMediaHora { get; set; }

    }
}

