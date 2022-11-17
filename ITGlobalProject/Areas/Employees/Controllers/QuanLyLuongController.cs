using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ITGlobalProject.Areas.Employees.Controllers
{
    public class QuanLyLuongController : Controller
    {
        // GET: Employees/QuanLyLuong
        public ActionResult bangLuong()
        {
            ViewBag.ShowActive = "bangLuong";
            return View();
        }
    }
}