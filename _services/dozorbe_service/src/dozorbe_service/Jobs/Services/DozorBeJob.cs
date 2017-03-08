using dozorbe_service.Models;
using dozorbe_service.Services;
using Firebase.Database;
using Firebase.Database.Query;
using Quartz;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dozorbe_service.Jobs.Services
{
    public class DozorBeJob
    {
        private DozorService _dozorService;
        private FirebaseClient _firebase;

        public DozorBeJob()
        {
            this._dozorService = new DozorService();
            this._firebase = new FirebaseClient("https://citytracker-26373.firebaseio.com");
        }
        public void Execute()
        {
            var dozorResponseTask = this._dozorService.ScrapDozorData(1);
            dozorResponseTask.Wait();
             this._firebase
                .Child("dozor")
                .Child("740")
                .PutAsync<DozorResponse>(dozorResponseTask.Result);
        }
    }
}
