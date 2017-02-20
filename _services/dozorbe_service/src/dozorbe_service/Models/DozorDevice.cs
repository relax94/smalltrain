using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dozorbe_service.Models
{
    public struct DozorLocation
    {
        public float lat;
        public float lng;
    }

    public class DozorDevice
    {
        public int id { get; set; }
        public DozorLocation loc { get; set; }
        public int spd { get; set; }
        public int azi { get; set; }
        public string gNb { get; set; }
        public bool dis { get; set; }
        public bool rad { get; set; }
    }
}
