using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PagedList.Mvc;
using PagedList;
using System.Globalization;
using System.Web.WebPages;
using System.Data.Entity.Validation;
using System.Data.Entity;
using System.IO;
using Firebase.Auth;
using System.Threading;
using Firebase.Storage;
using System.Threading.Tasks;
using System.Text;
using ITGlobalProject.Models;

namespace ITGlobalProject.Controllers
{

    public class NotificationsController : Controller
    {
        CP25Team06Entities model = new CP25Team06Entities();
        // GET: Notifications
        [HttpPost]
        public ActionResult capNhatTrangThai(int id)
        {
            var noti = model.Notification.Find(id);
            noti.State = true;
            noti.Push = false;
            model.Entry(noti).State = EntityState.Modified;
            model.SaveChanges();

            model = new CP25Team06Entities();
            return PartialView("_hienThiThongBao", noti);
        }

        public ActionResult hienThiThongBao()
        {
            Session["Lst-ThongBaoDay"] = model.Notification.OrderByDescending(o => o.ID).ToList();
            return PartialView("_hienThiThongBaoDanhSach");
        }

        public ActionResult doctatca()
        {
            foreach (var item in model.Notification.Where(n => n.State == false))
            {
                item.State = true;
                item.Push = false;
                model.Entry(item).State = EntityState.Modified;
            }
            model.SaveChanges();

            model = new CP25Team06Entities();
            Session["Lst-ThongBaoDay"] = model.Notification.OrderByDescending(o => o.ID).ToList();
            return PartialView("_hienThiThongBaoDanhSach");
        }

        public ActionResult loaiBoThongBao(int id)
        {
            try
            {
                var noti = model.Notification.Find(id);
                model.Notification.Remove(noti);
                model.SaveChanges();
                model = new CP25Team06Entities();
                return Content("success");
            }
            catch
            {
                return Content("error");
            }
        }
    }
}