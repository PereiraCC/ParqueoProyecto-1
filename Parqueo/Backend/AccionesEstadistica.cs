using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using Parqueo.Backend.Interfaces;
using Parqueo.Backend.Procesador;
using Parqueo.Models;
using Parqueo.Models.Configuracion;
using Parqueo.Models.Enums;

namespace Parqueo.Backend
{
    public class AccionesEstadistica : IAccionesEstadistica
    {
        public ProcesadorAPI procesador;

        public AccionesEstadistica(ConfiguracionParqueo configuracionParqueo)
        {
            procesador = new ProcesadorAPI(configuracionParqueo);
        }

        public async Task getAllEstadistica()
        {
            try
            {
                // Se crea el request
                RequestGeneric requestGeneric = new RequestGeneric()
                {
                    EndPoint = "/api/Estadistica/GetAll",
                    Request = new object() { }
                };

                // Se comsume el procesador
                ResponseGeneric<object> response = await procesador.Procesar(requestGeneric);

                // Se valida la respuesta
                if (response.Status == 0)
                {
                    // Se parse el response
                    ResponseGeneric<Estadistica> estadistica = JsonConvert.DeserializeObject<ResponseGeneric<Estadistica>>(response.Responses.ToString());
                    GlobalVariables.Estadisticas = estadistica.Responses;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task addValue(Venta venta)
        {
            try
            {
                // Se crea el request
                RequestGeneric requestGeneric = new RequestGeneric()
                {
                    EndPoint = "/api/Estadistica/Create",
                    Request = venta
                };

                // Se comsume el procesador
                ResponseGeneric<object> response = await procesador.Procesar(requestGeneric);

                // Se valida la respuesta
                if (response.Status == 0)
                {
                    // Se parse el response
                    ResponseGeneric<Estadistica> estadistica = JsonConvert.DeserializeObject<ResponseGeneric<Estadistica>>(response.Responses.ToString());
                    GlobalVariables.Estadisticas = estadistica.Responses;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task searchValue(string valor, EnumSearchEstadistica tipo)
        {
            try
            {

                string tipoBusqueda = "1";

                switch (tipo)
                {
                    case EnumSearchEstadistica.Mes:
                        tipoBusqueda = "1";
                        break;

                    case EnumSearchEstadistica.Dia:
                        tipoBusqueda = "2";
                        break;

                    case EnumSearchEstadistica.Tiempo:
                        tipoBusqueda = "3";
                        break;

                    case EnumSearchEstadistica.ParqueosVendeMas:
                        tipoBusqueda = "4";
                        break;
                }

                var endPoint = "";

                if(tipoBusqueda == "4")
                {
                    endPoint = $"/api/Estadistica/Search?valor={0}&tipo={tipoBusqueda}";
                } 
                else
                {
                    endPoint = $"/api/Estadistica/Search?valor={valor}&tipo={tipoBusqueda}";
                }

                // Se crea el request
                RequestGeneric requestGeneric = new RequestGeneric()
                {
                    EndPoint = endPoint,
                    Request = new object() { }
                };

                // Se comsume el procesador
                ResponseGeneric<object> response = await procesador.Procesar(requestGeneric);

                // Se valida la respuesta
                if (response.Status == 0)
                {
                    // Se parse el response
                    ResponseGeneric<Estadistica> estadistica = JsonConvert.DeserializeObject<ResponseGeneric<Estadistica>>(response.Responses.ToString());
                    GlobalVariables.EstadisticasFiltrado = estadistica.Responses;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}

