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
using System.Text;
using ITGlobalProject.Models;
using ITGlobalProject.Middleware;

namespace ITGlobalProject.Areas.Admins.Controllers
{
    public class LienHeTuVanController : Controller
    {
        CP25Team06Entities model = new CP25Team06Entities();

        // GET: Admins/LienHeTuVan
        public ActionResult thongTinLienHeTuVan()
        {
            var lstCons = model.Consultation.ToList().OrderByDescending(c => c.ID);
            ViewBag.ShowActive = "thongTinLienHeTuVan";
            return View(lstCons);
        }
        [HttpPost]
        public ActionResult XoaLienHe(int? id)
        {
            var lienhe = model.Consultation.FirstOrDefault(l => l.ID == id);

            if (id == null || lienhe == null)
                return Content("DANHSACH");

            model.Consultation.Remove(lienhe);
            model.SaveChanges();
            model = new CP25Team06Entities();

            var lstLH = model.Consultation.ToList().OrderByDescending(c => c.ID);
            return PartialView("_thongTinLienHeTuVanPartial", lstLH);
        }
        [HttpPost]
        public ActionResult TiepNhanLienHe(int? id)
        {
            var lienhe = model.Consultation.FirstOrDefault(l => l.ID == id);

            if (id == null || lienhe == null)
                return Content("DANHSACH");

            lienhe.State = true;
            model.Entry(lienhe).State = EntityState.Modified;
            model.SaveChanges();
            model = new CP25Team06Entities();

            var lstLH = model.Consultation.ToList().OrderByDescending(c => c.ID);
            return PartialView("_thongTinLienHeTuVanPartial", lstLH);
        }
    }
}