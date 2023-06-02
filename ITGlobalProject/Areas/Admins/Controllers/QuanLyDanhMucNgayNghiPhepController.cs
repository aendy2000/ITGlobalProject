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
using System.ComponentModel.DataAnnotations;

namespace ITGlobalProject.Areas.Admins.Controllers
{
    [AdminLoginVerification]
    public class QuanLyDanhMucNgayNghiPhepController : Controller
    {
        CP25Team06Entities model = new CP25Team06Entities();
        // GET: Admins/QuanLyDanhMucNgayNghiPhep
        public ActionResult danhSachDanhMucNgayNghiPhep()
        {
            ViewBag.ShowActive = "danhSachDanhMucNgayNghiPhep";
            return View("danhSachDanhMucNgayNghiPhep", model.LeaveDate.OrderByDescending(o => o.ID).ToList());
        }

        [HttpPost]
        public ActionResult themDanhMucNgayNghiPhep(string name, DateTime date, string datetype)
        {
            if (string.IsNullOrEmpty(name))
                return Content("DANHSACH");

            LeaveDate depart = new LeaveDate();
            depart.Name = name;
            depart.Date = date;
            depart.DateType = datetype;

            model.LeaveDate.Add(depart);
            model.SaveChanges();
            model = new CP25Team06Entities();

            var lstDanhMucNgayNghiPhep = model.LeaveDate.OrderByDescending(o => o.ID).ToList();
            return PartialView("_danhsachDanhMucNgayNghiPhepPartial", lstDanhMucNgayNghiPhep);
        }

        [HttpPost]
        public ActionResult chinhSuaDanhMucNgayNghiPhep(int? id, string name, DateTime date, string datetype)
        {
            var depart = model.LeaveDate.Find(id);
            if (depart == null || id == null || string.IsNullOrEmpty(name))
                return Content("DANHSACH");

            depart.Name = name;
            depart.Date = date;
            depart.DateType = datetype;

            model.Entry(depart).State = EntityState.Modified;
            model.SaveChanges();
            model = new CP25Team06Entities();

            var leavedate = model.LeaveDate.OrderByDescending(o => o.ID).ToList();
            return PartialView("_danhsachDanhMucNgayNghiPhepPartial", leavedate);
        }

        [HttpPost]
        public ActionResult xoaDanhMucNgayNghiPhep(int? id)
        {
            var depart = model.LeaveDate.Find(id);
            if (id == null || depart == null)
                return Content("DANHSACH");

            model.LeaveDate.Remove(depart);
            model.SaveChanges();
            model = new CP25Team06Entities();

            var leavedate = model.LeaveDate.OrderByDescending(o => o.ID).ToList();
            return PartialView("_danhsachDanhMucNgayNghiPhepPartial", leavedate);
        }
    }
}