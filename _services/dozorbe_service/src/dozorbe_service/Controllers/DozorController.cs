using dozorbe_service.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dozorbe_service.Controllers
{
    public class DozorController : Controller
    {
        private IDozorService _dozorService;

        public DozorController(IDozorService dozorService)
        {
            _dozorService = dozorService;
        }

        [HttpGet("/api/dozor/data")]
        public async Task<IActionResult> GetDozorScrapedData(int routeId)
        {
            return Ok(await this._dozorService.ScrapDozorData(routeId));
        }

    }
}
