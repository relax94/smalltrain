using dozorbe_service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dozorbe_service.Models;
using dozorbe_service.Tools;
using Newtonsoft.Json;

namespace dozorbe_service.Services
{
    public class DozorService : IDozorService
    {
        public async Task<DozorResponse> ScrapDozorData(int routeId)
        {
            var stringResponse = await NetworkHelper.TestNetworkScrap();
            return JsonConvert.DeserializeObject<DozorResponse>(stringResponse);
        }
    }
}
