using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ITGlobalProject.Areas.Admins.Controllers
{
    public class QuanLyTaiKhoanController : Controller
    {
        // GET: Admins/QuanLyTaiKhoan
        public ActionResult DangNhap()
        {
            Session["username-incorrect"] = null;
            Session["password-incorrect"] = null;
            ViewBag.Title = "Đăng Nhập";
            return View();
        }
        [HttpPost]
        public ActionResult DangNhap(string username, string password)
        {
            //var user = model.Tai_Khoan.FirstOrDefault(u => u.Ten_Dang_Nhap.ToUpper().Equals(username.ToUpper()));
            //if (user != null) //Tài khoản tồn tại
            //{

            //    Session["username-incorrect"] = null;
            //    if (user.Mat_Khau.Equals(password)) //Mật khẩu đúng
            //    {
            //        Session["password-incorrect"] = null;
            //        if (user.Lock == 0) //Tài khoản không bị khóa
            //        {
            //            Session["user-lock"] = null;
            //            Session["user-fullname"] = user.Ho_Va_Ten;
            //            Session["user-ma"] = user.Ma_Tai_Khoan;
            //            Session["user-id"] = user.Ten_Dang_Nhap;
            //            Session["thongbao-loi"] = null;

            //            Session["error-import-file"] = "empthy";
            //            Session["thongbaoSuccess"] = "empthy";

            //            Session["user-role"] = user.Quyen.Ten_Quyen;
            //            Session["user-vatatar"] = user.Avatar;
            //            return RedirectToAction("Homepage", "Home");
            //        }
            //        Session["user-lock"] = true;
            //        return View();
            //    }
            //    Session["password-incorrect"] = true;
            //    return View();
            //}
            //Session["username-incorrect"] = true;
            //Session["password-incorrect"] = true;
            return View();
        }
        public ActionResult QuenMatKhau()
        {
            return View("QuenMatKhau");
        }
        public ActionResult DatLaiMatKhau()
        {
            return View("DatLaiMatKhau");
        }
        public ActionResult XacThucQuenMatKhau()
        {
            return View("XacThucQuenMatKhau");
        }
        public ActionResult ThongTinCaNhan()
        {
            return View("ThongTinCaNhan");
        }
        public ActionResult ThongTinTaiKhoan()
        {
            return View();
        }
        public ActionResult ChinhSuaThongTinCaNhanPartial()
        {
            return PartialView("_chinhSuaThongTinCaNhanPartial");
        }
        public ActionResult ThongTinCaNhanPartial()
        {
            return PartialView("_thongTinCaNhanPartial");
        }
        public ActionResult doiMatKhauPartial()
        {
            return PartialView("_doiMatKhauPartial");
        }
    }
}