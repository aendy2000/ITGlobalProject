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
    [AdminLoginVerification]
    public class LienHeTuVanController : Controller
    {
        CP25Team06Entities model = new CP25Team06Entities();

        // GET: Admins/LienHeTuVan
        public ActionResult thongTinLienHeTuVan()
        {
            var lstCons = model.Consultation.Where(c => c.State == false).OrderByDescending(o => o.ID).ToList();
            ViewBag.ShowActive = "thongTinLienHeTuVan";
            return View("thongTinLienHeTuVan", lstCons);
        }
        public ActionResult thongTinLienHeTuVanPartial()
        {
            var lstCons = model.Consultation.Where(c => c.State == false).OrderByDescending(o => o.ID).ToList();
            return PartialView("_thongTinLienHeTuVanPartial", lstCons);
        }
        public ActionResult thongTinDaLienHeTuVanPartial()
        {
            var lstCons = model.Consultation.Where(c => c.State == true).OrderByDescending(o => o.ID).ToList();
            return PartialView("_thongTinDaLienHeTuVanPartial", lstCons);
        }

        [HttpPost]
        public ActionResult XoaLienHe(int? id, bool? state)
        {
            var lienhe = model.Consultation.FirstOrDefault(l => l.ID == id);

            if (id == null || lienhe == null || state == null)
                return Content("DANHSACH");

            model.Consultation.Remove(lienhe);
            model.SaveChanges();
            model = new CP25Team06Entities();

            if (state == true)
            {
                var lstCons = model.Consultation.Where(c => c.State == true).OrderByDescending(o => o.ID).ToList();
                return PartialView("_thongTinDaLienHeTuVanPartial", lstCons);
            }
            else
            {
                var lstCons = model.Consultation.Where(c => c.State == false).OrderByDescending(o => o.ID).ToList();
                return PartialView("_thongTinLienHeTuVanPartial", lstCons);
            }

        }
        [HttpPost]
        public ActionResult TiepNhanLienHe(int? id)
        {
            var lienhe = model.Consultation.FirstOrDefault(l => l.ID == id);

            if (id == null || lienhe == null)
                return Content("DANHSACH");

            lienhe.State = true;
            lienhe.AcceptDate = DateTime.Now;
            model.Entry(lienhe).State = EntityState.Modified;
            model.SaveChanges();
            model = new CP25Team06Entities();

            var lstCons = model.Consultation.Where(c => c.State == false).OrderByDescending(o => o.ID).ToList();
            return PartialView("_thongTinLienHeTuVanPartial", lstCons);
        }
    }
}