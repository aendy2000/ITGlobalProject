using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ITGlobalProject.Hubs
{
    [HubName("ThongBaoDay")]
    public class ThongBaoDay : Hub
    {
        public void Hello()
        {
            Clients.All.hello();
        }
        public void Demotinnhan(string tinnhan)
        {
            Clients.All.tinnhan(tinnhan);
        }
    }
}