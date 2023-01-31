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
using System.Drawing.Printing;
using System.Web.UI;
using System.Net.Mail;
using System.Net;
using System.Web.Helpers;
using System.Configuration;
using System.Data.OleDb;
using System.Data;


namespace ITGlobalProject.Areas.Admins.Controllers
{
    public class ThongTinDoiTacController : Controller
    {
        CP25Team06Entities model = new CP25Team06Entities();
        private static string ApiKey = "AIzaSyDvSOwmXoeKhIDNe37d17uvGDvK5TTepkc";
        private static string Bucket = "it-global-project.appspot.com";
        private static string AuthEmail = "itglobalStorage@gmail.com";
        private static string AuthPassword = "itglobalStorage123";
        // GET: Admins/ThongTinDoiTac
        public ActionResult danhSachDoiTac()
        {
            var lstDoiTac = model.Partners.ToList();

            Session["lstPartners"] = lstDoiTac;
            Session["DefaultlstPartners"] = lstDoiTac;

            ViewBag.ShowActive = "danhSachDoiTac";
            return View("danhSachDoiTac", lstDoiTac.ToPagedList(1, 8));
        }

        public ActionResult danhSachDoiTacPartial(int? page, int? pageSize)
        {
            if (Session["user-id"] == null)
                return Content("DANGNHAP");

            if (page == null)
                page = 1;
            if (pageSize == null)
                pageSize = 8;

            ViewBag.countListPartner = pageSize;
            var partner = Session["lstPartners"] as List<Partners>;

            return PartialView("_danhSachDoiTacPartial", partner.ToPagedList((int)page, (int)pageSize));
        }

        public ActionResult timKiemDoiTac(string noidung, int? soluong, string trangthai)
        {
            if (Session["user-id"] == null)
                return Content("DANGNHAP");

            ViewBag.countListPartner = soluong;
            if (string.IsNullOrEmpty(noidung.Trim()))
            {
                var partner = Session["DefaultlstPartners"] as List<Partners>;
                Session["lstPartners"] = Session["DefaultlstPartners"];
                if (string.IsNullOrEmpty(trangthai))
                {
                    return PartialView("_danhSachDoiTacPartial", partner.ToPagedList(1, (int)soluong));
                }
                else if (trangthai.Equals("congno"))
                {
                    var result = partner.Where(p => p.Projects.Sum(s => s.Debts.Where(d => d.State == false).Sum(ss => ss.Price)) > 0);
                    Session["lstPartners"] = result;
                    return PartialView("_danhSachDoiTacPartial", result.ToPagedList(1, (int)soluong));
                }
                else
                {
                    DateTime currentDate = DateTime.Now;
                    var result = partner.Where(p => p.Projects.Where(pro => pro.EndDate >= currentDate).Count() > 0);
                    return PartialView("_danhSachDoiTacPartial", result.ToPagedList(1, (int)soluong));
                }
            }
            else
            {
                noidung = noidung.ToLower().Trim();
                var partner = Session["DefaultlstPartners"] as List<Partners>;
                var searchPartner = partner.Where(p => p.Email.ToLower().Contains(noidung)
                || p.Phone.Contains(noidung) || p.Name.ToLower().Contains(noidung)
                || p.Company.ToLower().Contains(noidung)).ToList();

                if (string.IsNullOrEmpty(trangthai))
                {
                    return PartialView("_danhSachDoiTacPartial", searchPartner.ToPagedList(1, (int)soluong));
                }
                else if (trangthai.Equals("congno"))
                {
                    var result = searchPartner.Where(p => p.Projects.Sum(s => s.Debts.Where(d => d.State == false).Sum(ss => ss.Price)) > 0);
                    Session["lstPartners"] = result;
                    return PartialView("_danhSachDoiTacPartial", result.ToPagedList(1, (int)soluong));
                }
                else
                {
                    DateTime currentDate = DateTime.Now;
                    var result = searchPartner.Where(p => p.Projects.Where(pro => pro.EndDate >= currentDate).Count() > 0);
                    Session["lstPartners"] = result;
                    return PartialView("_danhSachDoiTacPartial", result.ToPagedList(1, (int)soluong));
                }
            }
        }
        public ActionResult thongTinChiTiet(int? id)
        {
            if (id == null)
                return RedirectToAction("DangNhap", "QuanLyTaiKhoan");

            ViewBag.ShowActive = "danhSachDoiTac";
            return View("thongTinChiTiet", model.Partners.Find(id));
        }
        public async Task<ActionResult> CapNhatThongTin(int? id, HttpPostedFileBase avatar,
            string namedn, string hoten, string cmnd, string phone,
            string email, string ngaysinh, string gioitinh, string diahchinha)
        {
            var partner = model.Partners.Find(id);
            string currentMail = partner.Email;
            string currentIDCard = partner.IdentityCard;
            if (id == null || partner == null)
                return Content("DANGNHAP");

            var checkExits = model.Partners.FirstOrDefault(p => (!p.Email.ToLower().Equals(currentMail.ToLower()) && p.Email.ToLower().Equals(email.ToLower())) || (!p.IdentityCard.Equals(currentIDCard) && p.IdentityCard.Equals(cmnd.Replace(" ", "").Trim())));
            if (checkExits != null)
            {
                string text = "";
                if (checkExits.Email.ToLower().Equals(email.ToLower()))
                    text += "Địa chỉ Email và";
                if (checkExits.IdentityCard.Equals(cmnd.Replace(" ", "").Trim()))
                    text += "số CMND/CCCD";
                else
                    text = "Địa chỉ Email";

                return Content(text + " đang được sử dụng bởi một khách hàng khác.");
            }

            partner.Company = namedn.Trim();
            partner.Name = hoten.Trim();
            partner.IdentityCard = cmnd.Replace(" ", "").Trim();
            partner.Phone = phone.Trim();
            partner.Email = email.Trim();
            partner.Birthday = Convert.ToDateTime(ngaysinh);
            partner.Sex = gioitinh.Trim();
            partner.Address = diahchinha.Trim();

            FileStream stream;
            if (avatar != null)
            {
                if (avatar.ContentLength > 0)
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

                    string path = Path.Combine(Server.MapPath("~/Content/images/"), sb.ToString().Trim() + avatar.FileName); ;
                    avatar.SaveAs(path);
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
                        .Child(sb.ToString().Trim() + avatar.FileName)
                        .PutAsync(stream, cancellation.Token);
                    try
                    {
                        string link = await task;
                        partner.Avatar = link;
                        System.IO.File.Delete(path);
                    }
                    catch
                    {
                        return Content("Đã có xảy ra lỗi, vui lòng thử lại");
                    }
                }
            }

            model.Entry(partner).State = EntityState.Modified;
            model.SaveChanges();

            return PartialView("_thongTinChiTietPartial", partner);
        }
        public ActionResult thongTinChiTietPartial(int? id)
        {
            var partner = model.Partners.Find(id);
            if (id == null || partner == null)
                return Content("DANHNHAP");

            return PartialView("_thongTinChiTietPartial", partner);
        }
       
        public ActionResult duAnThamGiaPartial(int? id)
        {
            var partner = model.Partners.Find(id);
            if (id == null || partner == null)
                return Content("DANHNHAP");

            return PartialView("_duAnThamGiaPartial", partner);
        }

    }
}