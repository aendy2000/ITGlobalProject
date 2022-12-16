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
    public class QuanLyKyNangChuyenMonController : Controller
    {
        CP25Team06Entities model = new CP25Team06Entities();
        // GET: Admins/QuanLyKyNangChuyenMon
        public ActionResult danhSachDanhMucKyNang()
        {
            ViewBag.ShowActive = "danhSachDanhMucKyNang";
            var lstDMKyNang = model.SkillsCategory.OrderByDescending(o => o.ID).ToList();
            return View("danhSachDanhMucKyNang", lstDMKyNang);
        }

        [HttpPost]
        public ActionResult themDanhMucKyNang(string name)
        {
            if (string.IsNullOrEmpty(name))
                return Content("DANHSACH");

            SkillsCategory skillcate = new SkillsCategory();
            skillcate.Name = name;
            model.SkillsCategory.Add(skillcate);
            model.SaveChanges();
            model = new CP25Team06Entities();

            var lstSkillcate = model.SkillsCategory.OrderByDescending(o => o.ID).ToList();
            return PartialView("_danhSachDanhMucKyNangPartial", lstSkillcate);
        }

        [HttpPost]
        public ActionResult chinhSuaDanhMucKyNang(int? id, string name)
        {
            var skilcate = model.SkillsCategory.Find(id);
            if (skilcate == null || id == null || string.IsNullOrEmpty(name))
                return Content("DANHSACH");

            skilcate.Name = name;
            model.Entry(skilcate).State = EntityState.Modified;
            model.SaveChanges();
            model = new CP25Team06Entities();

            var lstSkillcate = model.SkillsCategory.OrderByDescending(o => o.ID).ToList();
            return PartialView("_danhSachDanhMucKyNangPartial", lstSkillcate);
        }

        [HttpPost]
        public ActionResult xoaDanhMucKyNang(int? id)
        {
            var skilcate = model.SkillsCategory.Find(id);
            if (id == null || skilcate == null)
                return Content("DANHSACH");

            model.SkillsCategory.Remove(skilcate);
            model.SaveChanges();
            model = new CP25Team06Entities();

            var lstSkillcate = model.SkillsCategory.OrderByDescending(o => o.ID).ToList();
            return PartialView("_danhSachDanhMucKyNangPartial", lstSkillcate);
        }
    }
}