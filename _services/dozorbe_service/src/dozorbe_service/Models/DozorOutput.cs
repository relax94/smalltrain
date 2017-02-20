using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dozorbe_service.Models
{
    public class DozorOutput
    {
        public int rId { get; set; }
        public List<DozorDevice> dvs { get; set; }
    }
}
