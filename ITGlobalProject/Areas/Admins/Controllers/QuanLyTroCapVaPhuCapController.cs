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
    public class QuanLyTroCapVaPhuCapController : Controller
    {
        CP25Team06Entities model = new CP25Team06Entities();
        // GET: Admins/QuanLyTroCapVaPhuCap
        public ActionResult danhSachKhoanTroCapVaPhuCap()
        {
            ViewBag.ShowActive = "danhSachKhoanTroCapVaPhuCap";
            var lstTroCap = model.SubsidiesCategory.OrderByDescending(d => d.ID).ToList();
            return View("danhSachKhoanTroCapVaPhuCap", lstTroCap);
        }

        [HttpPost]
        public ActionResult themKhoanTroCapVaPhuCap(string name, string price, string percentage, 
            bool? basicSalary, int date, bool? tax, bool? insurance, bool tinhbangtien)
        {
            if (string.IsNullOrEmpty(name))
                return Content("DANHSACH");

            var trocap = new SubsidiesCategory();
            trocap.Name = name;

            if(tinhbangtien == false)
            {
                trocap.Percentage = Convert.ToDecimal(percentage);
                trocap.OnBasicSalary = basicSalary;
                if(basicSalary == false)
                {
                    tax = null;
                    insurance = null;
                }
            }
            else
            {
                trocap.Price = Convert.ToDecimal(price.Replace(",", ""));
            }
            trocap.DateApply = date;
            trocap.Tax = tax;
            trocap.Insurance = insurance;

            model.SubsidiesCategory.Add(trocap);
            model.SaveChanges();
            model = new CP25Team06Entities();

            var lstTroCap = model.SubsidiesCategory.OrderByDescending(o => o.ID).ToList();
            return PartialView("_danhSachKhoanTroCapVaPhuCapPartial", lstTroCap);
        }

        [HttpPost]
        public ActionResult chinhSuaTroCapVaPhuCap(int? id, string name, string price, string percentage, 
            bool? basicSalary, int date, bool? tax, bool? insurance, bool tinhbangtien)
        {
            var trocap = model.SubsidiesCategory.Find(id);
            if (trocap == null || id == null)
                return Content("DANHSACH");

            trocap.Name = name;
            if (tinhbangtien == false)
            {
                trocap.Percentage = Convert.ToDecimal(percentage);
                trocap.OnBasicSalary = basicSalary;
                if (basicSalary == false)
                {
                    tax = null;
                    insurance = null;
                }
            }
            else
            {
                trocap.Price = Convert.ToDecimal(price.Replace(",", ""));
                trocap.Percentage = null;
                trocap.OnBasicSalary = null;
            }
            trocap.DateApply = date;
            trocap.Tax = tax;
            trocap.Insurance = insurance;

            model.Entry(trocap).State = EntityState.Modified;
            model.SaveChanges();
            model = new CP25Team06Entities();

            var lstTroCap = model.SubsidiesCategory.OrderByDescending(d => d.ID).ToList();
            return PartialView("_danhSachKhoanTroCapVaPhuCapPartial", lstTroCap);
        }

        [HttpPost]
        public ActionResult xoaTroCapVaPhuCap(int? id)
        {
            var subsid = model.SubsidiesCategory.Find(id);
            if (id == null || subsid == null)
                return Content("DANHSACH");

            model.SubsidiesCategory.Remove(subsid);
            model.SaveChanges();
            model = new CP25Team06Entities();

            var lstTroCap = model.SubsidiesCategory.OrderByDescending(d => d.ID).ToList();
            return PartialView("_danhSachKhoanTroCapVaPhuCapPartial", lstTroCap);
        }

        [HttpPost]
        public JsonResult thayDoiTinhThue(int? id, bool tinhthue)
        {
            var subsid = model.SubsidiesCategory.Find(id);
            if (id == null || subsid == null)
                return Json("DANHSACH", JsonRequestBehavior.AllowGet); ;

            subsid.Tax = tinhthue;
            model.Entry(subsid).State = EntityState.Modified;
            model.SaveChanges();
            return Json("SUCCESS", JsonRequestBehavior.AllowGet); ;
        }

        [HttpPost]
        public JsonResult thayDoiTinhBaoHiem(int? id, bool tinhbaohiem)
        {
            var subsid = model.SubsidiesCategory.Find(id);
            if (id == null || subsid == null)
                return Json("DANHSACH", JsonRequestBehavior.AllowGet); ;

            subsid.Insurance = tinhbaohiem;
            model.Entry(subsid).State = EntityState.Modified;
            model.SaveChanges();
            return Json("SUCCESS", JsonRequestBehavior.AllowGet); ;
        }
    }
}