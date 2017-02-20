using dozorbe_service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dozorbe_service.Interfaces
{
    public interface IDozorService
    {
        Task<DozorResponse> ScrapDozorData(int routeId);
    }
}
