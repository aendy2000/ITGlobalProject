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
            return View("danhSachDoiTac", lstDoiTac.OrderByDescending(o => o.ID).ToPagedList(1, 8));
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

            return PartialView("_danhSachDoiTacPartial", partner.OrderByDescending(o => o.ID).ToPagedList((int)page, (int)pageSize));
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
                    return PartialView("_danhSachDoiTacPartial", partner.OrderByDescending(o => o.ID).ToPagedList(1, (int)soluong));
                }
                else if (trangthai.Equals("congno"))
                {
                    var result = partner.Where(p => p.PartnerOfProject.Sum(s => s.Projects.Debts.Where(d => d.State == false).Sum(ss => ss.Price)) > 0);
                    Session["lstPartners"] = result;
                    return PartialView("_danhSachDoiTacPartial", result.OrderByDescending(o => o.ID).ToPagedList(1, (int)soluong));
                }
                else
                {
                    DateTime currentDate = DateTime.Now;
                    var result = partner.Where(p => p.PartnerOfProject.Where(pro => pro.Projects.EndDate >= currentDate).Count() > 0);
                    return PartialView("_danhSachDoiTacPartial", result.OrderByDescending(o => o.ID).ToPagedList(1, (int)soluong));
                }
            }
            else
            {
                noidung = noidung.ToLower().Trim();
                var partner = Session["DefaultlstPartners"] as List<Partners>;
                var searchPartner = partner.Where(p => p.Email.ToLower().Contains(noidung)
                || p.Phone.Contains(noidung) || p.Name.ToLower().Contains(noidung)
                || p.Company != null ? p.Company.ToLower().Contains(noidung) : p.Company != null).ToList();

                if (string.IsNullOrEmpty(trangthai))
                {
                    return PartialView("_danhSachDoiTacPartial", searchPartner.OrderByDescending(o => o.ID).ToPagedList(1, (int)soluong));
                }
                else if (trangthai.Equals("congno"))
                {
                    var result = searchPartner.Where(p => p.PartnerOfProject.Sum(s => s.Projects.Debts.Where(d => d.State == false).Sum(ss => ss.Price)) > 0);
                    Session["lstPartners"] = result;
                    return PartialView("_danhSachDoiTacPartial", result.OrderByDescending(o => o.ID).ToPagedList(1, (int)soluong));
                }
                else
                {
                    DateTime currentDate = DateTime.Now;
                    var result = searchPartner.Where(p => p.PartnerOfProject.Where(pro => pro.Projects.EndDate >= currentDate).Count() > 0);
                    Session["lstPartners"] = result;
                    return PartialView("_danhSachDoiTacPartial", result.OrderByDescending(o => o.ID).ToPagedList(1, (int)soluong));
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
        public ActionResult CapNhatThongTin(int? id, string namedn,
            string hotennguoidaidien, string hoten, string phone,
            string email, string ngaysinh, string gioitinh, string diahchinha,
            bool loaidoitac, string masothue, string website)
        {
            var partner = model.Partners.Find(id);
            string currentMail = partner.Email;
            if (id == null || partner == null)
                return Content("DANGNHAP");

            var checkExits = model.Partners.FirstOrDefault(p => (!p.Email.ToLower().Equals(currentMail.ToLower()) && p.Email.ToLower().Equals(email.ToLower())));
            if (checkExits != null)
            {
                string text = "";
                if (checkExits.Email.ToLower().Equals(email.ToLower()))
                {
                    text += "Địa chỉ Email";
                    return Content(text + " đang được sử dụng bởi một khách hàng khác.");
                }
            }
            if (loaidoitac == true)
            {
                partner.Company = namedn.Trim();
                partner.Name = hotennguoidaidien.Trim();
            }
            else
            {
                partner.Company = "";
                partner.Name = hoten.Trim();
            }
            partner.Phone = phone.Trim();
            partner.Email = email.Trim();
            partner.Birthday = Convert.ToDateTime(ngaysinh);
            partner.Sex = gioitinh.Trim();
            partner.Address = diahchinha.Trim();
            partner.TaxCode = masothue.Trim();
            partner.WebUrl = website.Trim();
            partner.CompanyOrPersonal = loaidoitac;

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
        [HttpPost]
        public ActionResult timKiemDuAn(int? id, string noidung, string trangthai)
        {
            ViewBag.IDPartnerSearchProject = id;
            var partner = model.Partners.Find(id);
            if (id == null || partner == null)
                return Content("DANHNHAP");

            if (string.IsNullOrEmpty(noidung.Trim()))
            {
                if (string.IsNullOrEmpty(trangthai))
                {
                    List<Projects> lstpro = new List<Projects>();
                    foreach (var item in partner.PartnerOfProject.ToList())
                    {
                        lstpro.Add(item.Projects);
                    }
                    return PartialView("_duAnThamGiaSearch", lstpro);
                }
                else if (trangthai.Equals("dangthuchien"))
                {
                    DateTime currentDate = new DateTime();
                    List<Projects> lstpro = new List<Projects>();
                    foreach (var item in partner.PartnerOfProject.Where(p => p.Projects.EndDate >= currentDate).ToList())
                    {
                        lstpro.Add(item.Projects);
                    }
                    return PartialView("_duAnThamGiaSearch", lstpro);
                }
                else
                {
                    List<Projects> lstpro = new List<Projects>();
                    foreach (var item in partner.PartnerOfProject.Where(p => p.Projects.Debts.Where(d => d.State == false).Count() > 0).ToList())
                    {
                        lstpro.Add(item.Projects);
                    }
                    return PartialView("_duAnThamGiaSearch", lstpro);
                }
            }
            else
            {
                noidung = noidung.Trim().ToLower();
                var search = partner.PartnerOfProject.Where(p => p.Projects.Name.ToLower().Contains(noidung)).ToList();

                if (string.IsNullOrEmpty(trangthai))
                {
                    List<Projects> lstpro = new List<Projects>();
                    foreach (var item in partner.PartnerOfProject.Where(p => p.Projects.Debts.Where(d => d.State == false).Count() > 0).ToList())
                    {
                        lstpro.Add(item.Projects);
                    }
                    return PartialView("_duAnThamGiaSearch", lstpro);
                }
                else if (trangthai.Equals("dangthuchien"))
                {
                    DateTime currentDate = new DateTime();
                    List<Projects> lstpro = new List<Projects>();
                    foreach (var item in search.Where(p => p.Projects.EndDate >= currentDate).ToList())
                    {
                        lstpro.Add(item.Projects);
                    }
                    return PartialView("_duAnThamGiaSearch", lstpro);
                }
                else
                {
                    List<Projects> lstpro = new List<Projects>();
                    foreach (var item in search.Where(p => p.Projects.Debts.Where(d => d.State == false).Count() > 0).ToList())
                    {
                        lstpro.Add(item.Projects);
                    }
                    return PartialView("_duAnThamGiaSearch", lstpro);
                }
            }
        }

        [HttpPost]
        public ActionResult xoaDoiTac(int? id)
        {
            var partner = model.Partners.Find(id);
            if (id == null || partner == null)
                return Content("DANHNHAP");
            model.Partners.Remove(partner);
            model.SaveChanges();
            return Content("SUCCESS");
        }
        [HttpPost]
        public ActionResult themDoiTac(string namedn, string hotennguoidaidien,
            string hoten, string phone, string email, string ngaysinh, string gioitinh, string diahchinha,
            int? pageSize, bool loaidoitac, string masothue, string website)
        {
            var checkExits = model.Partners.FirstOrDefault(p => p.Email.ToLower().Equals(email.ToLower()));
            if (checkExits != null)
            {
                string text = "";
                if (checkExits.Email.ToLower().Equals(email.ToLower()))
                {
                    text = "Địa chỉ Email";
                    return Content(text + " đang được sử dụng bởi một khách hàng khác.");
                }
            }

            Partners kh = new Partners();
            if (loaidoitac == true)
            {
                kh.Company = namedn.Trim();
                kh.Name = hotennguoidaidien.Trim();
            }
            else
            {
                kh.Name = hoten.Trim();
            }
            kh.Phone = phone.Trim();
            kh.Email = email.Trim();
            kh.Birthday = Convert.ToDateTime(ngaysinh);
            kh.Sex = gioitinh.Trim();
            kh.Address = diahchinha.Trim();
            kh.TaxCode = masothue.Trim();
            kh.WebUrl = website.Trim();
            kh.CompanyOrPersonal = loaidoitac;
            kh.AddDate = DateTime.Now;

            model.Partners.Add(kh);
            model.SaveChanges();

            kh.ID_Partners = "KH" + kh.ID.ToString("D8");
            model.Entry(kh).State = EntityState.Modified;
            model.SaveChanges();

            return PartialView("_danhSachDoiTacPartial", model.Partners.OrderByDescending(o => o.ID).ToPagedList(1, (int)pageSize));
        }
        //public ActionResult guiMail()
        //{
        //    DateTime currentDate = Convert.ToDateTime(DateTime.Now.ToString("yyyy-MM-dd"));
        //    DateTime currentDate2 = currentDate.AddDays(3);
        //    var partner = model.Partners.Where(p => p.Projects.Where(d => d.Debts.Where(deb => deb.Date <= currentDate2 && deb.Date >= currentDate && deb.Send_Email_State == false).Count() > 0).Count() > 0).ToList();
        //    if (partner.Count > 1)
        //    {
        //        //Gửi mật khẩu đến email
        //        foreach (var partners in partner)
        //        {
        //            foreach (var projects in partners.Projects.Where(d => d.Debts.Where(deb => deb.Date <= currentDate2 && deb.Date >= currentDate && deb.Send_Email_State == false).Count() > 0).ToList())
        //            {
        //                foreach (var debts in projects.Debts.Where(deb => deb.Date <= currentDate2 && deb.Date >= currentDate && deb.Send_Email_State == false).ToList())
        //                {
        //                    using (MailMessage mailMessage = new MailMessage("noreply.itglobal@gmail.com", partners.Email.Trim()))
        //                    {
        //                        mailMessage.Subject = "Thông Báo Hạn Thanh Toán Chi Phí Dự Án " + projects.Name.Trim();
        //                        mailMessage.IsBodyHtml = true;
        //                        mailMessage.Body = "<font size=4><b>Xin chào " + partners.Name.Trim() + ",</b><br/><br/></font>" +
        //                            "<font size=4>Chi Phí phát triển dự án: <b>" + projects.Name.Trim() + "</b><br/>" +
        //                            "Giai đoạn: <b>" + debts.Stage.Trim() + ".<br/>" +
        //                            "Số tiền: <b>" + debts.Price.ToString("0,0") + " VND</b>.<br/>" +
        //                            "Sẽ đến hạn thanh toán vào ngày:" + debts.Date.ToString("dd/MM/yyyy") + ". Xin vui lòng thanh toán đúng hạn.<br/>" +
        //                            "<font size=4><i><u>Đây là email tự động vui lòng không trả lời lại email này.</u></i></font>";
        //                        using (SmtpClient smtp = new SmtpClient())
        //                        {
        //                            smtp.Host = "smtp.gmail.com";
        //                            smtp.EnableSsl = true;
        //                            NetworkCredential cred = new NetworkCredential("noreply.itglobal@gmail.com", "cofozlabrfkyqmfs");
        //                            smtp.UseDefaultCredentials = true;
        //                            smtp.Credentials = cred;
        //                            smtp.Port = 587;
        //                            smtp.Send(mailMessage);
        //                        }
        //                    }
        //                }
        //            }
        //        }
        //        return Content("Ok");
        //    }
        //    return Content("No");
        //}
    }
}