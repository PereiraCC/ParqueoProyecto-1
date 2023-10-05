using System;
using System.Collections.Generic;
using Parqueo.Backend.Interfaces;
using Parqueo.Models;
using Parqueo.Models.Enums;

namespace Parqueo.Backend
{
    public class AccionesTiquetes : IAccionesTiquetes
    {

        public AccionesTiquetes()
        {
        }

        public void addValue(Tiquetes tiquete)
        {
            try
            {
                // Se agrega el nuevo tiquete
                GlobalVariables.Tiquetes.Add(tiquete);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void deleteValue(Tiquetes tiquete)
        {
            try
            {
                // Se eliminar el tiquete
                GlobalVariables.Tiquetes.Remove(tiquete);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void editValue(Tiquetes tiquete, int idTiquete)
        {
            try
            {
                // Se busca el index de tiquete a modificar
                int indexTiquete = GlobalVariables.Tiquetes.FindIndex(ticket => ticket.idTiquete == idTiquete);

                // Se valida que index sea correcto
                if (indexTiquete != -1)
                {
                    // Se modifica el objeto
                    GlobalVariables.Tiquetes[indexTiquete].fechaIngreso = tiquete.fechaIngreso;
                    GlobalVariables.Tiquetes[indexTiquete].fechaSalida = tiquete.fechaSalida;
                    GlobalVariables.Tiquetes[indexTiquete].placa = tiquete.placa;
                    GlobalVariables.Tiquetes[indexTiquete].tarifaHora = tiquete.tarifaHora;
                    GlobalVariables.Tiquetes[indexTiquete].tarifaMediaHora = tiquete.tarifaMediaHora;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void searchValue(string valor, EnumSearchTiquetes tipo)
        {
            try
            {

                if (valor.Equals("*"))
                {
                    GlobalVariables.TiquetesFiltrado = GlobalVariables.Tiquetes;
                }

                switch (tipo)
                {
                    case EnumSearchTiquetes.Fechas:
                        DateTime fechaSearch = DateTime.Parse(valor);
                        GlobalVariables.TiquetesFiltrado = (List<Tiquetes>)GlobalVariables.Tiquetes.Where(ticket => ticket.fechaIngreso >= fechaSearch && ticket.fechaSalida <= fechaSearch);
                        break;

                    case EnumSearchTiquetes.Placa:
                        GlobalVariables.TiquetesFiltrado = GlobalVariables.Tiquetes.Where(ticket => ticket.placa.Equals(valor)).ToList();
                        break;

                    case EnumSearchTiquetes.Tarifa:
                        GlobalVariables.TiquetesFiltrado = (List<Tiquetes>)GlobalVariables.Tiquetes.Where(ticket => ticket.tarifaHora.ToString().Equals(valor) || ticket.tarifaMediaHora.ToString().Equals(valor));
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

