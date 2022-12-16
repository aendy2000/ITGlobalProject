using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ITGlobalProject.Models;
using ITGlobalProject.Middleware;
using System.Data.Entity;

namespace ITGlobalProject.Areas.Admins.Controllers
{
    public class QuanLyDanhMucBoPhanController : Controller
    {
        CP25Team06Entities model = new CP25Team06Entities();
        // GET: Admins/QuanLyDanhMucBoPhan
        public ActionResult danhSachBoPhan()
        {
            ViewBag.ShowActive = "danhSachBoPhan";
            var lstBoPhan = model.Department.OrderByDescending(o => o.ID).ToList();
            return View("danhsachbophan", lstBoPhan);
        }

        [HttpPost]
        public ActionResult themBoPhan(string name, string description)
        {
            if (string.IsNullOrEmpty(name))
                return Content("DANHSACH");

            Department depart = new Department();
            depart.Name = name;
            depart.Description = description;
            model.Department.Add(depart);
            model.SaveChanges();
            model = new CP25Team06Entities();

            var lstBoPhan = model.Department.OrderByDescending(o => o.ID).ToList();
            return PartialView("_danhSachBoPhanPartial", lstBoPhan);
        }

        [HttpPost]
        public ActionResult chinhSuaBoPhan(int? id, string name, string description)
        {
            var depart = model.Department.Find(id);
            if (depart == null || id == null || string.IsNullOrEmpty(name))
                return Content("DANHSACH");

            depart.Name = name;
            depart.Description = description;
            model.Entry(depart).State = EntityState.Modified;
            model.SaveChanges();
            model = new CP25Team06Entities();

            var department = model.Department.OrderByDescending(d => d.ID).ToList();
            return PartialView("_danhSachBoPhanPartial", department);
        }

        [HttpPost]
        public ActionResult xoaBoPhan(int? id)
        {
            var depart = model.Department.Find(id);
            if (id == null || depart == null)
                return Content("DANHSACH");

            model.Department.Remove(depart);
            model.SaveChanges();
            model = new CP25Team06Entities();

            var department = model.Department.OrderByDescending(d => d.ID).ToList();
            return PartialView("_danhSachBoPhanPartial", department);
        }
    }
}