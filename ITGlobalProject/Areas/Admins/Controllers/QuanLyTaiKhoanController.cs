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
using System.Net.Mail;
using System.Net;

namespace ITGlobalProject.Areas.Admins.Controllers
{
    public class QuanLyTaiKhoanController : Controller
    {
        CP25Team06Entities model = new CP25Team06Entities();
        private static string ApiKey = "AIzaSyDvSOwmXoeKhIDNe37d17uvGDvK5TTepkc";
        private static string Bucket = "it-global-project.appspot.com";
        private static string AuthEmail = "itglobalStorage@gmail.com";
        private static string AuthPassword = "itglobalStorage123";

        // GET: Admins/QuanLyTaiKhoan
        public ActionResult DangNhap()
        {
            if (Session["user-role"] != null)
            {
                if (Session["user-role"].ToString().ToLower().Equals("admin"))
                    return RedirectToAction("Overview", "Dashboard");
                else
                    return RedirectToAction("danhSachDuAn", "QuanLyCongViec", new {area = "Employee"});
            }

            ViewBag.Title = "Đăng Nhập";
            return View("DangNhap");
        }
        [HttpPost]
        public ActionResult DangNhap(string username, string password)
        {
            var user = model.Employees.FirstOrDefault(u => u.WorkEmail.ToLower().Equals(username.ToLower().Trim()));
            if (user != null) //Tài khoản tồn tại
            {
                if (user.Password.Equals(password)) //Mật khẩu đúng
                {
                    if (user.Lock == false) //Tài khoản không bị khóa
                    {
                        if (user.Position.Name.ToLower().Equals("admin"))
                        {
                            Session["user-fullname"] = user.Name;
                            Session["user-id"] = user.ID;
                            Session["user-email"] = user.WorkEmail;
                            Session["user-role"] = user.Position.Name.ToLower();
                            Session["user-vatatar"] = user.Avatar;

                            Session["Lst-ThongBaoDay"] = model.Notification.OrderByDescending(o => o.ID).ToList();
                            Session["Push-notification"] = true;
                            return Content("admin");
                        }
                        else
                        {
                            if (user.AccountSatus == false)
                                return Content(user.ID.ToString());

                            Session["user-fullname"] = user.Name;
                            Session["user-id"] = user.ID;
                            Session["user-email"] = user.WorkEmail;
                            Session["user-role"] = user.Position.Name.ToLower();
                            Session["user-vatatar"] = user.Avatar;
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
            return RedirectToAction("DangNhap", "QuanLyTaiKhoan");
        }
        public ActionResult QuenMatKhau()
        {
            return View("QuenMatKhau");
        }
        [HttpPost]
        public ActionResult QuenMatKhau(string email)
        {
            var user = model.Employees.FirstOrDefault(u => u.WorkEmail.ToLower().Equals(email.ToLower()));
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
                user.CodeDate = DateTime.Now.AddMinutes(10);
                model.Entry(user).State = EntityState.Modified;
                model.SaveChanges();

                using (MailMessage mailMessage = new MailMessage("noreply.itglobal@gmail.com", email))
                {
                    mailMessage.Subject = "Đặt Lại Mật Khẩu - IT-Global.Net";
                    mailMessage.IsBodyHtml = true;
                    mailMessage.Body = "<font size=4>Xin chào <b>" + user.Name + "</b>,<br/><br/></font>" +
                        "<font size=4>Chúng tôi đã thiết lập một mã để đặt lại mật khẩu cho tài khoản <b>IT-Global.net</b> của bạn.<br/>" +
                        "Nếu bạn đã không hoặc vô tình yêu cầu cung cấp mã thì bạn có thể bỏ qua email này.<br/><br/>" +
                        "Mã xác nhận của bạn là: <br/></font>" + "<font size=14><b>   " + code + "</b></font>" +
                        "<font size=4 color=red><br/><br/><i><u>Thông tin này là bảo mật. Vui lòng không cung cấp mã này cho bất kỳ ai.</u></i></font>";


                    using (SmtpClient smtp = new SmtpClient())
                    {
                        smtp.Host = "smtp.gmail.com";
                        smtp.EnableSsl = true;
                        smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                        NetworkCredential cred = new NetworkCredential("noreply.itglobal@gmail.com", "cofozlabrfkyqmfs");
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
            return View("XacThucQuenMatKhau");
        }
        [HttpPost]
        public ActionResult XacThucQuenMatKhau(string ma, string email)
        {
            var user = model.Employees.FirstOrDefault(u => u.WorkEmail.ToLower().Equals(email.ToLower()));
            if (string.IsNullOrEmpty(ma) || string.IsNullOrEmpty(email) || user == null)
            {
                return Content("DANGNHAP");
            }
            else
            {
                if (user.CodeDate != null)
                {
                    if (user.CodeDate.Value.CompareTo(DateTime.Now) <= 0)
                    {
                        return Content("HETHANMA");
                    }
                    else if (user.Code.Equals(ma))
                    {
                        user.Code = "";
                        user.CodeDate = null;
                        model.Entry(user).State = EntityState.Modified;
                        model.SaveChanges();
                        return Content("SUCCESS");
                    }
                    else
                    {
                        return Content("SAIMA");
                    }
                }
                else
                {
                    return Content("DANGNHAP");
                }
            }
        }
        public ActionResult DatLaiMatKhau()
        {
            if (Session["XacThucEmail"] == null)
            {
                return RedirectToAction("DangNhap", "QuanLyTaiKhoan");
            }
            else
            {
                return View("DatLaiMatKhau");
            }
        }
        [HttpPost]
        public ActionResult DatLaiMatKhau(string password, string email)
        {
            var user = model.Employees.FirstOrDefault(u => u.WorkEmail.ToLower().Equals(email.ToLower()));
            if (user != null && !string.IsNullOrEmpty(password))
            {
                user.Password = password;
                user.AccountSatus = true;
                model.Entry(user).State = EntityState.Modified;
                model.SaveChanges();
                return Content("SUCCESS");
            }
            else
            {
                return Content("DANGNHAP");
            }
        }
        [HttpPost]
        public ActionResult doiMatKhauLanDau(string password, int id)
        {
            var user = model.Employees.Find(id);
            if (user != null && !string.IsNullOrEmpty(password))
            {
                user.Password = password;
                user.AccountSatus = true;
                model.Entry(user).State = EntityState.Modified;
                model.SaveChanges();

                Session["user-fullname"] = user.Name;
                Session["user-id"] = user.ID;
                Session["user-email"] = user.WorkEmail;
                Session["user-role"] = user.Position.Name.ToLower();
                Session["user-vatatar"] = user.Avatar;

                return Content("SUCCESS");
            }
            return Content("DANGNHAP");
        }
        public ActionResult ThongTinCaNhan(int? id)
        {
            if (id != null)
            {
                var infor = model.Employees.FirstOrDefault(i => i.ID == id);
                if (infor != null)
                {
                    return View("ThongTinCaNhan", infor);
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
        public async Task<ActionResult> ChinhSuaThongTinCaNhanPartial(HttpPostedFileBase AvatarImg, int ids, string hotens, string cmnds, string sodienthoais, string ngaysinhs,
        string diachiemails, string gioitinhs, string diachinhas, string avatars)
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
                    user.Name = hotens;
                    user.IdentityCard = cmnds.Replace(" ", "");
                    user.TelephoneMobile = sodienthoais;
                    user.Birthday = Convert.ToDateTime(ngaysinhs);
                    user.Sex = gioitinhs;
                    user.Address = diachinhas;
                    user.WorkEmail = diachiemails;
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
                        infor.AccountSatus = true;

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