using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ITGlobalProject.Areas.Employee.Controllers
{
    public class QuanLyCongViecController : Controller
    {
        // GET: Employees/QuanLyCongViec
        public ActionResult danhSachDuAn()
        {
            ViewBag.ShowActive = "danhSachDuAn";
            return View();
        }
        public ActionResult danhSachCongViec()
        {
            ViewBag.ShowActive = "danhSachDuAn";
            return View();
        }
        public ActionResult tongCongViec()
        {
            ViewBag.ShowActive = "tongCongViec";
            return View();
        }
    }
}