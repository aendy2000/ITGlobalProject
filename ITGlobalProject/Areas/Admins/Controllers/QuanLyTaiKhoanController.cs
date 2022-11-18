using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity.Validation;
using System.Data.Entity;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using System.Text;
using ITGlobalProject.Models;
using System.Net.Mail;
using System.Net;

namespace ITGlobalProject.Areas.Admins.Controllers
{
    public class QuanLyTaiKhoanController : Controller
    {
        CP25Team06Entities model = new CP25Team06Entities();
        // GET: Admins/QuanLyTaiKhoan
        public ActionResult DangNhap()
        {
            ViewBag.Title = "Đăng Nhập";
            return View();
        }
        [HttpPost]
        public ActionResult DangNhap(string username, string password)
        {
            var user = model.Employees.FirstOrDefault(u => u.Username.ToLower().Equals(username.ToLower()) || u.Email.ToLower().Equals(username.ToLower()));
            if (user != null) //Tài khoản tồn tại
            {
                if (user.Password.Equals(password)) //Mật khẩu đúng
                {
                    if (user.Lock == false) //Tài khoản không bị khóa
                    {
                        Session["user-fullname"] = user.Name;
                        Session["user-id"] = user.ID;
                        Session["user-username"] = user.Username;
                        Session["user-email"] = user.Email;
                        Session["user-role"] = user.Position.Name;
                        Session["user-vatatar"] = user.Avatar;
                        if (user.Position.Name.ToLower().Equals("admin"))
                        {
                            return Content("admin");
                        }
                        else
                        {
                            return Content("employee");
                        }
                    }
                    return Content("KHOA");
                }
                return Content("MKSAI");
            }
            return Content("TKSAI");
        }
        public ActionResult DangXuat()
        {
            Session.Clear();
            return View("DangNhap");
        }
        public ActionResult QuenMatKhau()
        {
            return View();
        }
        [HttpPost]
        public ActionResult QuenMatKhau(string email)
        {
            var user = model.Employees.FirstOrDefault(u => u.Email.ToLower().Equals(email.ToLower()));
            if (user != null)
            {
                Random r = new Random();
                int range = 6;
                string code = "";
                while (range >= 1)
                {
                    int ranD = r.Next(0, 9);
                    code += ranD;
                    range -= 1;
                }
                user.Code = code; //Tạo mã xác minh đặt lại mật khẩu
                user.Code_Time = DateTime.Now.AddMinutes(10);
                model.Entry(user).State = EntityState.Modified;
                model.SaveChanges();

                using (MailMessage mailMessage = new MailMessage("noreply.itglobal@gmail.com", email))
                {
                    mailMessage.Subject = "Đặt Lại Mật Khẩu - IT-Global.Net";
                    mailMessage.IsBodyHtml = true;
                    mailMessage.Body = "<font size=5>Mã xác nhận của bạn là: </font><br>" + "<font size=20><b>   " + code + "</b></font>";

                    using (SmtpClient smtp = new SmtpClient())
                    {
                        smtp.Host = "smtp.gmail.com";
                        smtp.EnableSsl = true;
                        NetworkCredential cred = new NetworkCredential("noreply.itglobal@gmail.com", "dagpayhjihvgdfym");
                        smtp.UseDefaultCredentials = true;
                        smtp.Credentials = cred;
                        smtp.Port = 587;

                        try
                        {
                            smtp.Send(mailMessage);
                            Session["XacThucEmail"] = email;
                            return Content("SUCCESS");
                        }
                        catch (Exception e)
                        {
                            return Content(e.ToString());
                        }
                    }
                }
            }
            return Content("TKSAI");
        }
        public ActionResult XacThucQuenMatKhau()
        {
            if (Session["XacThucEmail"] == null)
            {
                return View("DangNhap");
            }
            return View();
        }
        [HttpPost]
        public ActionResult XacThucQuenMatKhau(string ma, string email)
        {
            var user = model.Employees.FirstOrDefault(u => u.Email.ToLower().Equals(email.ToLower()));
            if (string.IsNullOrEmpty(ma) || string.IsNullOrEmpty(email) || user == null)
            {
                return Content("DANGNHAP");
            }
            else
            {
                if (user.Code_Time.Value.CompareTo(DateTime.Now) <= 0)
                {
                    return Content("HETHANMA");
                }
                else if (user.Code.Equals(ma))
                {
                    user.Code = "";
                    user.Code_Time = null;
                    model.Entry(user).State = EntityState.Modified;
                    model.SaveChanges();
                    return Content("SUCCESS");
                }
                else
                {
                    return Content("SAIMA");
                }
            }
        }
        public ActionResult DatLaiMatKhau()
        {
            if (Session["XacThucEmail"] == null)
            {
                return View("DangNhap");
            }
            else
            {
                return View();
            }
        }
        [HttpPost]
        public ActionResult DatLaiMatKhau(string password, string email)
        {
            var user = model.Employees.FirstOrDefault(u => u.Email.ToLower().Equals(email.ToLower()));
            if(user != null && !string.IsNullOrEmpty(password))
            {
                user.Password = password;
                model.Entry(user).State = EntityState.Modified;
                model.SaveChanges();
                return Content("SUCCESS");
            }
            else
            {
                return Content("DANGNHAP");
            }
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