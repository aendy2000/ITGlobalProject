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
    [AdminLoginVerification]
    public class QuanLyNhanSuController : Controller
    {
        CP25Team06Entities model = new CP25Team06Entities();
        private static string ApiKey = "AIzaSyDvSOwmXoeKhIDNe37d17uvGDvK5TTepkc";
        private static string Bucket = "it-global-project.appspot.com";
        private static string AuthEmail = "itglobalStorage@gmail.com";
        private static string AuthPassword = "itglobalStorage123";

        // GET: Admins/QuanLyNhanSu
        public ActionResult danhSachNhanVien(int? page, int? pageSize, int? type)
        {
            ViewBag.ShowActive = "danhSachNhanVien";

            var department = model.Department.ToList();
            Session["lst-department"] = department;
            var role = model.Position.Where(p => !p.Name.ToLower().Equals("admin")).ToList();
            Session["lst-role"] = role;
            var kynang = model.SkillsCategory.OrderBy(k => k.Name).ToList();
            Session["lst-kynang"] = kynang;
            var trocap = model.SubsidiesCategory.OrderBy(k => k.Name).ToList();
            Session["lst-trocap"] = trocap;
            var ngaynghi = model.LeaveDate.OrderBy(k => k.Name).ToList();
            Session["lst-ngaynghi"] = ngaynghi;

            if (type == null)
                type = 1;
            if (page == null)
                page = 1;
            if (pageSize == null)
                pageSize = 8;

            var employee = model.Employees.OrderByDescending(o => o.ID).ToList();
            employee.Remove(model.Employees.Find(1));

            Session["lstEmployees"] = employee;
            Session["DefaultlstEmployees"] = employee;

            ViewBag.typeListNhanSu = type;
            return View("danhSachNhanVien", employee.ToPagedList((int)page, (int)pageSize));
        }

        public ActionResult danhSachNhanVienGridPartial(int? page, int? pageSize, int? type)
        {
            if (Session["user-id"] == null)
                return Content("DANGNHAP");

            if (type == null)
                type = 1;
            if (page == null)
                page = 1;
            if (pageSize == null)
                pageSize = 8;

            var employee = Session["lstEmployees"] as List<Employees>;

            ViewBag.countListNhanSu = pageSize;
            ViewBag.typeListNhanSu = type;
            return PartialView("_nhanVienListPartialView", employee.ToPagedList((int)page, (int)pageSize));
        }

        [HttpPost]
        public ActionResult SoLuongPhanTrang(int? typestr, int? listCount)
        {
            if (Session["lstEmployees"] == null || Session["user-id"] == null)
                return Content("DANGNHAP");

            if (typestr == null)
                typestr = 1;
            int page = 1;
            if (listCount == null)
                listCount = 8;
            var employee = Session["lstEmployees"] as List<Employees>;

            ViewBag.typeListNhanSu = typestr;
            ViewBag.countListNhanSu = listCount;

            return PartialView("_nhanVienListPartialView", employee.OrderByDescending(o => o.ID).ToPagedList((int)page, (int)listCount));
        }
        [HttpPost]
        public ActionResult imPortNhanVien(HttpPostedFileBase lstNhanVien)
        {
            if (Session["user-id"] == null)
                return Content("DANGNHAP");

            string filePath = string.Empty;
            if (lstNhanVien != null)
            {
                try
                {


                    string path = Server.MapPath("~/Content/FileUpload/");
                    if (!Directory.Exists(path))
                    {
                        Directory.CreateDirectory(path);
                    }
                    filePath = path + Path.GetFileName(lstNhanVien.FileName);
                    string extension = Path.GetExtension(lstNhanVien.FileName);
                    lstNhanVien.SaveAs(filePath);

                    string conString = string.Empty;
                    switch (extension)
                    {
                        case ".xls":
                            conString = ConfigurationManager.ConnectionStrings["Excel03ConString"].ConnectionString;
                            break;
                        case ".xlsx":
                            conString = ConfigurationManager.ConnectionStrings["Excel07ConString"].ConnectionString;
                            break;
                    }
                    DataTable dtExcel = new DataTable();
                    //đọc dữ liệu từ excel
                    try
                    {
                        conString = string.Format(conString, filePath);
                        using (OleDbConnection connExcel = new OleDbConnection(conString))
                        {
                            using (OleDbCommand cmdExcel = new OleDbCommand())
                            {
                                using (OleDbDataAdapter odaExcel = new OleDbDataAdapter())
                                {
                                    cmdExcel.Connection = connExcel;
                                    connExcel.Open();
                                    DataTable dtExcelSchema = connExcel.GetOleDbSchemaTable(OleDbSchemaGuid.Tables, null);
                                    string sheetName = dtExcelSchema.Rows[1].Field<string>("TABLE_NAME");
                                    connExcel.Close();

                                    connExcel.Open();
                                    cmdExcel.CommandText = "SELECT * from [" + sheetName + "]";
                                    odaExcel.SelectCommand = cmdExcel;
                                    odaExcel.Fill(dtExcel);
                                    connExcel.Close();
                                }
                            }
                        }
                    }
                    catch
                    {
                        return Content("INCORRECT");
                    }

                    DataRow dr = dtExcel.Rows[0];

                    if (dr[1].ToString().ToLower().IndexOf("họ") == -1
                        || dr[2].ToString().ToLower().IndexOf("cmnd/cccd") == -1
                        || dr[3].ToString().ToLower().IndexOf("quốc tịch") == -1
                        || dr[4].ToString().ToLower().IndexOf("ngày sinh") == -1
                        || dr[5].ToString().ToLower().IndexOf("số điện thoại") == -1
                        || dr[6].ToString().ToLower().IndexOf("giới tính") == -1
                        || dr[7].ToString().ToLower().IndexOf("email") == -1
                        || dr[8].ToString().ToLower().IndexOf("hôn nhân") == -1
                        || dr[10].ToString().ToLower().IndexOf("vào làm") == -1
                        || dr[11].ToString().ToLower().IndexOf("chức") == -1
                        || dr[12].ToString().ToLower().IndexOf("hình thức") == -1)
                    {
                        return Content("INCORRECT");
                    }

                    dr.Delete();
                    dtExcel.AcceptChanges();

                    List<List<string>> lstTemp = new List<List<string>>();
                    int index = 0;

                    if (dtExcel.Rows.Count != 13)
                    {
                        foreach (DataRow data in dtExcel.Rows)
                        {
                            Employees emp = new Employees();
                            string error = "";
                            int i = 1;

                            char[] checkDate = {'!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '=',
                        '~', '`', '\'', '\\', '\'', ':', ';', '[', '{', ']', '}', '|', '/', '?', '.', '>', ',', '<', '\"'};

                            char[] kytudacbiet = {'!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '+', '=',
                        '~', '`', '\'', '\\', '\'', ':', ';', '[', '{', ']', '}', '|', '/', '?', '.', '>', ',', '<', '\"'};
                            char[] so = { '1', '2', '3', '4', '5', '6', '7', '8', '9', '0' };
                            char[] chuViet = {'à','À','ả','Ả','ã','Ã','á','Á','ạ','Ạ','ă','Ă','ằ','Ằ','ẳ','Ẳ','ẵ','Ẵ','ắ','Ắ','ặ',
                            'Ặ','â','Â','ầ','Ầ','ẩ','Ẩ','ẫ','Ẫ','ấ','Ấ','ậ','Ậ','đ','Đ','è','È','ẻ','Ẻ','ẽ','Ẽ','é','É','ẹ','Ẹ',
                            'ê','Ê','ề','Ề','ể','Ể','ễ','Ễ','ế','Ế','ệ','Ệ','ì','Ì','ỉ','Ỉ','ĩ','Ĩ','í','Í','ị','Ị','ò','Ò','ỏ',
                            'Ỏ','õ','Õ','ó','Ó','ọ','Ọ','ô','Ô','ồ','Ồ','ổ','Ổ','ỗ','Ỗ','ố','Ố','ộ','Ộ','ơ','Ơ','ờ','Ờ','ở','Ở',
                            'ỡ','Ỡ','ớ','Ớ','ợ','Ợ','ù','Ù','ủ','Ủ','ũ','Ũ','ú','Ú','ụ','Ụ','ư','Ư','ừ','Ừ','ử','Ử','ữ','Ữ','ứ',
                            'Ứ','ự','Ự','ỳ','Ỳ','ỷ','Ỷ','ỹ','Ỹ','ý','Ý','ỵ','Ỵ'};
                            char[] chuAnh = { 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
                            't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K', 'L', 'M', 'N', 'O',
                            'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' };
                            char[] khoangTrang = { ' ' };

                            string mailss = data[7].ToString().Trim();
                            var checktaikhoan = model.Employees.FirstOrDefault(e => e.WorkEmail.ToLower().Equals(mailss));

                            //Email Chưa tồn tại
                            if (checktaikhoan == null)
                            {
                                // 1 Validation tên
                                if (data[1].ToString().Trim().Length < 1)
                                {
                                    error += i + ". Không tìm thấy tên Nhân viên.#";
                                    i++;
                                }
                                else if (data[1].ToString().Trim().LastIndexOfAny(kytudacbiet) != -1 || data[1].ToString().Trim().LastIndexOfAny(so) != -1)
                                {
                                    error += i + ". Tên nhân viên không đúng định dạng.#";
                                    i++;
                                }

                                // 2 Validation cmnd
                                if (data[2].ToString().Trim().Length < 1)
                                {
                                    error += i + ". Không tìm thấy CMND/CCCD Nhân viên.#";
                                    i++;
                                }
                                else if ((data[2].ToString().Trim().Length != 12 && data[2].ToString().Trim().Length != 9)
                                    || data[2].ToString().Trim().LastIndexOfAny(kytudacbiet) != -1 || data[2].ToString().Trim().LastIndexOfAny(chuViet) != -1
                                    || data[2].ToString().Trim().LastIndexOfAny(chuAnh) != -1 || data[2].ToString().Trim().LastIndexOfAny(khoangTrang) != -1)
                                {
                                    error += i + ". CMND/CCCD nhân viên không đúng định dạng.#";
                                    i++;
                                }

                                // 3 Validation Quốc tịch
                                if (data[3].ToString().Trim().Length < 1)
                                {
                                    error += i + ". Không tìm thấy Quốc tịch Nhân viên.#";
                                    i++;
                                }
                                else if (data[3].ToString().LastIndexOfAny(kytudacbiet) != -1 || data[3].ToString().LastIndexOfAny(so) != -1)
                                {
                                    error += i + ". Quốc tịch nhân viên có chứa ký tự đặc biệt hoặc ký tự số.#";
                                    i++;
                                }

                                // 4 Validation ngày sinh
                                if (data[4].ToString().Trim().Length < 1)
                                {
                                    error += i + ". Không tìm thấy ngày sinh Nhân viên.#";
                                    i++;
                                }
                                else if (data[4].ToString().Trim().LastIndexOfAny(chuViet) != -1 || data[4].ToString().Trim().LastIndexOfAny(chuAnh) != -1
                                    || data[4].ToString().Trim().LastIndexOfAny(khoangTrang) != -1 || data[4].ToString().Trim().LastIndexOfAny(checkDate) != -1
                                    || data[4].ToString().Trim().Split('-').Count() != 3)
                                {
                                    error += i + ". Ngày sinh nhân viên không đúng định dạng (yyyy-MM-dd).#";
                                    i++;
                                }
                                else if (data[4].ToString().Trim().Split('-')[0].Length != 4 || data[4].ToString().Trim().Split('-')[1].Length != 2
                                    || data[4].ToString().Trim().Split('-')[2].Length != 2)
                                {
                                    error += i + ". Ngày sinh nhân viên không đúng định dạng (yyyy-MM-dd).#";
                                    i++;
                                }
                                else if (Int32.Parse(data[4].ToString().Trim().Split('-')[0]) > DateTime.Now.Year || Int32.Parse(data[4].ToString().Trim().Split('-')[1]) > 12
                                    || Int32.Parse(data[4].ToString().Trim().Split('-')[2]) > 31)
                                {
                                    error += i + ". Ngày sinh nhân viên không đúng định dạng (yyyy-MM-dd).#";
                                    i++;
                                }
                                else if (Int32.Parse(data[4].ToString().Trim().Split('-')[0]) > DateTime.Now.Year || Int32.Parse(data[4].ToString().Trim().Split('-')[1]) > 12
                                    || Int32.Parse(data[4].ToString().Trim().Split('-')[2]) > 31)
                                {
                                    error += i + ". Ngày sinh nhân viên không đúng định dạng (yyyy-MM-dd).#";
                                    i++;
                                }
                                else if (Convert.ToDateTime(data[4].ToString().Trim()) > DateTime.Now)
                                {
                                    error += i + ". Ngày sinh nhân viên không đúng, đã vượt quá ngày của hiện tại.#";
                                    i++;
                                }

                                // 5 Validation điện thoại
                                if (data[5].ToString().Trim().Length < 1)
                                {
                                    error += i + ". Không tìm thấy số điện thoại Nhân viên.#";
                                    i++;
                                }
                                else if (data[5].ToString().Trim().LastIndexOfAny(chuViet) != -1 || data[5].ToString().Trim().LastIndexOfAny(chuAnh) != -1
                                    || data[5].ToString().Trim().LastIndexOfAny(khoangTrang) != -1 || data[5].ToString().Trim().LastIndexOfAny(kytudacbiet) != -1
                                    || data[5].ToString().Trim().Length != 10)
                                {
                                    error += i + ". Số điện thoại nhân viên không đúng định dạng.#";
                                    i++;
                                }

                                // 6 Validation giới tính
                                if (data[6].ToString().Trim().Length < 1)
                                {
                                    error += i + ". Không tìm thấy giới tính Nhân viên.#";
                                    i++;
                                }
                                else if (!data[6].ToString().Trim().Equals("Nam") && !data[6].ToString().Trim().Equals("Nữ"))
                                {
                                    error += i + ". Giới tính nhân viên không đúng (Nam hoặc Nữ).#";
                                    i++;
                                }

                                // 7 Validation Email
                                bool checkEmail;
                                if (data[7].ToString().Trim().Length < 1)
                                {
                                    error += i + ". Không tìm thấy địa chỉ Email Nhân viên.#";
                                    i++;
                                }
                                else
                                {
                                    try
                                    {
                                        MailAddress m = new MailAddress(data[7].ToString().Trim());
                                        checkEmail = true;
                                    }
                                    catch (FormatException)
                                    {
                                        checkEmail = false;
                                    }

                                    if (checkEmail == false)
                                    {
                                        error += i + ". Địa chỉ Email nhân viên chưa đúng định dạng.#";
                                        i++;
                                    }
                                }

                                // 8 Validation hôn nhân
                                if (data[8].ToString().Trim().Length < 1)
                                {
                                    error += i + ". Không tìm thấy thông tin hôn nhân của Nhân viên.#";
                                    i++;
                                }
                                else if (!data[8].ToString().Trim().Equals("Độc thân") && !data[8].ToString().Trim().Equals("Đã kết hôn") && !data[8].ToString().Trim().Equals("Khác"))
                                {
                                    error += i + ". Thông tin hôn nhân nhân viên không đúng.#";
                                    i++;
                                }

                                // 9 Validation mức lương
                                if (data[9].ToString().Trim().Replace(".", "").Replace(",", "").Length < 1)
                                {
                                    error += i + ". Không tìm thấy mức lương của Nhân viên.#";
                                    i++;
                                }
                                else
                                {
                                    bool checkluong;
                                    try
                                    {
                                        decimal tienluong = Convert.ToDecimal(data[9].ToString().Trim().Replace(".", "").Replace(",", ""));
                                        checkluong = true;
                                    }
                                    catch (FormatException)
                                    {
                                        checkluong = false;
                                    }

                                    if (checkluong == false)
                                    {
                                        error += i + ". Mức lương nhân viên không hợp lệ.#";
                                        i++;
                                    }
                                }

                                // 10 Validation ngày vào làm
                                if (data[10].ToString().Trim().Length < 1)
                                {
                                    error += i + ". Không tìm thấy ngày vào làm của Nhân viên.#";
                                    i++;
                                }
                                else if (data[10].ToString().Trim().LastIndexOfAny(chuViet) != -1 || data[10].ToString().Trim().LastIndexOfAny(chuAnh) != -1
                                    || data[10].ToString().Trim().LastIndexOfAny(khoangTrang) != -1 || data[10].ToString().Trim().LastIndexOfAny(checkDate) != -1
                                    || data[10].ToString().Trim().Split('-').Count() != 3)
                                {
                                    error += i + ". Ngày vào làm của nhân viên không đúng định dạng (yyyy-MM-dd).#";
                                    i++;
                                }
                                else if (data[10].ToString().Trim().Split('-')[0].Length != 4 || data[10].ToString().Trim().Split('-')[1].Length != 2
                                    || data[10].ToString().Trim().Split('-')[2].Length != 2)
                                {
                                    error += i + ". Ngày vào làm của nhân viên không đúng định dạng (yyyy-MM-dd).#";
                                    i++;
                                }
                                else if (Int32.Parse(data[10].ToString().Trim().Split('-')[0]) > DateTime.Now.Year || Int32.Parse(data[10].ToString().Trim().Split('-')[1]) > 12
                                    || Int32.Parse(data[10].ToString().Trim().Split('-')[2]) > 31)
                                {
                                    error += i + ". Ngày vào làm của nhân viên không đúng định dạng (yyyy-MM-dd).#";
                                    i++;
                                }
                                else if (Int32.Parse(data[10].ToString().Trim().Split('-')[1]) > 12 || Int32.Parse(data[10].ToString().Trim().Split('-')[2]) > 31)
                                {
                                    error += i + ". Ngày vào làm của nhân viên không đúng định dạng (yyyy-MM-dd).#";
                                    i++;
                                }

                                // 11 Validation chức danh
                                string tenchucdanh = data[11].ToString().Trim();
                                var chucdanh = model.Position.FirstOrDefault(c => c.Name.Equals(tenchucdanh));
                                if (chucdanh == null)
                                {
                                    error += i + ". Không tìm thấy chức danh tương ứng.#";
                                    i++;
                                }

                                // 12 Validation chức danh
                                if (data[12].ToString().Trim().Length < 1)
                                {
                                    error += i + ". Không tìm thấy hình thức làm việc của Nhân viên.#";
                                    i++;
                                }
                                else if (!data[12].ToString().Trim().Equals("Thực tập sinh")
                                    && !data[12].ToString().Trim().Equals("Thử việc")
                                    && !data[12].ToString().Trim().Equals("Nhân viên chính thức"))
                                {
                                    error += i + ". Hình thước làm việc của nhân viên không hợp lệ.#";
                                    i++;
                                }
                            }
                            else
                            {
                                error += i + ". Email đang được sử dụng bởi: " + checktaikhoan.ID_Employee + ".#";
                                i++;
                            }

                            //Kiểm tra và thêm nhân viên vào hệ thống.
                            if (string.IsNullOrEmpty(error)) //Khong có lỗi, có thể thêm nv
                            {
                                emp.Name = data[1].ToString().Trim();
                                emp.IdentityCard = data[2].ToString().Trim();
                                emp.Nationality = data[3].ToString().Trim();
                                emp.Birthday = Convert.ToDateTime(data[4].ToString().Trim());
                                emp.TelephoneMobile = data[5].ToString().Trim();
                                emp.Sex = data[6].ToString().Trim();
                                emp.WorkEmail = data[7].ToString().Trim();
                                emp.MaritalStatus = data[8].ToString().Trim();
                                emp.Wage = Convert.ToDecimal(data[9].ToString().Trim().Replace(",", "").Replace(".", ""));
                                emp.JoinedDate = Convert.ToDateTime(data[10].ToString().Trim());

                                string tenchucdanh = data[11].ToString().Trim();
                                var chucdanh = model.Position.FirstOrDefault(c => c.Name.Equals(tenchucdanh));
                                emp.ID_Position = chucdanh.ID;
                                emp.EmploymentStatus = data[12].ToString().Trim();

                                //Tạo mật khẩu ngẫu nhiên 10 ký tự
                                const string srcs = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                                int lengths = 10;
                                var pass = new StringBuilder();
                                Random Ran = new Random();
                                for (var j = 0; j < lengths; j++)
                                {
                                    var c = srcs[Ran.Next(0, srcs.Length)];
                                    pass.Append(c);
                                }
                                emp.Password = pass.ToString();
                                emp.Lock = false;
                                emp.AccountSatus = false;

                                model.Employees.Add(emp);
                                model.SaveChanges();

                                emp.ID_Employee = "NV" + emp.ID.ToString("D8");
                                model.Entry(emp).State = EntityState.Modified;
                                model.SaveChanges();

                                try
                                {
                                    //Gửi mật khẩu đến email
                                    using (MailMessage mailMessage = new MailMessage("noreply.itglobal@gmail.com", data[7].ToString().Trim()))
                                    {
                                        mailMessage.Subject = "Cấp tài khoản - IT-Global.Net";
                                        mailMessage.IsBodyHtml = true;
                                        mailMessage.Body = "<font size=4><b>Xin chào " + data[1].ToString().Trim() + ",</b><br/><br/></font>" +
                                            "<font size=4>Chúng tôi đã thiết lập một tài khoản truy cập vào hệ thống IT-Global.net.<br/>" +
                                            "Sau khi đăng nhập lần đầu, hệ thống sẽ yêu cầu thay đổi mật khẩu cho bạn.<br/>" +
                                            "Thông tin tài khoản của bạn là:<br/><br/>" +
                                            "<b>Tài khoản:</b> " + data[7].ToString().Trim() + "<br/>" +
                                            "<b>Mật khẩu:</b> " + pass.ToString() + "<br/><br/></font>" +
                                            "<font size=4 color=red><i><u>Thông tin này là bảo mật. Vui lòng không cung cấp thông tin này cho bất kỳ ai.</u></i></font>";

                                        using (SmtpClient smtp = new SmtpClient())
                                        {
                                            smtp.Host = "smtp.gmail.com";
                                            smtp.EnableSsl = true;
                                            NetworkCredential cred = new NetworkCredential("noreply.itglobal@gmail.com", "cofozlabrfkyqmfs");
                                            smtp.UseDefaultCredentials = true;
                                            smtp.Credentials = cred;
                                            smtp.Port = 587;

                                            smtp.Send(mailMessage);
                                        }
                                    }
                                }
                                catch
                                {
                                    error += i + ". Không thể gửi thông tin tài khoản đến Email.#";
                                    i++;
                                }

                                lstTemp.Add(new List<string>());
                                lstTemp[index].Add(data[1].ToString().Trim());
                                lstTemp[index].Add(data[2].ToString().Trim());
                                lstTemp[index].Add(data[3].ToString().Trim());
                                lstTemp[index].Add(data[4].ToString().Trim());
                                lstTemp[index].Add(data[5].ToString().Trim());
                                lstTemp[index].Add(data[6].ToString().Trim());
                                lstTemp[index].Add(data[7].ToString().Trim());
                                lstTemp[index].Add(data[8].ToString().Trim());
                                lstTemp[index].Add(data[9].ToString().Trim());
                                lstTemp[index].Add(data[10].ToString().Trim());
                                lstTemp[index].Add(data[11].ToString().Trim());
                                lstTemp[index].Add(data[12].ToString().Trim());
                                lstTemp[index].Add(error);
                            }
                            else
                            {
                                lstTemp.Add(new List<string>());
                                lstTemp[index].Add(data[1].ToString().Trim());
                                lstTemp[index].Add(data[2].ToString().Trim());
                                lstTemp[index].Add(data[3].ToString().Trim());
                                lstTemp[index].Add(data[4].ToString().Trim());
                                lstTemp[index].Add(data[5].ToString().Trim());
                                lstTemp[index].Add(data[6].ToString().Trim());
                                lstTemp[index].Add(data[7].ToString().Trim());
                                lstTemp[index].Add(data[8].ToString().Trim());
                                lstTemp[index].Add(data[9].ToString().Trim());
                                lstTemp[index].Add(data[10].ToString().Trim());
                                lstTemp[index].Add(data[11].ToString().Trim());
                                lstTemp[index].Add(data[12].ToString().Trim());
                                lstTemp[index].Add(error);
                            }

                            index++;
                        }
                        return PartialView("_DanhSachNhanVienImport", lstTemp);
                    }
                }
                catch
                {
                    return Content("INCORRECT");
                }
                return Content("INCORRECT");
            }
            return Content("DANHSACH");
        }
        public async Task<ActionResult> themNhanVien(HttpPostedFileBase anhHopDong, string hoten,
        string cmnd, string quoctich, string honnhan, string ngaysinh, string gioitinh,
        string sodienthoaididong, string sodienthoaikhac, string diachiemailcongty, string diachiemailkhac,
        string diachinha, string mucluong, string dsNganHang, string sotaikhoan, string chutaikhoan, string kynang,
        string trinhdongoaingu, string phuthuocnhanthan, string trocap, string ngayvaolam, int vaitro, string hinhthuc,
         string loaihopdong, string ngaykyhopdong, string ngaygiahanhopdong, string songaynghiphep)
        {
            try
            {
                if (Session["user-id"] == null)
                    return Content("DANGNHAP");
                var checkExits = model.Employees.FirstOrDefault(e => e.WorkEmail.ToLower().Equals(diachiemailcongty.ToLower().Trim()));
                if (checkExits != null)
                    return Content("EXITS");

                Employees emp = new Employees();
                emp.ID_Position = vaitro;
                emp.Name = hoten;
                emp.IdentityCard = cmnd.Replace(" ", "");
                emp.Nationality = quoctich;
                emp.MaritalStatus = honnhan;
                emp.Birthday = Convert.ToDateTime(ngaysinh);
                emp.Sex = gioitinh;
                emp.Address = diachinha;
                emp.TelephoneOrther = sodienthoaikhac;
                emp.TelephoneMobile = sodienthoaididong;
                emp.WorkEmail = diachiemailcongty;
                emp.OrtherEmail = diachiemailkhac;

                if (string.IsNullOrEmpty(mucluong))
                    emp.Wage = 0;
                else
                    emp.Wage = Convert.ToDecimal(mucluong.Replace(",", ""));

                emp.BankName = dsNganHang;
                emp.BankAccountNumber = sotaikhoan;
                emp.BankAccountHolderName = chutaikhoan;
                emp.JoinedDate = Convert.ToDateTime(ngayvaolam);
                emp.EmploymentStatus = hinhthuc;
                emp.Lock = false;
                emp.AccountSatus = false;

                //Tạo mật khẩu ngẫu nhiên 10 ký tự
                const string srcs = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                int lengths = 10;
                var pass = new StringBuilder();
                Random Ran = new Random();
                for (var i = 0; i < lengths; i++)
                {
                    var c = srcs[Ran.Next(0, srcs.Length)];
                    pass.Append(c);
                }
                emp.Password = pass.ToString();

                model.Employees.Add(emp);
                model.SaveChanges();

                emp.ID_Employee = "NV" + emp.ID.ToString("D8");
                model.Entry(emp).State = EntityState.Modified;
                model.SaveChanges();

                //Hợp đồng
                model = new CP25Team06Entities();
                if (!string.IsNullOrEmpty(loaihopdong) || !string.IsNullOrEmpty(ngaykyhopdong) || !string.IsNullOrEmpty(ngaygiahanhopdong))
                {
                    EmploymentContracts employ = new EmploymentContracts();
                    employ.ID_Employee = emp.ID;
                    employ.StartDate = Convert.ToDateTime(ngaykyhopdong);
                    employ.EmploymentCategory = loaihopdong;

                    if (loaihopdong.Equals("Hợp đồng có thời hạn"))
                        employ.EndDate = Convert.ToDateTime(ngaygiahanhopdong);

                    FileStream stream;
                    if (anhHopDong != null)
                    {
                        if (anhHopDong.ContentLength > 0)
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

                            string path = Path.Combine(Server.MapPath("~/Content/images/"), sb.ToString().Trim() + anhHopDong.FileName); ;
                            anhHopDong.SaveAs(path);
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
                                .Child(sb.ToString().Trim() + anhHopDong.FileName)
                                .PutAsync(stream, cancellation.Token);
                            try
                            {
                                string link = await task;
                                employ.ImageURL = link;
                                System.IO.File.Delete(path);
                            }
                            catch
                            {
                                return Content("Đã có xảy ra lỗi, vui lòng thử lại");
                            }
                        }
                    }
                    model.EmploymentContracts.Add(employ);
                    model.SaveChanges();
                }

                //Kỹ năng
                if (!string.IsNullOrEmpty(kynang))
                {
                    if (kynang.IndexOf("_") != -1)
                    {
                        for (int i = 0; i < kynang.Split('_').ToList().Count; i++)
                        {
                            PersonalSkills perSkill = new PersonalSkills();
                            perSkill.ID_Employee = emp.ID;
                            perSkill.ID_Skills = Int32.Parse(kynang.Split('_')[i]);
                            model.PersonalSkills.Add(perSkill);
                            model.SaveChanges();
                        }
                    }
                    else
                    {
                        PersonalSkills perSkill = new PersonalSkills();
                        perSkill.ID_Employee = emp.ID;
                        perSkill.ID_Skills = Int32.Parse(kynang);
                        model.PersonalSkills.Add(perSkill);
                        model.SaveChanges();
                    }
                }

                //Nghỉ phép
                if (!string.IsNullOrEmpty(songaynghiphep))
                {
                    foreach (var item in songaynghiphep.Split('-').ToList())
                    {
                        OnLeave onleave = new OnLeave();
                        onleave.ID_LeaveDate = Int32.Parse(item);
                        onleave.ID_Employee = emp.ID;

                        model.OnLeave.Add(onleave);
                        model.SaveChanges();
                    }
                }

                //Ngoại ngữ
                if (!string.IsNullOrEmpty(trinhdongoaingu))
                {
                    //Nhiều hơn 1 ngoại ngữ
                    if (trinhdongoaingu.IndexOf("=") != -1)
                    {
                        for (int i = 0; i < trinhdongoaingu.Split('=').ToList().Count; i++)
                        {
                            LanguagesSkills lgSkill = new LanguagesSkills();
                            lgSkill.ID_Employee = emp.ID;
                            lgSkill.Name = trinhdongoaingu.Split('=')[i].Split('_')[0];
                            lgSkill.listening = trinhdongoaingu.Split('=')[i].Split('_')[1];
                            lgSkill.Speaking = trinhdongoaingu.Split('=')[i].Split('_')[2];
                            lgSkill.Reading = trinhdongoaingu.Split('=')[i].Split('_')[3];
                            lgSkill.Writing = trinhdongoaingu.Split('=')[i].Split('_')[4];

                            model.LanguagesSkills.Add(lgSkill);
                            model.SaveChanges();
                        }
                    }
                    //Chỉ có 1 ngoại ngữ
                    else
                    {
                        LanguagesSkills lgSkill = new LanguagesSkills();
                        lgSkill.ID_Employee = emp.ID;
                        lgSkill.Name = trinhdongoaingu.Split('_')[0];
                        lgSkill.listening = trinhdongoaingu.Split('_')[1];
                        lgSkill.Speaking = trinhdongoaingu.Split('_')[2];
                        lgSkill.Reading = trinhdongoaingu.Split('_')[3];
                        lgSkill.Writing = trinhdongoaingu.Split('_')[4];

                        model.LanguagesSkills.Add(lgSkill);
                        model.SaveChanges();
                    }
                }

                //Phụ thuộc Nhân thân
                if (!string.IsNullOrEmpty(phuthuocnhanthan))
                {
                    //Nhiều hơn 1 nhân thân
                    if (phuthuocnhanthan.IndexOf("=") != -1)
                    {
                        for (int i = 0; i < phuthuocnhanthan.Split('=').ToList().Count; i++)
                        {
                            DependentsInformation depen = new DependentsInformation();
                            depen.ID_Employee = emp.ID;
                            depen.Name = phuthuocnhanthan.Split('=')[i].Split('_')[0];
                            depen.Relationship = phuthuocnhanthan.Split('=')[i].Split('_')[1];
                            depen.Birthday = Convert.ToDateTime(phuthuocnhanthan.Split('=')[i].Split('_')[2]);

                            model.DependentsInformation.Add(depen);
                            model.SaveChanges();
                        }
                    }
                    //Chỉ có 1 nhân thân
                    else
                    {
                        DependentsInformation depen = new DependentsInformation();
                        depen.ID_Employee = emp.ID;
                        depen.Name = phuthuocnhanthan.Split('_')[0];
                        depen.Relationship = phuthuocnhanthan.Split('_')[1];
                        depen.Birthday = Convert.ToDateTime(phuthuocnhanthan.Split('_')[2]);

                        model.DependentsInformation.Add(depen);
                        model.SaveChanges();
                    }
                }

                //Trợ cấp & phụ cấp
                if (!string.IsNullOrEmpty(trocap))
                {
                    if (trocap.IndexOf("_") != -1)
                    {
                        for (int i = 0; i < trocap.Split('_').ToList().Count; i++)
                        {
                            Subsidies subs = new Subsidies();
                            subs.ID_Employee = emp.ID;
                            subs.ID_SubsidiesCategory = Int32.Parse(trocap.Split('_')[i]);
                            model.Subsidies.Add(subs);
                            model.SaveChanges();
                        }
                    }
                    else
                    {
                        Subsidies subs = new Subsidies();
                        subs.ID_Employee = emp.ID;
                        subs.ID_SubsidiesCategory = Int32.Parse(trocap);
                        model.Subsidies.Add(subs);
                        model.SaveChanges();
                    }
                }

                //Gửi mật khẩu đến email
                using (MailMessage mailMessage = new MailMessage("noreply.itglobal@gmail.com", diachiemailcongty))
                {
                    mailMessage.Subject = "Cấp tài khoản - IT-Global.Net";
                    mailMessage.IsBodyHtml = true;
                    mailMessage.Body = "<font size=4><b>Xin chào " + hoten.Trim() + ",</b><br/><br/></font>" +
                        "<font size=4>Chúng tôi đã thiết lập một tài khoản truy cập vào hệ thống IT-Global.net.<br/>" +
                        "Sau khi đăng nhập lần đầu, hệ thống sẽ yêu cầu thay đổi mật khẩu cho bạn.<br/>" +
                        "Thông tin tài khoản của bạn là:<br/><br/>" +
                        "<b>Tài khoản:</b> " + diachiemailcongty + "<br/>" +
                        "<b>Mật khẩu:</b> " + pass.ToString() + "<br/><br/></font>" +
                        "<font size=4 color=red><i><u>Thông tin này là bảo mật. Vui lòng không cung cấp thông tin này cho bất kỳ ai.</u></i></font>";

                    using (SmtpClient smtp = new SmtpClient())
                    {
                        smtp.Host = "smtp.gmail.com";
                        smtp.EnableSsl = true;
                        NetworkCredential cred = new NetworkCredential("noreply.itglobal@gmail.com", "cofozlabrfkyqmfs");
                        smtp.UseDefaultCredentials = true;
                        smtp.Credentials = cred;
                        smtp.Port = 587;

                        smtp.Send(mailMessage);
                    }
                }
            }
            catch
            {
                return Content("Đã có xảy ra lỗi, vui lòng thử lại");
            }

            model = new CP25Team06Entities();

            int type = 1;
            int page = 1;
            int pageSize = 8;

            var employees = model.Employees.Where(e => e.ID_Position != 1).OrderByDescending(o => o.ID).ToList();
            Session["lstEmployees"] = employees;
            Session["DefaultlstEmployees"] = employees;

            ViewBag.typeListNhanSu = type;
            return PartialView("_nhanVienListPartialView", employees.ToPagedList((int)page, (int)pageSize));
        }

        [HttpPost]
        public ActionResult luaChonBoPhan(int? id)
        {
            if (id == null || Session["user-id"] == null)
                return Content("DANHSACH");

            var bophan = model.Department.Find(id);
            bophan.Position.Remove(model.Position.Find(1));

            return PartialView("_danhSachChucDanhTheoBoPhan_ThemNhanVien", bophan.Position.ToList());
        }
        [HttpPost]
        public ActionResult timKiemNhanVien(string noidungs, int? typestr, int? listCount)
        {
            if (Session["lstEmployees"] == null || Session["user-id"] == null)
                return Content("DANGNHAP");

            noidungs = noidungs.ToLower().Trim();
            int page = 1;
            if (listCount == null)
                listCount = 8;

            ViewBag.countListNhanSu = listCount;
            ViewBag.typeListNhanSu = typestr;

            if (string.IsNullOrEmpty(noidungs))
            {
                var employee = Session["DefaultlstEmployees"] as List<Employees>;
                Session["lstEmployees"] = employee;

                return PartialView("_nhanVienListPartialView", employee.ToPagedList((int)page, (int)listCount));
            }
            else
            {
                var employee = Session["DefaultlstEmployees"] as List<Employees>;
                var employees = employee.Where(e => e.Name.ToLower().Contains(noidungs)
                || e.ID_Employee.ToLower().Contains(noidungs)
                || e.WorkEmail.ToLower().Contains(noidungs)
                || e.IdentityCard.ToLower().Contains(noidungs)).OrderByDescending(o => o.ID).ToList();
                Session["lstEmployees"] = employees;

                return PartialView("_nhanVienListPartialView", employees.ToPagedList((int)page, (int)listCount));
            }
        }
        public ActionResult thongTinChiTiet(int? id)
        {
            if (id == null || Session["user-id"] == null)
                return RedirectToAction("danhSachNhanVien", "QuanLyNhanSu");

            ViewBag.ShowActive = "TTChiTiet";
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (user != null)
            {
                return View("thongTinChiTiet", user);
            }
            return RedirectToAction("danhSachNhanVien", "QuanLyNhanSu");
        }
        public ActionResult thongTinChiTietPartial(int? id)
        {
            if (id == null || Session["user-id"] == null)
                return Content("DANHSACH");

            ViewBag.ShowActive = "TTChiTiet";
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (user != null)
            {
                return PartialView("_thongTinChiTietPartial", user);
            }
            return Content("DANHSACH");
        }
        [HttpPost]
        public async Task<ActionResult> chinhSuaThongTinCaNhan(HttpPostedFileBase AvatarImg, int? id, string hoten, string cmnd,
        string quoctich, string honnhan, string ngaysinh, string gioitinh, string diachinha, string avatars, string sodienthoaididong,
        string sodienthoaikhac, string diachiemailcongty, string diachiemailkhac)
        {
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (id == null || user == null || Session["user-id"] == null)
                return Content("DANHSACH");

            if (!user.WorkEmail.ToLower().Equals(diachiemailcongty.ToLower().Trim()))
            {
                var checkExits = model.Employees.FirstOrDefault(e => e.WorkEmail.ToLower().Equals(diachiemailcongty.ToLower().Trim()));
                if (checkExits != null)
                    return Content("EXITS");
            }

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
                        catch
                        {
                            return Content("Đã có xảy ra lỗi, vui lòng thử lại!");
                        }
                    }
                }
                else
                {
                    user.Avatar = avatars;
                }

                user.Name = hoten.Trim();
                user.IdentityCard = cmnd.Replace(" ", "");
                user.Nationality = quoctich;
                user.MaritalStatus = honnhan;
                user.Birthday = Convert.ToDateTime(ngaysinh);
                user.Sex = gioitinh;
                user.Address = diachinha;
                user.TelephoneMobile = sodienthoaididong;
                user.TelephoneOrther = sodienthoaikhac;
                user.WorkEmail = diachiemailcongty;
                user.OrtherEmail = diachiemailkhac;

                model.Entry(user).State = EntityState.Modified;
                model.SaveChanges();

                return PartialView("_thongTinChiTietPartial", model.Employees.FirstOrDefault(u => u.ID == user.ID));
            }
            catch
            {
                return Content("Đã có xảy ra lỗi, vui lòng thử lại!");
            }
        }

        public ActionResult lienHeVaThanhToanPartial(int? id)
        {
            if (id == null || Session["user-id"] == null)
                return Content("DANHSACH");

            ViewBag.ShowActive = "danhSachNhanVien";
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (user != null)
            {
                return PartialView("_lienHeVaThanhToanPartial", user);
            }
            return Content("DANHSACH");
        }
        [HttpPost]
        public ActionResult chinhSuaLienHeVaThanhToan(int? id,
        string mucluong, string dsNganHang, string sotaikhoan, string chutaikhoan)
        {
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (id == null || user == null || Session["user-id"] == null)
                return Content("DANHSACH");


            user.Wage = Convert.ToDecimal(mucluong.Replace(",", ""));
            user.BankName = dsNganHang;
            user.BankAccountNumber = sotaikhoan;
            user.BankAccountHolderName = chutaikhoan.ToUpper();

            model.Entry(user).State = EntityState.Modified;
            model.SaveChanges();
            return PartialView("_lienHeVaThanhToanPartial", model.Employees.FirstOrDefault(u => u.ID == user.ID));
        }

        public ActionResult kyNangChuyenMonPartial(int? id)
        {
            if (id == null || Session["user-id"] == null)
                return Content("DANHSACH");

            ViewBag.ShowActive = "TTChiTiet";
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (user != null)
            {
                var kynang = model.SkillsCategory.OrderBy(k => k.Name).ToList();
                Session["lst-kynang"] = kynang;
                return PartialView("_kyNangChuyenMonPartial", user);
            }
            return Content("DANHSACH");
        }

        [HttpPost]
        public ActionResult chinhSuaKyNangChuyenMon(int? id, string kynang)
        {
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (id == null || user == null || Session["user-id"] == null)
                return Content("DANHSACH");

            model.PersonalSkills.RemoveRange(user.PersonalSkills);
            model.SaveChanges();
            //Kỹ năng
            if (!string.IsNullOrEmpty(kynang))
            {
                if (kynang.IndexOf("_") != -1)
                {
                    for (int i = 0; i < kynang.Split('_').ToList().Count; i++)
                    {
                        int idPerSkills = Int32.Parse(kynang.Split('_')[i]);

                        PersonalSkills perSkill = new PersonalSkills();
                        perSkill.ID_Employee = user.ID;
                        perSkill.ID_Skills = idPerSkills;
                        model.PersonalSkills.Add(perSkill);
                    }
                }
                else
                {
                    int idPerSkills = Int32.Parse(kynang);

                    PersonalSkills perSkill = new PersonalSkills();
                    perSkill.ID_Employee = user.ID;
                    perSkill.ID_Skills = idPerSkills;
                    model.PersonalSkills.Add(perSkill);
                }
                model.SaveChanges();
            }
            model = new CP25Team06Entities();
            var lstkynang = model.SkillsCategory.OrderBy(k => k.Name).ToList();
            Session["lst-kynang"] = lstkynang;
            return PartialView("_kyNangChuyenMonPartial", model.Employees.FirstOrDefault(u => u.ID == user.ID));
        }

        public ActionResult trinhDoNgoaiNguPartial(int? id)
        {
            if (id == null || Session["user-id"] == null)
                return Content("DANHSACH");

            ViewBag.ShowActive = "TTChiTiet";
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (user != null)
            {
                var lstNgoaiNgu = model.LanguagesSkills.Where(l => l.ID_Employee == user.ID).ToList();
                Session["lst-ngoaingu"] = lstNgoaiNgu;
                return PartialView("_trinhDoNgoaiNguPartial", user);
            }
            return Content("DANHSACH");
        }
        [HttpPost]
        public ActionResult chinhSuatrinhDoNgoaiNgu(int? id, string trinhdongoaingu)
        {
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (id == null || user == null || Session["user-id"] == null)
                return Content("DANHSACH");

            //Ngoại ngữ
            model.LanguagesSkills.RemoveRange(user.LanguagesSkills);
            model.SaveChanges();
            if (!string.IsNullOrEmpty(trinhdongoaingu))
            {
                //Nhiều hơn 1 ngoại ngữ
                if (trinhdongoaingu.IndexOf("=") != -1)
                {
                    for (int i = 0; i < trinhdongoaingu.Split('=').ToList().Count; i++)
                    {
                        LanguagesSkills lgSkill = new LanguagesSkills();
                        lgSkill.ID_Employee = user.ID;
                        lgSkill.Name = trinhdongoaingu.Split('=')[i].Split('_')[0];
                        lgSkill.listening = trinhdongoaingu.Split('=')[i].Split('_')[1];
                        lgSkill.Speaking = trinhdongoaingu.Split('=')[i].Split('_')[2];
                        lgSkill.Reading = trinhdongoaingu.Split('=')[i].Split('_')[3];
                        lgSkill.Writing = trinhdongoaingu.Split('=')[i].Split('_')[4];

                        model.LanguagesSkills.Add(lgSkill);
                    }
                }
                //Chỉ có 1 ngoại ngữ
                else
                {
                    LanguagesSkills lgSkill = new LanguagesSkills();
                    lgSkill.ID_Employee = user.ID;
                    lgSkill.Name = trinhdongoaingu.Split('_')[0];
                    lgSkill.listening = trinhdongoaingu.Split('_')[1];
                    lgSkill.Speaking = trinhdongoaingu.Split('_')[2];
                    lgSkill.Reading = trinhdongoaingu.Split('_')[3];
                    lgSkill.Writing = trinhdongoaingu.Split('_')[3];

                    model.LanguagesSkills.Add(lgSkill);
                }
                model.SaveChanges();
            }
            model = new CP25Team06Entities();
            var lstNgoaiNgu = model.LanguagesSkills.Where(l => l.ID_Employee == user.ID).ToList();
            Session["lst-ngoaingu"] = lstNgoaiNgu;
            return PartialView("_trinhDoNgoaiNguPartial", model.Employees.FirstOrDefault(u => u.ID == user.ID));
        }

        public ActionResult phuThuocNhanThanPartial(int? id)
        {
            if (id == null || Session["user-id"] == null)
                return Content("DANHSACH");

            ViewBag.ShowActive = "TTChiTiet";
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (user != null)
            {
                var lstNhanThan = model.DependentsInformation.Where(l => l.ID_Employee == user.ID).ToList();
                Session["lst-nhanthan"] = lstNhanThan;
                return PartialView("_phuThuocNhanThanPartial", user);
            }
            return Content("DANHSACH");
        }

        [HttpPost]
        public ActionResult chinhSuaPhuThuocNhanThan(int? id, string phuthuocnhanthan)
        {
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (id == null || user == null || Session["user-id"] == null)
                return Content("DANHSACH");

            //Nhân Thân
            model.DependentsInformation.RemoveRange(user.DependentsInformation);
            model.SaveChanges();
            if (!string.IsNullOrEmpty(phuthuocnhanthan))
            {
                //Phụ thuộc Nhân thân
                if (!string.IsNullOrEmpty(phuthuocnhanthan))
                {
                    //Nhiều hơn 1 nhân thân
                    if (phuthuocnhanthan.IndexOf("=") != -1)
                    {
                        for (int i = 0; i < phuthuocnhanthan.Split('=').ToList().Count; i++)
                        {
                            DependentsInformation depen = new DependentsInformation();
                            depen.ID_Employee = user.ID;
                            depen.Name = phuthuocnhanthan.Split('=')[i].Split('_')[0];
                            depen.Relationship = phuthuocnhanthan.Split('=')[i].Split('_')[1];
                            depen.Birthday = Convert.ToDateTime(phuthuocnhanthan.Split('=')[i].Split('_')[2]);

                            model.DependentsInformation.Add(depen);
                        }
                    }
                    //Chỉ có 1 nhân thân
                    else
                    {
                        DependentsInformation depen = new DependentsInformation();
                        depen.ID_Employee = user.ID;
                        depen.Name = phuthuocnhanthan.Split('_')[0];
                        depen.Relationship = phuthuocnhanthan.Split('_')[1];
                        depen.Birthday = Convert.ToDateTime(phuthuocnhanthan.Split('_')[2]);

                        model.DependentsInformation.Add(depen);
                    }
                    model.SaveChanges();
                }
            }
            model = new CP25Team06Entities();
            var lstNhanThan = model.DependentsInformation.Where(l => l.ID_Employee == user.ID).ToList();
            Session["lst-nhanthan"] = lstNhanThan;
            return PartialView("_phuThuocNhanThanPartial", model.Employees.FirstOrDefault(u => u.ID == user.ID));
        }
        public ActionResult troCapPartial(int? id)
        {
            if (id == null || Session["user-id"] == null)
                return Content("DANHSACH");

            ViewBag.ShowActive = "TTChiTiet";
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (user != null)
            {
                var lstTroCap = model.SubsidiesCategory.OrderBy(t => t.Name).ToList();
                Session["lst-trocap"] = lstTroCap;
                return PartialView("_troCapPartial", user);
            }
            return Content("DANHSACH");
        }

        [HttpPost]
        public ActionResult chinhSuaTroCap(int? id, string trocap)
        {
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (id == null || user == null || Session["user-id"] == null)
                return Content("DANHSACH");

            model.Subsidies.RemoveRange(user.Subsidies);
            model.SaveChanges();
            //Trợ cấp & phụ cấp
            if (!string.IsNullOrEmpty(trocap))
            {
                if (trocap.IndexOf("_") != -1)
                {
                    for (int i = 0; i < trocap.Split('_').ToList().Count; i++)
                    {
                        Subsidies subs = new Subsidies();
                        subs.ID_Employee = user.ID;
                        subs.ID_SubsidiesCategory = Int32.Parse(trocap.Split('_')[i]);
                        model.Subsidies.Add(subs);
                    }
                }
                else
                {
                    Subsidies subs = new Subsidies();
                    subs.ID_Employee = user.ID;
                    subs.ID_SubsidiesCategory = Int32.Parse(trocap);
                    model.Subsidies.Add(subs);
                }
                model.SaveChanges();
            }
            model = new CP25Team06Entities();
            var lstTroCap = model.SubsidiesCategory.OrderBy(t => t.Name).ToList();
            Session["lst-trocap"] = lstTroCap;
            return PartialView("_troCapPartial", model.Employees.FirstOrDefault(u => u.ID == user.ID));
        }
        public ActionResult hopDongPartial(int? id)
        {
            if (id == null || Session["user-id"] == null)
                return Content("DANHSACH");

            ViewBag.ShowActive = "TTChiTiet";
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (user != null)
            {
                return PartialView("_hopDongPartial", user);
            }
            return Content("DANHSACH");
        }

        [HttpPost]
        public ActionResult chinhSuaViecLamHopDong(int? id, string ngayvaolam, int? vaitro, string hinhthuc)
        {
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (id == null || user == null || Session["user-id"] == null)
                return Content("DANHSACH");

            if (!string.IsNullOrEmpty(ngayvaolam) && vaitro != null && !string.IsNullOrEmpty(hinhthuc))
            {
                user.JoinedDate = Convert.ToDateTime(ngayvaolam);
                user.ID_Position = (int)vaitro;
                user.EmploymentStatus = hinhthuc;

                model.Entry(user).State = EntityState.Modified;
                model.SaveChanges();
                model = new CP25Team06Entities();
                return PartialView("_hopDongPartial", model.Employees.FirstOrDefault(u => u.ID == user.ID));
            }
            return Content("DANHSACH");
        }
        [HttpPost]
        public async Task<ActionResult> themHopDongMoi(HttpPostedFileBase anhHopDong, string ngaykyhopdong, string ngaygiahanhopdong, int id, string loaihopdong)
        {
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (user != null && Session["user-id"] != null)
            {
                EmploymentContracts emp = new EmploymentContracts();
                emp.ID_Employee = user.ID;
                emp.StartDate = Convert.ToDateTime(ngaykyhopdong);
                emp.EmploymentCategory = loaihopdong;
                if (loaihopdong.Equals("Hợp đồng có thời hạn"))
                    emp.EndDate = Convert.ToDateTime(ngaygiahanhopdong);

                FileStream stream;
                if (anhHopDong != null)
                {
                    if (anhHopDong.ContentLength > 0)
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

                        string path = Path.Combine(Server.MapPath("~/Content/images/"), sb.ToString().Trim() + anhHopDong.FileName); ;
                        anhHopDong.SaveAs(path);
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
                            .Child(sb.ToString().Trim() + anhHopDong.FileName)
                            .PutAsync(stream, cancellation.Token);
                        try
                        {
                            string link = await task;
                            emp.ImageURL = link;
                            System.IO.File.Delete(path);
                        }
                        catch
                        {
                            return Content("Đã có xảy ra lỗi, vui lòng thử lại");
                        }
                    }
                }
                model.EmploymentContracts.Add(emp);
                model.SaveChanges();
                model = new CP25Team06Entities();

                Session["lst-role"] = model.Position.Where(p => p.ID != 1).OrderBy(o => o.Name).ToList();
                return PartialView("_hopDongPartial", model.Employees.FirstOrDefault(u => u.ID == user.ID));
            }
            return Content("DANHSACH");
        }
        [HttpPost]
        public ActionResult xoaHopDong(int? id, int? idus)
        {
            var user = model.Employees.FirstOrDefault(u => u.ID == idus);
            if (idus == null || user == null || idus == null || Session["user-id"] == null)
                return Content("DANHSACH");

            model.EmploymentContracts.Remove(user.EmploymentContracts.FirstOrDefault(h => h.ID == id));
            model.SaveChanges();
            model = new CP25Team06Entities();
            Session["lst-role"] = model.Position.Where(p => p.ID != 1).OrderBy(o => o.Name).ToList();
            return PartialView("_hopDongPartial", model.Employees.FirstOrDefault(u => u.ID == user.ID));
        }
        [HttpPost]
        public async Task<ActionResult> suaHopDong(HttpPostedFileBase anhHopDong, string ngaykyhopdong, string ngaygiahanhopdong, int id, int idus, string loaihopdong)
        {
            var user = model.Employees.FirstOrDefault(u => u.ID == idus);
            if (user != null && Session["user-id"] != null)
            {
                var emp = user.EmploymentContracts.FirstOrDefault(h => h.ID == id);
                emp.StartDate = Convert.ToDateTime(ngaykyhopdong);
                emp.EmploymentCategory = loaihopdong;
                if (loaihopdong.Equals("Hợp đồng có thời hạn"))
                    emp.EndDate = Convert.ToDateTime(ngaygiahanhopdong);
                else
                    emp.EndDate = null;

                FileStream stream;
                if (anhHopDong != null)
                {
                    if (anhHopDong.ContentLength > 0)
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

                        string path = Path.Combine(Server.MapPath("~/Content/images/"), sb.ToString().Trim() + anhHopDong.FileName); ;
                        anhHopDong.SaveAs(path);
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
                            .Child(sb.ToString().Trim() + anhHopDong.FileName)
                            .PutAsync(stream, cancellation.Token);
                        try
                        {
                            string link = await task;
                            emp.ImageURL = link;
                            System.IO.File.Delete(path);
                        }
                        catch
                        {
                            return Content("Đã có xảy ra lỗi, vui lòng thử lại");
                        }
                    }
                }

                model.Entry(emp).State = EntityState.Modified;
                model.SaveChanges();
                model = new CP25Team06Entities();

                Session["lst-role"] = model.Position.Where(p => p.ID != 1).OrderBy(o => o.Name).ToList();
                return PartialView("_hopDongPartial", model.Employees.FirstOrDefault(u => u.ID == user.ID));
            }
            return Content("DANHSACH");
        }

        [HttpPost]
        public ActionResult khoaTaiKhoan(int? id)
        {
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (id != null && user != null && Session["user-id"] != null)
            {
                if (user.Lock == false)
                {
                    user.Lock = true;
                    user.DayOff = DateTime.Now;
                    model.Entry(user).State = EntityState.Modified;
                    model.SaveChanges();
                    model = new CP25Team06Entities();
                    return Content("DAKHOA");
                }
                else
                {
                    user.Lock = false;
                    user.DayOff = null;
                    model.Entry(user).State = EntityState.Modified;
                    model.SaveChanges();
                    model = new CP25Team06Entities();
                    return Content("DAMO");
                }
            }
            return Content("DANHSACH");
        }
        public ActionResult duAnThamGiaPartial(int? id)
        {
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (user == null || Session["user-id"] == null)
                return Content("DANHSACH");

            Session["lst-duanthamgia-detailemployee"] = model.Projects.Where(p => p.Teams.FirstOrDefault(t => t.ID_Employee == user.ID).ID_Employee == user.ID).ToList();
            return PartialView("_duAnThamGiaPartial", user);
        }
        [HttpPost]
        public ActionResult timKiemDuAnThamGia(string contents, int? idus)
        {
            if (idus == null || Session["user-id"] == null)
                return Content("DANHSACH");

            if (string.IsNullOrEmpty(contents.Trim()))
                Session["lst-duanthamgia-detailemployee"] = model.Projects.Where(p => p.Teams.FirstOrDefault(t => t.ID_Employee == idus).ID_Employee == idus).ToList();
            else
                Session["lst-duanthamgia-detailemployee"] = model.Projects.Where(p => p.Teams.FirstOrDefault(t => t.ID_Employee == idus).ID_Employee == idus && p.Name.ToLower().Trim().Contains(contents.ToLower().Trim())).ToList();

            return PartialView("_duAnThamGiaSearch");
        }
        public ActionResult lichSuHoatDongPartial(int? id)
        {
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (user == null || Session["user-id"] == null)
                return Content("DANHSACH");

            string date = DateTime.Now.Year + "-W" + (new CultureInfo("vi-VN").Calendar.GetWeekOfYear(DateTime.Now, CalendarWeekRule.FirstDay, DayOfWeek.Monday) - 1);

            DateTime jan1 = new DateTime(Int32.Parse(date.Split('-')[0]), 1, 1);
            int daysOffset = DayOfWeek.Thursday - jan1.DayOfWeek;
            DateTime firstThursday = jan1.AddDays(daysOffset);
            var cal = CultureInfo.CurrentCulture.Calendar;
            int firstWeek = cal.GetWeekOfYear(firstThursday, CalendarWeekRule.FirstFourDayWeek, DayOfWeek.Monday);

            var weekNum = Int32.Parse(date.Split('-')[1].Replace("W", ""));
            if (firstWeek == 1)
            {
                weekNum -= 1;
            }
            var result = firstThursday.AddDays(weekNum * 7);
            result = result.AddDays(-3);
            var lastResult = result.AddDays(6);

            Session["lichSuHoatDong-lstHistory"] = model.Histories.Where(h => h.ID_Employee == id && h.Date >= result && h.Date <= lastResult).ToList();
            Session["lichSuHoatDong-date"] = date;
            return PartialView("_lichSuHoatDongPartial", user);
        }
        public ActionResult timKiemLichSuHoatDong(int? idus, string date)
        {
            if (idus == null || string.IsNullOrEmpty(date) || Session["user-id"] == null)
                return Content("DANHSACH");

            DateTime jan1 = new DateTime(Int32.Parse(date.Split('-')[0]), 1, 1);
            int daysOffset = DayOfWeek.Thursday - jan1.DayOfWeek;
            DateTime firstThursday = jan1.AddDays(daysOffset);
            var cal = CultureInfo.CurrentCulture.Calendar;
            int firstWeek = cal.GetWeekOfYear(firstThursday, CalendarWeekRule.FirstFourDayWeek, DayOfWeek.Monday);

            var weekNum = Int32.Parse(date.Split('-')[1].Replace("W", ""));
            if (firstWeek == 1)
            {
                weekNum -= 1;
            }
            var result = firstThursday.AddDays(weekNum * 7);
            result = result.AddDays(-3);
            var lastResult = result.AddDays(6);

            Session["lichSuHoatDong-lstHistory"] = model.Histories.Where(h => h.ID_Employee == idus && h.Date >= result && h.Date <= lastResult).ToList(); Session["lichSuHoatDong-date"] = date;
            return PartialView("_lichSuHoatDongSearch");
        }
        public ActionResult bangLuongPartial(int? id)
        {
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (user == null || id == null || Session["user-id"] == null)
                return Content("DANHSACH");
            var currentYear = DateTime.Now.Year;

            Session["bang-luong-emp"] = model.PayrollCategory.FirstOrDefault(p => p.Date.Year == currentYear);
            return PartialView("_bangLuongPartial", user);
        }
        [HttpPost]
        public ActionResult timKiemBangLuongPartial(int? id, int nam)
        {
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (user == null || id == null || Session["user-id"] == null)
                return Content("DANHSACH");

            Session["bang-luong-emp"] = model.PayrollCategory.Where(p => p.Date.Year == nam).ToList();
            return PartialView("_timkiembangluong", user);
        }
        public ActionResult lichBieuPartial(int? id)
        {
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (user == null)
                return Content("DANHSACH");

            Session["tienDoCongViec-lstTask"] = model.Tasks.Where(t => t.ID_Employee == id).OrderByDescending(o => o.ID).ToList();
            return PartialView("_lichBieuPartial", user);
        }
        [HttpPost]
        public ActionResult timKiemLichBieu(string state, int? idus)
        {
            var user = model.Employees.FirstOrDefault(u => u.ID == idus);
            if (user == null || string.IsNullOrEmpty(state) || Session["user-id"] == null)
                return Content("DANHSACH");

            if (state.Equals("all"))
                Session["tienDoCongViec-lstTask"] = model.Tasks.Where(t => t.ID_Employee == idus).OrderByDescending(o => o.ID).ToList();

            else if (state.Equals("chualam"))
                Session["tienDoCongViec-lstTask"] = model.Tasks.Where(t => t.ID_Employee == idus && t.State.Equals("do")).OrderByDescending(o => o.ID).ToList();

            else if (state.Equals("danglam"))
                Session["tienDoCongViec-lstTask"] = model.Tasks.Where(t => t.ID_Employee == idus && t.State.Equals("progress")).OrderByDescending(o => o.ID).ToList();

            else if (state.Equals("danop"))
                Session["tienDoCongViec-lstTask"] = model.Tasks.Where(t => t.ID_Employee == idus && t.State.Equals("review")).OrderByDescending(o => o.ID).ToList();

            else
                Session["tienDoCongViec-lstTask"] = model.Tasks.Where(t => t.ID_Employee == idus && t.State.Equals("done")).OrderByDescending(o => o.ID).ToList();

            return PartialView("_lichBieuSearch");
        }
        public ActionResult baoCaoThongKePartial(int? id)
        {
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (user == null || Session["user-id"] == null)
                return Content("DANHSACH");

            Session["thongke-Task"] = model.Tasks.Where(t => t.ID_Employee == id).ToList();
            return PartialView("_baoCaoThongKePartial", user);
        }

        public ActionResult donNghiPhep(int id)
        {
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (user == null || Session["user-id"] == null)
                return Content("DANHSACH");

            Session["dsdonnghiphep"] = user.LeaveApplication.Where(l => l.State == false && l.ResponsiveDate == null).OrderByDescending(o => o.ID).ToList();
            Session["TuChoiTabDonNghiPhep"] = null;
            return PartialView("_donNghiPhepPartial", user);
        }
        [HttpPost]

        public ActionResult danhSachDonNghiPhepPartial(int id)
        {
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (user == null || Session["user-id"] == null)
                return Content("DANHSACH");

            Session["dsdonnghiphep"] = user.LeaveApplication.Where(l => l.State == false && l.ResponsiveDate == null).OrderByDescending(o => o.ID).ToList();
            Session["TuChoiTabDonNghiPhep"] = null;
            return PartialView("_donNghiPhepChangeTabPartial", user);
        }

        [HttpPost]
        public ActionResult danhSachDonNghiPhepDaDuyet(int id)
        {
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (user == null || Session["user-id"] == null)
                return Content("DANHSACH");

            Session["dsdonnghiphep"] = user.LeaveApplication.Where(l => l.State == true).OrderByDescending(o => o.ID).ToList();
            Session["TuChoiTabDonNghiPhep"] = null;
            return PartialView("_donNghiPhepChangeTabPartial", user);
        }

        [HttpPost]
        public ActionResult danhSachDonNghiPhepDaTuChoi(int id)
        {
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (user == null || Session["user-id"] == null)
                return Content("DANHSACH");

            Session["TuChoiTabDonNghiPhep"] = true;
            Session["dsdonnghiphep"] = user.LeaveApplication.Where(l => l.State == false && l.ResponsiveDate != null).OrderByDescending(o => o.ID).ToList();
            return PartialView("_donNghiPhepChangeTabPartial", user);
        }

        [HttpPost]
        public ActionResult duyetDon(int? id, int idemp, string noidung, bool? truluong, string typeTab)
        {
            var don = model.LeaveApplication.Find(id);
            if (id == null || truluong == null || don == null || string.IsNullOrEmpty(typeTab))
                return Content("DANGNHAP");

            don.State = true;
            don.Reply = noidung.Trim();
            don.OnWage = (bool)truluong;
            don.ResponsiveDate = DateTime.Now;
            model.Entry(don).State = EntityState.Modified;
            model.SaveChanges();

            model = new CP25Team06Entities();
            var user = model.Employees.Find(idemp);
            Session["TuChoiTabDonNghiPhep"] = null;

            if (typeTab.Equals("choduyet"))
                Session["dsdonnghiphep"] = user.LeaveApplication.Where(l => l.State == false && l.ResponsiveDate == null).OrderByDescending(o => o.ID).ToList();
            else if (typeTab.Equals("duocduyet"))
                Session["dsdonnghiphep"] = user.LeaveApplication.Where(l => l.State == true).OrderByDescending(o => o.ID).ToList();
            else
                Session["dsdonnghiphep"] = user.LeaveApplication.Where(l => l.State == false && l.ResponsiveDate != null).OrderByDescending(o => o.ID).ToList();

            return PartialView("_donNghiPhepChangeTabPartial", user);
        }

        [HttpPost]
        public ActionResult tuChoiDon(int? id, int idemp, string noidung, string typeTab)
        {
            var don = model.LeaveApplication.Find(id);
            if (id == null || don == null || string.IsNullOrEmpty(typeTab))
                return Content("DANGNHAP");

            don.State = false;
            don.Reply = noidung.Trim();
            don.ResponsiveDate = DateTime.Now;
            model.Entry(don).State = EntityState.Modified;
            model.SaveChanges();

            model = new CP25Team06Entities();
            var user = model.Employees.Find(idemp);

            if (typeTab.Equals("choduyet"))
            {
                Session["TuChoiTabDonNghiPhep"] = null;
                Session["dsdonnghiphep"] = user.LeaveApplication.Where(l => l.State == false && l.ResponsiveDate == null).OrderByDescending(o => o.ID).ToList();
            }
            else if (typeTab.Equals("duocduyet"))
            {
                Session["TuChoiTabDonNghiPhep"] = null;
                Session["dsdonnghiphep"] = user.LeaveApplication.Where(l => l.State == true && l.ID_Employee == user.ID).OrderByDescending(o => o.ID).ToList();
            }
            else
            {
                Session["TuChoiTabDonNghiPhep"] = true;
                Session["dsdonnghiphep"] = user.LeaveApplication.Where(l => l.State == false && l.ResponsiveDate != null).OrderByDescending(o => o.ID).ToList();
            }
            return PartialView("_donNghiPhepChangeTabPartial", user);
        }

        [HttpPost]
        public ActionResult thayDoi(int? id, int idemp, string noidung, bool? truluong, string typeTab)
        {
            var don = model.LeaveApplication.Find(id);
            if (id == null || truluong == null || don == null || string.IsNullOrEmpty(typeTab))
                return Content("DANGNHAP");

            don.Reply = noidung.Trim();
            don.OnWage = (bool)truluong;
            don.ResponsiveDate = DateTime.Now;
            model.Entry(don).State = EntityState.Modified;
            model.SaveChanges();

            model = new CP25Team06Entities();
            var user = model.Employees.Find(idemp);

            if (typeTab.Equals("choduyet"))
            {
                Session["TuChoiTabDonNghiPhep"] = null;
                Session["dsdonnghiphep"] = user.LeaveApplication.Where(l => l.State == false && l.ResponsiveDate == null).OrderByDescending(o => o.ID).ToList();
            }
            else if (typeTab.Equals("duocduyet"))
            {
                Session["TuChoiTabDonNghiPhep"] = null;
                Session["dsdonnghiphep"] = user.LeaveApplication.Where(l => l.State == true).OrderByDescending(o => o.ID).ToList();
            }
            else
            {
                Session["TuChoiTabDonNghiPhep"] = true;
                Session["dsdonnghiphep"] = user.LeaveApplication.Where(l => l.State == false && l.ResponsiveDate != null).OrderByDescending(o => o.ID).ToList();
            }
            return PartialView("_donNghiPhepChangeTabPartial", user);

        }

        public ActionResult danhMucNgayPhep(int id)
        {
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (user == null || Session["user-id"] == null)
                return Content("DANHSACH");

            Session["lst-danhmucngayphep-all"] = model.LeaveDate.ToList();
            Session["lst-danhmucngayphep"] = model.LeaveDate.Where(l => l.OnLeave.Where(onl => onl.ID_Employee == id).Count() > 0).ToList();
            return PartialView("_danhMucNghiPhepPartial", user);
        }

        [HttpPost]
        public ActionResult danhMucNgayPhep(int id, string lstngayphep)
        {
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (user == null || Session["user-id"] == null)
                return Content("DANHSACH");

            model.OnLeave.RemoveRange(user.OnLeave);
            model.SaveChanges();

            if (!string.IsNullOrEmpty(lstngayphep))
            {
                foreach (var item in lstngayphep.Split('-').ToList())
                {
                    OnLeave onleave = new OnLeave();
                    onleave.ID_LeaveDate = Int32.Parse(item);
                    onleave.ID_Employee = user.ID;
                    model.OnLeave.Add(onleave);
                    model.SaveChanges();
                }
            }

            return Content("success");
        }
    }
}