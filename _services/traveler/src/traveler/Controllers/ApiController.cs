using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using traveler.Interfaces;
using traveler.Models;

namespace traveler.Controllers
{
    public class ApiController : Controller
    {
        private IDozorService _dozorService;

        public ApiController(IDozorService dozorService)
        {
            _dozorService = dozorService;
        }

        [HttpGet("/api/dozor/routes")]
        public async Task<IActionResult> MakeDozorRequesTask(int routeId)
        {
            return Ok(await this._dozorService.ScrapDozorApiByRouteId(routeId));
        }
        
    }
}
