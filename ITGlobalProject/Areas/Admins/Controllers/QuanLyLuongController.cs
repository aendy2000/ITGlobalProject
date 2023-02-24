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
using System.Security.Cryptography;
using System.Diagnostics;

namespace ITGlobalProject.Areas.Admins.Controllers
{
    [AdminLoginVerification]
    public class QuanLyLuongController : Controller
    {
        CP25Team06Entities model = new CP25Team06Entities();
        // GET: Admins/ChamCongTinhLuong
        public ActionResult bangLuong()
        {
            ViewBag.ShowActive = "bangLuong";
            Session["Insurance"] = model.Insurance.ToList();
            Session["Tax"] = model.Tax.ToList();

            return View("bangLuong", model.PayrollCategory.ToList());
        }
        [HttpPost]
        public ActionResult cauhinhkhoangiamtru(string baohiem, string thue)
        {
            if (string.IsNullOrEmpty(baohiem) || string.IsNullOrEmpty(thue))
                return Content("DANGNHAP");

            foreach (var item in baohiem.Split('_').ToList())
            {
                int id = Convert.ToInt32(item.Split('-')[0]);
                var baohiemmodel = model.Insurance.Find(id);
                baohiemmodel.Percentage = Convert.ToDecimal(item.Split('-')[1]);
                if (!string.IsNullOrEmpty(item.Split('-')[2]))
                    baohiemmodel.Ceiling_Level = Convert.ToDecimal(item.Split('-')[2].Replace(",", ""));

                model.Entry(baohiemmodel).State = EntityState.Modified;
                model.SaveChanges();
            }

            foreach (var item in thue.Split('_').ToList())
            {
                int id = Convert.ToInt32(item.Split('-')[0]);
                var thuemodel = model.Tax.Find(id);
                thuemodel.MinPrice = Convert.ToDecimal(item.Split('-')[1].Replace(",", ""));
                if (item.Split('-')[2].IndexOf("xác") == -1)
                    thuemodel.MaxPrice = Convert.ToDecimal(item.Split('-')[2].Replace(",", ""));
                thuemodel.Percentage = Convert.ToDecimal(item.Split('-')[3]);
                thuemodel.Deductible = Convert.ToDecimal(item.Split('-')[4].Replace(",", ""));

                model.Entry(thuemodel).State = EntityState.Modified;
                model.SaveChanges();
            }

            return Content("SUCCESS");
        }
        public ActionResult danhSachLuongThang(int? id)
        {
            if (id == null)
                return Content("DANGNHAP");

            var data = model.Payroll.Where(p => p.ID_PayrollCategory == id).ToList();
            ViewBag.ShowActive = "bangLuong";
            return View(data);
        }
        public ActionResult tinhLuong()
        {
            ViewBag.ShowActive = "tinhLuong";
            return View();
        }
        public ActionResult tinhLuongThuong()
        {
            ViewBag.ShowActive = "tinhLuong";
            return View();
        }
        public ActionResult chiSoThue()
        {
            ViewBag.ShowActive = "tinhLuong";
            return View();
        }
    }
}