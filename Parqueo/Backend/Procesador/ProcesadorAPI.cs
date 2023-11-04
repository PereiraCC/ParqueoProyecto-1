using Microsoft.Extensions.Options;
using Parqueo.Models.Configuracion;
using System.Net.Http;
using static Parqueo.Models.Configuracion.Response;

namespace Parqueo.Backend.Procesador
{
    public class ProcesadorAPI
    {

        private readonly ConfiguracionParqueo _configuracionParqueo;

        public ProcesadorAPI(ConfiguracionParqueo configuracionParqueo)
        {
            _configuracionParqueo = configuracionParqueo;
        }

        public async Task<ResponseGeneric<object>> Procesar(RequestGeneric request)
        {
            try
            {
                // Se obtiene el URL del API
                string urlWebApi = _configuracionParqueo.URLAPI;

                // Se valida que URL del API este bien configurada
                if (urlWebApi == null)
                {
                    return new ResponseGeneric<object>()
                    {
                        Status = ResponseStatus.Failed,
                        currentException = $"La url no está configurada para el API"
                    };
                }

                // Se consume el API
                using (var client = new HttpClient())
                {
                    // Se crea JSON con base el request
                    JsonContent body = JsonContent.Create(request.Request);

                    // Se envia la peticion
                    HttpResponseMessage result = client.PostAsync(urlWebApi + request.EndPoint, body).Result;

                    if (result.StatusCode == System.Net.HttpStatusCode.OK)
                    {
                        return new ResponseGeneric<object>(result.Content.ReadAsStringAsync().Result);
                    }
                    else
                    {
                        return new ResponseGeneric<object>()
                        {
                            Status = ResponseStatus.Failed,
                            currentException = $"Error consumir el API"
                        };
                    }
                }
            }
            catch(Exception ex)
            {
                return new ResponseGeneric<object>(ex);
            }
        }
    }
}
