using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ITGlobalProject.Models;

namespace ITGlobalProject.Areas.Notification
{
    public class Notifications : Hub
    {
        public void Hello(string name)
        {
            Clients.All.hello(name + " đã online");
        }
    }
}