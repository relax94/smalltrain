using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace dozorbe_service.Tools
{
    public static class NetworkHelper
    {
        public static async Task<string> DownloadString(string url, Encoding encoding, IDictionary<string, string> cookieNameValues)
        {
            using (var webClient = new HttpClient())
            {
                var uri = new Uri(url);
                var webRequest = WebRequest.Create(uri);
                foreach (var nameValue in cookieNameValues)
                {
                    TryAddCookie(url, webRequest, new Cookie(nameValue.Key, nameValue.Value, "/", uri.Host));
                }
                var response = await webRequest.GetResponseAsync();
                var receiveStream = response.GetResponseStream();
                var readStream = new StreamReader(receiveStream, encoding);
                var htmlCode = readStream.ReadToEnd();
                return htmlCode;
            }
        }

        public static bool TryAddCookie(string url, WebRequest webRequest, Cookie cookie)
        {
            HttpWebRequest httpRequest = webRequest as HttpWebRequest;
            if (httpRequest == null)
            {
                return false;
            }

            if (httpRequest.CookieContainer == null)
            {
                httpRequest.CookieContainer = new CookieContainer();
            }

            httpRequest.CookieContainer.Add(new Uri(url), cookie);
            return true;
        }

        public static async Task<string> TestNetworkScrap()
        {
            var cookieNameValues = new Dictionary<string, string>();
            cookieNameValues.Add("gts.web.uuid", "550588BB-E26A-4D5D-A501-2801EC2D30BD");
            cookieNameValues.Add("gts.web.city", "zhytomyr");
            return await DownloadString("https://city.dozor.tech/data?t=2&p=740", Encoding.UTF8, cookieNameValues);
        }
    }
}
