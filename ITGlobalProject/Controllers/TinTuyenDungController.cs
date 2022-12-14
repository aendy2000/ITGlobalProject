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
                return PartialView("_timkiemtintuyendung", lstTTD.ToPagedList(1, 10));
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
            Session["PageItem-Page"] = 1;
            int count = lstTTD.ToPagedList(1, 10).PageCount;
            if (count > 1)
                Session["fullPage-Sate"] = false;
            else
                Session["fullPage-Sate"] = true;

            return View("danhSachTinTuyenDung", lstTTD.ToPagedList(1, 10));
        }

        public ActionResult xemThemTinTuyenDung()
        {
            if (Session["PageItem-Page"] == null)
            {
                var lstTTD = model.Recruitment.Where(r => r.Status == true).OrderByDescending(o => o.ID).ToList();
                ViewBag.HeaderPages = "TinTuyenDung";
                Session["PageItem-Page"] = 1;
                int count = lstTTD.ToPagedList(1, 10).PageCount;
                if (count > 1)
                    Session["fullPage-Sate"] = false;
                else
                    Session["fullPage-Sate"] = true;

                return View("_xemthemtintuyendung", lstTTD.ToPagedList(1, 10));
            }
            else
            {
                int count = Convert.ToInt32(Session["PageItem-Page"]);
                count += 1;
                var lstTTD = model.Recruitment.Where(r => r.Status == true).OrderByDescending(o => o.ID).ToList();
                int toTalCount = lstTTD.ToPagedList(1, 10).PageCount;
                if (toTalCount > count)
                {
                    Session["PageItem-Page"] = count;
                    Session["fullPage-Sate"] = false;
                }
                else
                {
                    Session["fullPage-Sate"] = true;
                }
                return View("_xemthemtintuyendung", lstTTD.ToPagedList(count, 10));
            }

        }
    }
}