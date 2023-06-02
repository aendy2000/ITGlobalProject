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
    [AdminLoginVerification]
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

        //Kỹ năng

        public ActionResult danhSachKyNang()
        {
            var lstSkillCategory = model.SkillsCategory.ToList();
            Session["danhSachKyNang-lstSkillCategory"] = lstSkillCategory;

            ViewBag.ShowActive = "danhSachKyNang";
            var lstKyNang = model.Skills.OrderByDescending(o => o.ID).ToList();
            return View("danhSachKyNang", lstKyNang);
        }

        [HttpPost]
        public ActionResult themKyNang(string name, int? category)
        {
            if (string.IsNullOrEmpty(name) || category == null)
                return Content("DANHSACH");

            Skills skill = new Skills();
            skill.Name = name;
            skill.ID_SkillsCategory = (int)category;
            model.Skills.Add(skill);
            model.SaveChanges();
            model = new CP25Team06Entities();

            var lstSkill = model.Skills.OrderByDescending(o => o.ID).ToList();
            return PartialView("_danhSachKyNangPartial", lstSkill);
        }

        [HttpPost]
        public ActionResult chinhSuaKyNang(int? id, string name, int? category)
        {
            var skilcate = model.Skills.Find(id);
            if (skilcate == null || id == null || string.IsNullOrEmpty(name) || category == null)
                return Content("DANHSACH");

            skilcate.Name = name;
            skilcate.ID_SkillsCategory = (int)category;
            model.Entry(skilcate).State = EntityState.Modified;
            model.SaveChanges();
            model = new CP25Team06Entities();

            var lstSkill = model.Skills.OrderByDescending(o => o.ID).ToList();
            return PartialView("_danhSachKyNangPartial", lstSkill);
        }

        [HttpPost]
        public ActionResult xoaKyNang(int? id)
        {
            var skilcate = model.Skills.Find(id);
            if (id == null || skilcate == null)
                return Content("DANHSACH");

            model.Skills.Remove(skilcate);
            model.SaveChanges();
            model = new CP25Team06Entities();

            var lstSkill = model.Skills.OrderByDescending(o => o.ID).ToList();
            return PartialView("_danhSachKyNangPartial", lstSkill);
        }




    }
}