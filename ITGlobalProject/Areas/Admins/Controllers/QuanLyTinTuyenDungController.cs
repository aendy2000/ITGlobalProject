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

namespace ITGlobalProject.Areas.Admins.Controllers
{
    public class QuanLyTinTuyenDungController : Controller
    {
        CP25Team06Entities model = new CP25Team06Entities();
        // GET: Admins/QuanLyTinTuyenDung
        public ActionResult danhSachTinTuyenDung()
        {
            ViewBag.ShowActive = "danhSachTinTuyenDung";
            return View();
        }
        public ActionResult themTinTuyenDung()
        {
            var chucdanh = model.Position.Where(p => p.ID != 1).ToList();
            Session["tintuyendung-position"] = chucdanh;
            var kynang = model.Skills.ToList();
            Session["tintuyendung-kynang"] = kynang;

            ViewBag.ShowActive = "themTinTuyenDung";
            return View("themTinTuyenDung");
        }
        [HttpPost]
        public ActionResult themTinTuyenDung(string tieude, int chucdanh, int soluong,
        int thucTapSinh, int toanThoiGian, string gioitinh, string kinhnghiem, string mucluong,
        string kynangchuyenmon, string motacongviec, string yeucauungvien, string quyenloiungvien, string action)
        {
            try
            {
                //Thông tin tin tuyển dụng
                Recruitment tintuyendungmoi = new Recruitment();
                tintuyendungmoi.ID_Position = chucdanh;
                tintuyendungmoi.Title = tieude;
                tintuyendungmoi.Amount = soluong;

                string hinhthuclamviec = "";
                if (thucTapSinh == 1)
                    hinhthuclamviec += "Thực tập sinh";

                if (string.IsNullOrEmpty(hinhthuclamviec) && toanThoiGian == 1)
                    hinhthuclamviec += "Toàn thời gian";
                else if (!string.IsNullOrEmpty(hinhthuclamviec) && toanThoiGian == 1)
                    hinhthuclamviec += ", Toàn thời gian";

                tintuyendungmoi.Form = hinhthuclamviec;
                tintuyendungmoi.Sex = gioitinh;
                tintuyendungmoi.Experience = kinhnghiem;
                tintuyendungmoi.Wage = Convert.ToDecimal(mucluong.Replace(",", ""));
                tintuyendungmoi.JobDescription = motacongviec;
                tintuyendungmoi.CandidateRequirement = yeucauungvien;
                tintuyendungmoi.CandidateBenefits = quyenloiungvien;
                tintuyendungmoi.DateCreateOrPosted = DateTime.Now;

                if (action.Equals("Dang"))
                    tintuyendungmoi.Status = true;
                else
                    tintuyendungmoi.Status = false;

                model.Recruitment.Add(tintuyendungmoi);
                model.SaveChanges();

                //Yêu cầu kỹ năng
                if (kynangchuyenmon.IndexOf(",") != -1)
                {
                    foreach (var item in kynangchuyenmon.Split(',').ToList())
                    {
                        SkillOfRecruitment skills = new SkillOfRecruitment();
                        skills.ID_Skills = Int32.Parse(item);
                        skills.ID_Recruitment = tintuyendungmoi.ID;
                        model.SkillOfRecruitment.Add(skills);
                    }
                }
                else
                {
                    SkillOfRecruitment skills = new SkillOfRecruitment();
                    skills.ID_Skills = Int32.Parse(kynangchuyenmon);
                    skills.ID_Recruitment = tintuyendungmoi.ID;
                    model.SkillOfRecruitment.Add(skills);
                }
                model.SaveChanges();
                model = new CP25Team06Entities();
                var chucdanhs = model.Position.Where(p => p.ID != 1).ToList();
                Session["tintuyendung-position"] = chucdanhs;
                var kynang = model.Skills.ToList();
                Session["tintuyendung-kynang"] = kynang;

                ViewBag.ShowActive = "themTinTuyenDung";
                return Content("SUCCESS" + tintuyendungmoi.ID);
            }
            catch (Exception e)
            {
                string loi = e.Message;
                return Content("Chi tiết: " + e.Message);
            }


        }
        public ActionResult suaTinTuyenDung()
        {
            ViewBag.ShowActive = "danhSachTinTuyenDung";
            return View();
        }
    }
}