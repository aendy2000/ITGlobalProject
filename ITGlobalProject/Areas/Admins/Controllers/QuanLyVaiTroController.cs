using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ITGlobalProject.Models;
using ITGlobalProject.Middleware;
using System.Data.Entity.Validation;
using System.Data.Entity;

namespace ITGlobalProject.Areas.Admins.Controllers
{
    public class QuanLyVaiTroController : Controller
    {
        CP25Team06Entities model = new CP25Team06Entities();

        // GET: Admins/QuanLyVaiTro
        public ActionResult danhSachVaiTro()
        {
            var position = model.Position.Where(p => p.ID != 1).ToList();
            ViewBag.ShowActive = "danhSachVaiTro";
            return View(position);
        }
        [HttpPost]
        public ActionResult themVaiTro(string name, string description)
        {
            if (string.IsNullOrEmpty(name) || string.IsNullOrEmpty(name))
                return Content("DANHSACH");

            Position position = new Position();
            position.Name = name;
            position.Description = description;
            model.Position.Add(position);
            model.SaveChanges();
            model = new CP25Team06Entities();

            var positions = model.Position.Where(p => p.ID != 1).ToList();
            return PartialView("_danhSachVaiTroPartial", positions);
        }

        [HttpPost]
        public ActionResult chinhSuaVaiTro(int? id, string name, string description)
        {
            var position = model.Position.FirstOrDefault(p => p.ID == id);
            if (position == null || id == null || string.IsNullOrEmpty(name))
                return Content("DANHSACH");

            position.Name = name;
            position.Description = description;
            model.Entry(position).State = EntityState.Modified;
            model.SaveChanges();
            model = new CP25Team06Entities();

            var positions = model.Position.Where(p => p.ID != 1).ToList();
            return PartialView("_danhSachVaiTroPartial", positions);
        }
        [HttpPost]
        public ActionResult xoaVaiTro(int? id)
        {
            var position = model.Position.FirstOrDefault(p => p.ID == id);
            if (id == null || position == null)
                return Content("DANHSACH");

            
            model.Position.Remove(position);
            model.SaveChanges();
            model = new CP25Team06Entities();

            var positions = model.Position.Where(p => p.ID != 1).ToList();
            return PartialView("_danhSachVaiTroPartial", positions);
        }
    }
}