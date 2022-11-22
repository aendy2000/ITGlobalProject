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
    public class QuanLyDuAnController : Controller
    {
        CP25Team06Entities model = new CP25Team06Entities();
        private static string ApiKey = "AIzaSyDvSOwmXoeKhIDNe37d17uvGDvK5TTepkc";
        private static string Bucket = "it-global-project.appspot.com";
        private static string AuthEmail = "itglobalStorage@gmail.com";
        private static string AuthPassword = "itglobalStorage123";

        // GET: Admins/QuanLyDuAn
        public ActionResult danhSachDuAn()
        {
            var lstPro = model.Projects.ToList().OrderByDescending(p => p.ID);
            ViewBag.ShowActive = "danhSachDuAn";
            return View(lstPro);
        }
        public ActionResult taoDuAnMoi()
        {
            var khachhang = model.Partners.ToList().OrderByDescending(k => k.ID);
            ViewBag.ShowActive = "taoDuAnMoi";
            return View(khachhang);
        }
        [HttpPost]
        public async Task<ActionResult> taoDuAnMoi(HttpPostedFileBase avatar, string name, string mota, string batdau, string ketthuc,
            string giaidoan, string chiphi, string namedn, string hoten, string cmnd, string phone,
            string email, string ngaysinh, string gioitinh, string diahchinha, int? id)
        {
            var khachHangCu = model.Partners.Where(p => p.ID == id).ToList();
            if(id == null || khachHangCu.Count == 0)
            {
                Partners kh = new Partners();
                kh.Company = namedn.Trim();
                kh.Name = hoten.Trim();
                kh.IdentityCard = cmnd.Trim();
                kh.Phone = phone.Trim();
                kh.Email = email.Trim();
                kh.Birthday = Convert.ToDateTime(ngaysinh);
                kh.Sex = gioitinh.Trim();
                kh.Address = diahchinha.Trim();

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
                            kh.Avatar = link;
                            System.IO.File.Delete(path);
                        }
                        catch (Exception e)
                        {
                            return Content("Đã có xảy ra lỗi, vui lòng thử lại");
                        }
                    }
                }

                model.Partners.Add(kh);
                model.SaveChanges();

                model = new CP25Team06Entities();
                Projects pro = new Projects();
                pro.Name = name;
                pro.Description = mota;
                pro.StartDate = Convert.ToDateTime(batdau);
                pro.EndDate = Convert.ToDateTime(ketthuc);
                pro.ID_Partner = kh.ID;
                model.Projects.Add(pro);
                model.SaveChanges();

                model = new CP25Team06Entities();
                int sogiaidoan = giaidoan.Split('_').ToList().Count;

                for (int i = 1; i <= sogiaidoan; i++)
                {
                    Debts deb = new Debts();
                    deb.Stage = "Giai đoạn " + i;
                    deb.Price = Convert.ToDecimal(chiphi.Split('_')[i - 1].Replace(",", ""));
                    deb.Date = Convert.ToDateTime(giaidoan.Split('_')[i - 1]);
                    deb.State = false;
                    deb.ID_Project = pro.ID;

                    model.Debts.Add(deb);
                    model.SaveChanges();
                }

                return Content(pro.ID.ToString());
            }
            else
            {
                model = new CP25Team06Entities();
                Projects pro = new Projects();
                pro.Name = name;
                pro.Description = mota;
                pro.StartDate = Convert.ToDateTime(batdau);
                pro.EndDate = Convert.ToDateTime(ketthuc);
                pro.ID_Partner = (int)id;
                model.Projects.Add(pro);
                model.SaveChanges();

                model = new CP25Team06Entities();
                int sogiaidoan = giaidoan.Split('_').ToList().Count;

                for (int i = 1; i <= sogiaidoan; i++)
                {
                    Debts deb = new Debts();
                    deb.Stage = "Giai đoạn " + i;
                    deb.Price = Convert.ToDecimal(chiphi.Split('_')[i - 1].Replace(",", ""));
                    deb.Date = Convert.ToDateTime(giaidoan.Split('_')[i - 1]);
                    deb.State = false;
                    deb.ID_Project = pro.ID;

                    model.Debts.Add(deb);
                    model.SaveChanges();
                }
                return Content(pro.ID.ToString());
            }
        }
        public ActionResult chiTietDuAn(int? id)
        {
            ViewBag.ShowActive = "danhSachDuAn";
            return View();
        }
        public ActionResult tongQuanPartial(int? id)
        {
            return PartialView("_tongQuanPartial");
        }
        public ActionResult congViecPartial(int? id)
        {
            return PartialView("_congViecPartial");
        }
        public ActionResult nganSachPartial(int? id)
        {
            return PartialView("_nganSachPartial");
        }
        public ActionResult taiLieuPartial(int? id)
        {
            return PartialView("_taiLieuPartial");
        }
        public ActionResult doiNguPartial(int? id)
        {
            return PartialView("_doiNguPartial");
        }
    }
}
