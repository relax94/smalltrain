using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dozorbe_service.Models
{
    public class DozorResponse
    {
        public int hash { get; set; }
        public List<DozorOutput> data { get; set; }
    }
}
