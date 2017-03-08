using dozorbe_service.Interfaces;
using dozorbe_service.Models;
using Firebase.Database;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Firebase.Database.Query;
using dozorbe_service.Jobs;
using Hangfire;
using dozorbe_service.Jobs.Services;

namespace dozorbe_service.Controllers
{
    public class DozorController : Controller
    {
        private IDozorService _dozorService;

        public DozorController(IDozorService dozorService)
        {
            _dozorService = dozorService;
        }

        [HttpGet("/api/dozor/scheduler/start")]
        public async Task<IActionResult> GetDozorScrapedData(int routeId)
        {
            var dozorResponseTask = await this._dozorService.ScrapDozorData(1);
            await new FirebaseClient("https://citytracker-26373.firebaseio.com")
               .Child("dozor")
               .Child("740")
               .PutAsync<DozorResponse>(dozorResponseTask);


            return Ok(dozorResponseTask);
        }

        public void BeFunc()
        {
            RecurringJob.AddOrUpdate(
    () => BeFunc(),
    Cron.Minutely);
        }

    }
}
