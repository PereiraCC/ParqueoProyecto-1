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
    public class AccionesEmpleados : IAccionesEmpleados
    {
        public ProcesadorAPI procesador;

        public AccionesEmpleados(ConfiguracionParqueo configuracionParqueo)
        {
            procesador = new ProcesadorAPI(configuracionParqueo);
        }

        public async Task getAllEmpleados()
        {
            try
            {
                // Se crea el request
                RequestGeneric requestGeneric = new RequestGeneric()
                {
                    EndPoint = "/api/Empleados/GetAll",
                    Request = new object() { }
                };

                // Se comsume el procesador
                ResponseGeneric<object> response = await procesador.Procesar(requestGeneric);

                // Se valida la respuesta
                if(response.Status == 0)
                {
                    // Se parse el response
                    ResponseGeneric<List<Empleados>> empleados = JsonConvert.DeserializeObject<ResponseGeneric<List<Empleados>>>(response.Responses.ToString());
                    GlobalVariables.Empleados = empleados.Responses;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task addValue(Empleados empleado)
        {
            try
            {
                // Se crea el request
                RequestGeneric requestGeneric = new RequestGeneric()
                {
                    EndPoint = "/api/Empleados/Create",
                    Request = empleado
                };

                string json = JsonConvert.SerializeObject(empleado);

                // Se comsume el procesador
                ResponseGeneric<object> response = await procesador.Procesar(requestGeneric);

                // Se valida la respuesta
                if (response.Status == 0)
                {
                    // Se parse el response
                    ResponseGeneric<List<Empleados>> empleados = JsonConvert.DeserializeObject<ResponseGeneric<List<Empleados>>>(response.Responses.ToString());
                    GlobalVariables.Empleados = empleados.Responses;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task deleteValue(Empleados empleado)
        {
            try
            {
                // Se crea el request
                RequestGeneric requestGeneric = new RequestGeneric()
                {
                    EndPoint = $"/api/Empleados/Delete?idEmpleado={empleado.IdEmpleado}",
                    Request = new object { }
                };

                // Se comsume el procesador
                ResponseGeneric<object> response = await procesador.Procesar(requestGeneric);

                // Se valida la respuesta
                if (response.Status == 0)
                {
                    // Se parse el response
                    ResponseGeneric<List<Empleados>> empleados = JsonConvert.DeserializeObject<ResponseGeneric<List<Empleados>>>(response.Responses.ToString());
                    GlobalVariables.Empleados = empleados.Responses;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task editValue(Empleados empleado)
        {
            try
            {
                // Se crea el request
                RequestGeneric requestGeneric = new RequestGeneric()
                {
                    EndPoint = "/api/Empleados/Edit",
                    Request = empleado
                };

                // Se comsume el procesador
                ResponseGeneric<object> response = await procesador.Procesar(requestGeneric);

                // Se valida la respuesta
                if (response.Status == 0)
                {
                    // Se parse el response
                    ResponseGeneric<List<Empleados>> empleados = JsonConvert.DeserializeObject<ResponseGeneric<List<Empleados>>>(response.Responses.ToString());
                    GlobalVariables.Empleados = empleados.Responses;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task searchValue(string valor, EnumSearchEmpleados tipo)
        {
            try
            {

                string tipoBusqueda = "1";

                switch (tipo)
                {
                    case EnumSearchEmpleados.Numero:
                        tipoBusqueda = "1";
                        break;

                    case EnumSearchEmpleados.Nombre:
                        tipoBusqueda = "2";
                        break;

                    case EnumSearchEmpleados.Identificacion:
                        tipoBusqueda = "3";
                        break;
                }

                // Se crea el request
                RequestGeneric requestGeneric = new RequestGeneric()
                {
                    EndPoint = $"/api/Empleados/Search?valor={valor}&tipo={tipoBusqueda}",
                    Request = new object { }
                };

                // Se comsume el procesador
                ResponseGeneric<object> response = await procesador.Procesar(requestGeneric);

                // Se valida la respuesta
                if (response.Status == 0)
                {
                    // Se parse el response
                    ResponseGeneric<List<Empleados>> empleados = JsonConvert.DeserializeObject<ResponseGeneric<List<Empleados>>>(response.Responses.ToString());
                    GlobalVariables.EmpleadosFiltrado = empleados.Responses;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}

