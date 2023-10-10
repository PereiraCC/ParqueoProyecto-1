using System;
namespace Parqueo.Models.Interfaces
{
	public interface IEstadistica
	{
		int idEstadistica { get; set; }

		float montoGenerado { get; set; }

		List<Venta> ventas { get; set; }
    }
}

