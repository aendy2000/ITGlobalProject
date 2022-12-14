using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ITGlobalProject.Models;
namespace ITGlobalProject.Controllers
{
    public class TinTuyenDungController : Controller
    {
        CP25Team06Entities model = new CP25Team06Entities();
        // GET: TinTuyenDung
        public ActionResult thongTinTuyenDung(int? id)
        {
            var tin = model.Recruitment.Find(id);
            if (tin == null)
                return RedirectToAction("danhSachTinTuyenDung");

            ViewBag.HeaderPages = "TinTuyenDung";
            return View("thongTinTuyenDung", tin);
        }
        [HttpPost]
        public ActionResult timkiemtintuyendung(string noidung)
        {
            if (string.IsNullOrEmpty(noidung.Trim()))
            {
                var lstTTD = model.Recruitment.Where(r => r.Status == true).OrderByDescending(o => o.ID).ToList();
                ViewBag.HeaderPages = "TinTuyenDung";
                return PartialView("_timkiemtintuyendung", lstTTD);
            }
            else
            {
                var lstTTD = model.Recruitment.Where(r => r.Status == true && (r.Title.ToLower().Contains(noidung.Trim().ToLower())
                || r.Position.Name.ToLower().Contains(noidung.Trim().ToLower())
                || r.Form.ToLower().Contains(noidung.Trim().ToLower())
                || r.Experience.ToLower().Contains(noidung.Trim().ToLower())
                || r.SkillOfRecruitment.Where(s => s.Skills.Name.ToLower().Contains(noidung.Trim().ToLower())).Count() > 0
                || r.JobDescription.ToLower().Contains(noidung.Trim().ToLower())
                || r.CandidateRequirement.ToLower().Contains(noidung.Trim().ToLower())
                || r.CandidateBenefits.ToLower().Contains(noidung.Trim().ToLower())
                )).OrderByDescending(o => o.ID).ToList();
                ViewBag.HeaderPages = "TinTuyenDung";
                return PartialView("_timkiemtintuyendung", lstTTD);
            }
        }
        public ActionResult danhSachTinTuyenDung()
        {
            var lstTTD = model.Recruitment.Where(r => r.Status == true).OrderByDescending(o => o.ID).ToList();
            ViewBag.HeaderPages = "TinTuyenDung";
            return View("danhSachTinTuyenDung", lstTTD);
        }
    }
}