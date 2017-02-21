using dozorbe_service.Interfaces;
using dozorbe_service.Models;
using Firebase.Database;
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
            var dozorResponse = await this._dozorService.ScrapDozorData(routeId);
            var firebase = new FirebaseClient("https://citytracker-26373.firebaseio.com");
             await firebase
              .Child("dozor")
              .PutAsync<DozorOutput>(dozorResponse.data.FirstOrDefault());
            return Ok(dozorResponse);
        }

    }
}
