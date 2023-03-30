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
using ITGlobalProject.Middleware;
using System.Security.Cryptography;
using System.Diagnostics;

namespace ITGlobalProject.Areas.Employee.Controllers
{
    public class QuanLyLuongController : Controller
    {
        CP25Team06Entities model = new CP25Team06Entities();
        // GET: Employees/QuanLyLuong
        public ActionResult bangLuong()
        {
            int id = Int32.Parse(Session["user-id"] != null ? Session["user-id"].ToString() : null);

            ViewBag.ShowActive = "bangLuong";
            int currentYear = DateTime.Now.Year;
            Session["bang-luong-emp"] = model.PayrollCategory.Where(p => p.Date.Year == currentYear).ToList();
            return View("bangLuong", model.Employees.Find(id));
        }
        public ActionResult timKiemBangLuongPartial(int? id, int? nam, string trangthai)
        {
            var user = model.Employees.Find(id);
            if (user == null || id == null || Session["user-id"] == null)
                return Content("DANHSACH");

            if (trangthai.Equals("tatca"))
            {
                Session["trangthai-bangluong"] = null;
            }
            else if (trangthai.Equals("dathanhtoan"))
            {
                Session["trangthai-bangluong"] = true;
            }
            else
            {
                Session["trangthai-bangluong"] = false;
            }
            Session["bang-luong-emp"] = model.PayrollCategory.Where(p => p.Date.Year == nam).ToList();
            return PartialView("_timkiembangluong", user);
        }
    }
}