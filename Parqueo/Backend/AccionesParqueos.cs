using System;
using System.Collections.Generic;
using Parqueo.Backend.Interfaces;
using Parqueo.Models;
using Parqueo.Models.Enums;

namespace Parqueo.Backend
{
    public class AccionesParqueos : IAccionesParqueos
    {

        public AccionesParqueos()
        {
        }

        public void addValue(Parqueos parqueo)
        {
            try
            {
                // Se agrega el nuevo parqueo
                GlobalVariables.Parqueos.Add(parqueo);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void deleteValue(Parqueos parqueo)
        {
            try
            {
                // Se eliminar el tiquete
                GlobalVariables.Parqueos.Remove(parqueo);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void editValue(Parqueos parqueo, int idParqueo)
        {
            try
            {
                // Se busca el index de parqueo a modificar
                int indexParqueo = GlobalVariables.Parqueos.FindIndex(par => par.idParqueo == idParqueo);

                // Se valida que index sea correcto
                if (indexParqueo != -1)
                {
                    // Se modifica el objeto
                    GlobalVariables.Parqueos[indexParqueo].Nombre = parqueo.Nombre;
                    GlobalVariables.Parqueos[indexParqueo].CantidadMaximaVehiculos = parqueo.CantidadMaximaVehiculos;
                    GlobalVariables.Parqueos[indexParqueo].HoraApertura = parqueo.HoraApertura;
                    GlobalVariables.Parqueos[indexParqueo].HoraCierre = parqueo.HoraCierre;
                    GlobalVariables.Parqueos[indexParqueo].TarifaHora = parqueo.TarifaHora;
                    GlobalVariables.Parqueos[indexParqueo].TarifaMediaHora = parqueo.TarifaMediaHora;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void searchValue(string valor, EnumSearchParqueos tipo)
        {
            try
            {

                if (valor.Equals("*"))
                {
                    GlobalVariables.ParqueosFiltrado = GlobalVariables.Parqueos;
                }

                switch (tipo)
                {
                    case EnumSearchParqueos.Hora:
                        DateTime fechaSearch = DateTime.Parse(valor);
                        GlobalVariables.ParqueosFiltrado = GlobalVariables.Parqueos.Where(parqueo => parqueo.HoraApertura >= fechaSearch && parqueo.HoraCierre <= fechaSearch).ToList();
                        break;

                    case EnumSearchParqueos.Nombre:
                        GlobalVariables.ParqueosFiltrado = GlobalVariables.Parqueos.Where(parqueo => parqueo.Nombre.Equals(valor)).ToList();
                        break;

                    case EnumSearchParqueos.Tarifa:
                        GlobalVariables.ParqueosFiltrado = GlobalVariables.Parqueos.Where(parqueo => parqueo.TarifaHora.ToString().Equals(valor) || parqueo.TarifaMediaHora.ToString().Equals(valor)).ToList();
                        break;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}

