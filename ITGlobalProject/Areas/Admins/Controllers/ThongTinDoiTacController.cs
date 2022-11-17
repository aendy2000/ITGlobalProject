using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ITGlobalProject.Areas.Admins.Controllers
{
    public class ThongTinDoiTacController : Controller
    {
        // GET: Admins/ThongTinDoiTac
        public ActionResult danhSachDoiTac()
        {
            ViewBag.ShowActive = "danhSachDoiTac";
            return View();
        }
        public ActionResult thongTinChiTiet()
        {
            ViewBag.ShowActive = "danhSachDoiTac";
            return View();
        }
        public ActionResult thongTinChiTietPartial()
        {
            ViewBag.ShowActive = "danhSachDoiTac";
            return PartialView("_thongTinChiTietPartial");
        }
        public ActionResult chinhSuaThongTinPartial()
        {
            ViewBag.ShowActive = "danhSachDoiTac";
            return PartialView("_chinhSuaThongTinPartial");
        }
        public ActionResult duAnThamGiaPartial()
        {
            ViewBag.ShowActive = "danhSachDoiTac";
            return PartialView("_duAnThamGiaPartial");
        }

    }
}