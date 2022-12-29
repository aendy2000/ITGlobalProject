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
using System.Net.Mail;
using System.Net;

namespace ITGlobalProject.Areas.Employee.Controllers
{
    public class QuanLyTaiKhoanController : Controller
    {
        CP25Team06Entities model = new CP25Team06Entities();
        private static string ApiKey = "AIzaSyDvSOwmXoeKhIDNe37d17uvGDvK5TTepkc";
        private static string Bucket = "it-global-project.appspot.com";
        private static string AuthEmail = "itglobalStorage@gmail.com";
        private static string AuthPassword = "itglobalStorage123";

        // GET: Employee/QuanLyTaiKhoan
        public ActionResult DangXuat()
        {
            Session.Clear();
            return RedirectToAction("DangNhap", "Admins/QuanLyTaiKhoan");
        }
        public ActionResult QuenMatKhau()
        {
            return View();
        }
        public ActionResult ThongTinCaNhan(int? id)
        {
            if (id != null)
            {
                var infor = model.Employees.FirstOrDefault(i => i.ID == id);
                if (infor != null)
                {
                    return View(infor);
                }
            }
            return RedirectToAction("Overview", "Dashboard");
        }
        public ActionResult ChinhSuaThongTinCaNhanPartial(int? id)
        {
            if (id != null)
            {
                var infor = model.Employees.FirstOrDefault(i => i.ID == id);
                if (infor != null)
                {
                    return PartialView("_chinhSuaThongTinCaNhanPartial", infor);
                }
            }
            return Content("TRANGCHU");

        }
        [HttpPost]
        public async Task<ActionResult> ChinhSuaThongTinCaNhanPartial(HttpPostedFileBase AvatarImg, int ids, string sodienthoais, 
            string nganhangs, string sotaikhoans, string chutaikhoans, string diachinhas, string avatars)
        {
            var user = model.Employees.FirstOrDefault(u => u.ID == ids);
            if (user != null)
            {
                try
                {
                    FileStream stream;
                    if (AvatarImg != null)
                    {
                        if (AvatarImg.ContentLength > 0)
                        {
                            const string src = "abcdefghijklmnopqrstuvwxyz0123456789";
                            int length = 30;
                            var sb = new StringBuilder();
                            Random RNG = new Random();
                            for (var i = 0; i < length; i++)
                            {
                                var c = src[RNG.Next(0, src.Length)];
                                sb.Append(c);
                            }

                            string path = Path.Combine(Server.MapPath("~/Content/images/"), sb.ToString().Trim() + AvatarImg.FileName); ;
                            AvatarImg.SaveAs(path);
                            stream = new FileStream(Path.Combine(path), FileMode.Open);
                            var auth = new FirebaseAuthProvider(new FirebaseConfig(ApiKey));
                            var a = await auth.SignInWithEmailAndPasswordAsync(AuthEmail, AuthPassword);
                            var cancellation = new CancellationTokenSource();

                            var task = new FirebaseStorage(
                                Bucket,
                                new FirebaseStorageOptions
                                {
                                    AuthTokenAsyncFactory = () => Task.FromResult(a.FirebaseToken),
                                    ThrowOnCancel = true
                                })
                                .Child("images")
                                .Child(sb.ToString().Trim() + AvatarImg.FileName)
                                .PutAsync(stream, cancellation.Token);
                            try
                            {
                                string link = await task;
                                user.Avatar = link;
                                System.IO.File.Delete(path);
                            }
                            catch (Exception e)
                            {
                                return Content("Đã có xảy ra lỗi, vui lòng thử lại");
                            }
                        }
                    }
                    else
                    {
                        user.Avatar = avatars;
                    }
                    user.TelephoneMobile = sodienthoais;
                    user.BankName = nganhangs;
                    user.BankAccountNumber = sotaikhoans;
                    user.BankAccountHolderName = chutaikhoans;
                    user.Address = diachinhas;
                    model.Entry(user).State = EntityState.Modified;
                    model.SaveChanges();
                    model = new CP25Team06Entities();

                    return PartialView("_chinhSuaThongTinCaNhanPartial", user);
                }
                catch
                {
                    return Content("Đã có xảy ra lỗi, vui lòng thử lại");
                }
            }
            return Content("DANHSACH");
        }

        public ActionResult ThongTinCaNhanPartial(int? id)
        {
            if (id != null)
            {
                var infor = model.Employees.FirstOrDefault(i => i.ID == id);
                if (infor != null)
                {
                    return PartialView("_thongTinCaNhanPartial", infor);
                }
            }
            return Content("TRANGCHU");
        }
        public ActionResult doiMatKhauPartial(int? id)
        {
            if (id != null)
            {
                var infor = model.Employees.FirstOrDefault(i => i.ID == id);
                if (infor != null)
                {
                    return PartialView("_doiMatKhauPartial", infor);
                }
            }
            return Content("TRANGCHU");
        }
        [HttpPost]
        public ActionResult doiMatKhauPartial(int? id, string password, string newpassword)
        {
            if (id != null)
            {
                var infor = model.Employees.FirstOrDefault(i => i.ID == id);
                if (infor != null)
                {
                    if (infor.Password.Equals(password))
                    {
                        infor.Password = newpassword;
                        model.Entry(infor).State = EntityState.Modified;
                        model.SaveChanges();
                        model = new CP25Team06Entities();
                        return PartialView("_doiMatKhauPartial", infor);
                    }
                    return Content("PASSSAI");
                }
            }
            return Content("TRANGCHU");
        }
    }
}