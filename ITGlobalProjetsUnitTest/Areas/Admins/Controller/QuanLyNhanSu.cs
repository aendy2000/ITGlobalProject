using ITGlobalProject.Areas.Admins.Controllers;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using System.Web;
using System.Web.Mvc;
using ITGlobalProject.Controllers;
using Moq;
using ITGlobalProject.Models;
using System.Threading.Tasks;

namespace ITGlobalProjetsUnitTest.Areas.Admins.Controller
{
    [TestClass]
    public class QuanLyNhanSu
    {
        QuanLyNhanSuController qlnhansu = new QuanLyNhanSuController();

        //Test request View List Employee
        [TestMethod]
        public void DanhSachNhanVien()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qlnhansu.ControllerContext = mockControllerContext.Object;

            ViewResult result = qlnhansu.danhSachNhanVien(1, 1, 8) as ViewResult;

            Assert.IsNotNull(result.Model);
            Assert.IsNotNull(result.ViewName);
            Assert.AreEqual("danhSachNhanVien", result.ViewName);
        }

        //Test search employee success
        [TestMethod]
        public void SearchEmployeeSuccess()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qlnhansu.ControllerContext = mockControllerContext.Object;
            string content = "A";
            int typestr = 1;
            int listCount = 8;
            var resultViewRequest = (ContentResult)qlnhansu.timKiemNhanVien(content, typestr, listCount);

            Assert.IsNotNull(resultViewRequest.Content);
        }

        //Test information employee success
        [TestMethod]
        public void InformationEmployeeSuccess()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qlnhansu.ControllerContext = mockControllerContext.Object;
            int id = 1;
            var resultViewRequest = (ViewResult)qlnhansu.thongTinChiTiet(id);
            var model = resultViewRequest.Model;

            Assert.IsNotNull(model);
            Assert.IsNotNull(resultViewRequest.ViewName);
            Assert.AreEqual("thongTinChiTiet", resultViewRequest.ViewName);
        }

        //Test information employee not exits
        [TestMethod]
        public void InformationEmployeeNotExits()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qlnhansu.ControllerContext = mockControllerContext.Object;
            int id = 0;

            var contentResult = (RedirectToRouteResult)qlnhansu.thongTinChiTiet(id);
            contentResult.RouteValues["action"].Equals("danhSachNhanVien");
            contentResult.RouteValues["controller"].Equals("QuanLyNhanSu");

            Assert.AreEqual("danhSachNhanVien", contentResult.RouteValues["action"]);
            Assert.AreEqual("QuanLyNhanSu", contentResult.RouteValues["controller"]);
        }

        //Test information employee null
        [TestMethod]
        public void InformationEmployeeNotNull()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qlnhansu.ControllerContext = mockControllerContext.Object;

            var contentResult = (RedirectToRouteResult)qlnhansu.thongTinChiTiet(null);
            contentResult.RouteValues["action"].Equals("danhSachNhanVien");
            contentResult.RouteValues["controller"].Equals("QuanLyNhanSu");

            Assert.AreEqual("danhSachNhanVien", contentResult.RouteValues["action"]);
            Assert.AreEqual("QuanLyNhanSu", contentResult.RouteValues["controller"]);
        }

        //Test information employee partial not exits
        [TestMethod]
        public void InformationEmployeePartialNotExits()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qlnhansu.ControllerContext = mockControllerContext.Object;
            int id = 0;

            var contentResult = (ContentResult)qlnhansu.thongTinChiTietPartial(id);

            Assert.IsNotNull(contentResult.Content);
            Assert.AreEqual("DANHSACH", contentResult.Content);
        }

        //Test information employee partial null
        [TestMethod]
        public void InformationEmployeePartialNotNull()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qlnhansu.ControllerContext = mockControllerContext.Object;

            var contentResult = (ContentResult)qlnhansu.thongTinChiTietPartial(null);

            Assert.IsNotNull(contentResult.Content);
            Assert.AreEqual("DANHSACH", contentResult.Content);
        }

        //Test information employee partial success
        [TestMethod]
        public void InformationEmployeePartialSuccess()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qlnhansu.ControllerContext = mockControllerContext.Object;
            int id = 1;
            var resultViewRequest = (PartialViewResult)qlnhansu.thongTinChiTietPartial(id);
            var model = resultViewRequest.Model;

            Assert.IsNotNull(model);
            Assert.IsNotNull(resultViewRequest.ViewName);
            Assert.AreEqual("_thongTinChiTietPartial", resultViewRequest.ViewName);
        }

        //Test information employee payment and contract partial success
        [TestMethod]
        public void InformationEmployeePaymentAndContractPartialSuccess()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qlnhansu.ControllerContext = mockControllerContext.Object;
            int id = 2;
            var resultViewRequest = (PartialViewResult)qlnhansu.lienHeVaThanhToanPartial(id);
            var model = resultViewRequest.Model;

            Assert.IsNotNull(model);
            Assert.IsNotNull(resultViewRequest.ViewName);
            Assert.AreEqual("_lienHeVaThanhToanPartial", resultViewRequest.ViewName);
        }

        //Test information employee payment and contract partial not exits
        [TestMethod]
        public void InformationEmployeePaymentAndContractPartialNotExits()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qlnhansu.ControllerContext = mockControllerContext.Object;
            int id = 0;

            var contentResult = (ContentResult)qlnhansu.lienHeVaThanhToanPartial(id);

            Assert.IsNotNull(contentResult.Content);
            Assert.AreEqual("DANHSACH", contentResult.Content);
        }

        //Test information employee payment and contract partial null
        [TestMethod]
        public void InformationEmployeePaymentAndContractPartialNotNull()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qlnhansu.ControllerContext = mockControllerContext.Object;

            var contentResult = (ContentResult)qlnhansu.lienHeVaThanhToanPartial(null);

            Assert.IsNotNull(contentResult.Content);
            Assert.AreEqual("DANHSACH", contentResult.Content);
        }

        //Test update information employee payment and contract partial not exits
        [TestMethod]
        public void UpdateInformationEmployeePaymentAndContractPartialNotExits()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qlnhansu.ControllerContext = mockControllerContext.Object;
            int id = 0;
            string sodienthoaididong = "0999999999";
            string sodienthoaikhac = "0999999999";
            string diachiemailcongty = "unitest@email.com";
            string diachiemailkhac = "unitest@email.com";
            string mucluong = "20,000,000";
            string dsNganHang = "Ngân Hàng";
            string sotaikhoan = "123123123";
            string chutaikhoan = "Chủ Tài khoản";
            var contentResult = (ContentResult)qlnhansu.chinhSuaLienHeVaThanhToan(id, mucluong, dsNganHang, sotaikhoan, chutaikhoan);

            Assert.IsNotNull(contentResult.Content);
            Assert.AreEqual("DANHSACH", contentResult.Content);
        }

        //Test update information employee payment and contract partial null
        [TestMethod]
        public void UpdateInformationEmployeePaymentAndContractPartialNotNull()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qlnhansu.ControllerContext = mockControllerContext.Object;
            string sodienthoaididong = "0999999999";
            string sodienthoaikhac = "0999999999";
            string diachiemailcongty = "unitest@email.com";
            string diachiemailkhac = "unitest@email.com";
            string mucluong = "20,000,000";
            string dsNganHang = "Ngân Hàng";
            string sotaikhoan = "123123123";
            string chutaikhoan = "Chủ Tài khoản";
            var contentResult = (ContentResult)qlnhansu.chinhSuaLienHeVaThanhToan(null, mucluong, dsNganHang, sotaikhoan, chutaikhoan);

            Assert.IsNotNull(contentResult.Content);
            Assert.AreEqual("DANHSACH", contentResult.Content);
        }

        //Test information employee skill partial success
        [TestMethod]
        public void InformationEmployeeSkillsPartialSuccess()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qlnhansu.ControllerContext = mockControllerContext.Object;
            int id = 2;
            var resultViewRequest = (PartialViewResult)qlnhansu.kyNangChuyenMonPartial(id);
            var model = resultViewRequest.Model;

            Assert.IsNotNull(model);
            Assert.IsNotNull(resultViewRequest.ViewName);
            Assert.AreEqual("_kyNangChuyenMonPartial", resultViewRequest.ViewName);
        }

        //Test information employee skill partial not exits
        [TestMethod]
        public void InformationEmployeeSkillsPartialNotExits()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qlnhansu.ControllerContext = mockControllerContext.Object;
            int id = 0;

            var contentResult = (ContentResult)qlnhansu.kyNangChuyenMonPartial(id);

            Assert.IsNotNull(contentResult.Content);
            Assert.AreEqual("DANHSACH", contentResult.Content);
        }

        //Test information employee skill partial null
        [TestMethod]
        public void InformationEmployeeSkillsPartialNotNull()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qlnhansu.ControllerContext = mockControllerContext.Object;

            var contentResult = (ContentResult)qlnhansu.kyNangChuyenMonPartial(null);

            Assert.IsNotNull(contentResult.Content);
            Assert.AreEqual("DANHSACH", contentResult.Content);
        }

        //Test update information employee skill partial not exits
        [TestMethod]
        public void UpdateInformationEmployeeSkillsPartialNotExits()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qlnhansu.ControllerContext = mockControllerContext.Object;
            int id = 0;
            string kynang = "1_2_3";

            var contentResult = (ContentResult)qlnhansu.chinhSuaKyNangChuyenMon(id, kynang);

            Assert.IsNotNull(contentResult.Content);
            Assert.AreEqual("DANHSACH", contentResult.Content);
        }

        //Test update information employee skill partial null
        [TestMethod]
        public void UpdateInformationEmployeeSkillsPartialNotNull()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qlnhansu.ControllerContext = mockControllerContext.Object;
            string kynang = "1_2_3";

            var contentResult = (ContentResult)qlnhansu.chinhSuaKyNangChuyenMon(null, kynang);
            Assert.IsNotNull(contentResult.Content);
            Assert.AreEqual("DANHSACH", contentResult.Content);
        }

        //Test information employee skill languages partial success
        [TestMethod]
        public void InformationEmployeeSkillsLanguagesPartialSuccess()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qlnhansu.ControllerContext = mockControllerContext.Object;
            int id = 2;
            var resultViewRequest = (PartialViewResult)qlnhansu.trinhDoNgoaiNguPartial(id);
            var model = resultViewRequest.Model;

            Assert.IsNotNull(model);
            Assert.IsNotNull(resultViewRequest.ViewName);
            Assert.AreEqual("_trinhDoNgoaiNguPartial", resultViewRequest.ViewName);
        }

        //Test information employee skill languages partial not exits
        [TestMethod]
        public void InformationEmployeeSkillsLanguagesPartialNotExits()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qlnhansu.ControllerContext = mockControllerContext.Object;
            int id = 0;

            var contentResult = (ContentResult)qlnhansu.trinhDoNgoaiNguPartial(id);

            Assert.IsNotNull(contentResult.Content);
            Assert.AreEqual("DANHSACH", contentResult.Content);
        }

        //Test information employee skill languages partial null
        [TestMethod]
        public void InformationEmployeeSkillsLanguagesPartialNotNull()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qlnhansu.ControllerContext = mockControllerContext.Object;

            var contentResult = (ContentResult)qlnhansu.trinhDoNgoaiNguPartial(null);

            Assert.IsNotNull(contentResult.Content);
            Assert.AreEqual("DANHSACH", contentResult.Content);
        }

        //Test update information employee skill languages partial not exits
        [TestMethod]
        public void UpdateInformationEmployeeSkillLanguagessPartialNotExits()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qlnhansu.ControllerContext = mockControllerContext.Object;
            int id = 0;
            string trinhdongoaingu = "1_2_3";

            var contentResult = (ContentResult)qlnhansu.chinhSuatrinhDoNgoaiNgu(id, trinhdongoaingu);

            Assert.IsNotNull(contentResult.Content);
            Assert.AreEqual("DANHSACH", contentResult.Content);
        }

        //Test update information employee skill languages partial null
        [TestMethod]
        public void UpdateInformationEmployeeSkillLanguagesPartialNotNull()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qlnhansu.ControllerContext = mockControllerContext.Object;
            string trinhdongoaingu = "1_2_3";

            var contentResult = (ContentResult)qlnhansu.chinhSuatrinhDoNgoaiNgu(null, trinhdongoaingu);
            Assert.IsNotNull(contentResult.Content);
            Assert.AreEqual("DANHSACH", contentResult.Content);
        }

        //Test information employee dependents success
        [TestMethod]
        public void InformationEmployeeDependentsPartialSuccess()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qlnhansu.ControllerContext = mockControllerContext.Object;
            int id = 2;
            var resultViewRequest = (PartialViewResult)qlnhansu.phuThuocNhanThanPartial(id);
            var model = resultViewRequest.Model;

            Assert.IsNotNull(model);
            Assert.IsNotNull(resultViewRequest.ViewName);
            Assert.AreEqual("_phuThuocNhanThanPartial", resultViewRequest.ViewName);
        }

        //Test information employee dependents partial not exits
        [TestMethod]
        public void InformationEmployeeDependentsPartialNotExits()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qlnhansu.ControllerContext = mockControllerContext.Object;
            int id = 0;

            var contentResult = (ContentResult)qlnhansu.phuThuocNhanThanPartial(id);

            Assert.IsNotNull(contentResult.Content);
            Assert.AreEqual("DANHSACH", contentResult.Content);
        }

        //Test information employee dependents partial null
        [TestMethod]
        public void InformationEmployeeDependentsPartialNotNull()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qlnhansu.ControllerContext = mockControllerContext.Object;

            var contentResult = (ContentResult)qlnhansu.phuThuocNhanThanPartial(null);

            Assert.IsNotNull(contentResult.Content);
            Assert.AreEqual("DANHSACH", contentResult.Content);
        }

        //Test update information employee dependents partial not exits
        [TestMethod]
        public void UpdateInformationEmployeeDependentsPartialNotExits()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qlnhansu.ControllerContext = mockControllerContext.Object;
            int id = 0;
            string phuthuocnhanthan = "Dependents";

            var contentResult = (ContentResult)qlnhansu.chinhSuaPhuThuocNhanThan(id, phuthuocnhanthan);

            Assert.IsNotNull(contentResult.Content);
            Assert.AreEqual("DANHSACH", contentResult.Content);
        }

        //Test update information employee dependents partial null
        [TestMethod]
        public void UpdateInformationEmployeeDependentsPartialNotNull()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qlnhansu.ControllerContext = mockControllerContext.Object;
            string phuthuocnhanthan = "Dependents";

            var contentResult = (ContentResult)qlnhansu.chinhSuaPhuThuocNhanThan(null, phuthuocnhanthan);
            Assert.IsNotNull(contentResult.Content);
            Assert.AreEqual("DANHSACH", contentResult.Content);
        }

        //Test information employee subsidies success
        [TestMethod]
        public void InformationEmployeeSubsidiesPartialSuccess()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qlnhansu.ControllerContext = mockControllerContext.Object;
            int id = 2;
            var resultViewRequest = (PartialViewResult)qlnhansu.troCapPartial(id);
            var model = resultViewRequest.Model;

            Assert.IsNotNull(model);
            Assert.IsNotNull(resultViewRequest.ViewName);
            Assert.AreEqual("_troCapPartial", resultViewRequest.ViewName);
        }

        //Test information employee subsidies partial not exits
        [TestMethod]
        public void InformationEmployeeSubsidiesPartialNotExits()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qlnhansu.ControllerContext = mockControllerContext.Object;
            int id = 0;

            var contentResult = (ContentResult)qlnhansu.troCapPartial(id);

            Assert.IsNotNull(contentResult.Content);
            Assert.AreEqual("DANHSACH", contentResult.Content);
        }

        //Test information employee subsidies partial null
        [TestMethod]
        public void InformationEmployeeSubsidiesPartialNotNull()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qlnhansu.ControllerContext = mockControllerContext.Object;

            var contentResult = (ContentResult)qlnhansu.troCapPartial(null);

            Assert.IsNotNull(contentResult.Content);
            Assert.AreEqual("DANHSACH", contentResult.Content);
        }

        //Test update information employee subsidies partial not exits
        [TestMethod]
        public void UpdateInformationEmployeeSubsidiesPartialNotExits()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qlnhansu.ControllerContext = mockControllerContext.Object;
            int id = 0;
            string trocap = "Subsidies";

            var contentResult = (ContentResult)qlnhansu.chinhSuaTroCap(id, trocap);

            Assert.IsNotNull(contentResult.Content);
            Assert.AreEqual("DANHSACH", contentResult.Content);
        }

        //Test update information employee subsidies partial null
        [TestMethod]
        public void UpdateInformationEmployeeSubsidiesPartialNotNull()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qlnhansu.ControllerContext = mockControllerContext.Object;
            string trocap = "Subsidies";

            var contentResult = (ContentResult)qlnhansu.chinhSuaTroCap(null, trocap);
            Assert.IsNotNull(contentResult.Content);
            Assert.AreEqual("DANHSACH", contentResult.Content);
        }

        //Test information employee deployment contract success
        [TestMethod]
        public void InformationEmployeeDeploymentContractPartialSuccess()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qlnhansu.ControllerContext = mockControllerContext.Object;
            int id = 2;
            var resultViewRequest = (PartialViewResult)qlnhansu.hopDongPartial(id);
            var model = resultViewRequest.Model;

            Assert.IsNotNull(model);
            Assert.IsNotNull(resultViewRequest.ViewName);
            Assert.AreEqual("_hopDongPartial", resultViewRequest.ViewName);
        }

        //Test information employee Deployment Contract partial not exits
        [TestMethod]
        public void InformationEmployeeDeploymentContractPartialNotExits()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qlnhansu.ControllerContext = mockControllerContext.Object;
            int id = 0;

            var contentResult = (ContentResult)qlnhansu.hopDongPartial(id);

            Assert.IsNotNull(contentResult.Content);
            Assert.AreEqual("DANHSACH", contentResult.Content);
        }

        //Test information employee Deployment Contract partial null
        [TestMethod]
        public void InformationEmployeeDeploymentContractPartialNotNull()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qlnhansu.ControllerContext = mockControllerContext.Object;

            var contentResult = (ContentResult)qlnhansu.hopDongPartial(null);

            Assert.IsNotNull(contentResult.Content);
            Assert.AreEqual("DANHSACH", contentResult.Content);
        }

        //Test update information employee Deployment Contract partial not exits
        [TestMethod]
        public void UpdateInformationEmployeeDeploymentContractPartialNotExits()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qlnhansu.ControllerContext = mockControllerContext.Object;
            int id = 0;
            string ngayvaolam = "dd-MM-yyyy";
            int vaitro = 0;
            string hinhthuc = "Hình Thức";

            var contentResult = (ContentResult)qlnhansu.chinhSuaViecLamHopDong(id, ngayvaolam, vaitro, hinhthuc);

            Assert.IsNotNull(contentResult.Content);
            Assert.AreEqual("DANHSACH", contentResult.Content);
        }

        //Test update information employee Deployment Contract partial null
        [TestMethod]
        public void UpdateInformationEmployeeDeploymentContractPartialNotNull()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qlnhansu.ControllerContext = mockControllerContext.Object;
            string ngayvaolam = "dd-MM-yyyy";
            int vaitro = 0;
            string hinhthuc = "Hình Thức";

            var contentResult = (ContentResult)qlnhansu.chinhSuaViecLamHopDong(null, ngayvaolam, vaitro, hinhthuc);

            Assert.IsNotNull(contentResult.Content);
            Assert.AreEqual("DANHSACH", contentResult.Content);
        }

        //Test information employee Delete Deployment Contract partial not exits
        [TestMethod]
        public void InformationEmployeeDeleteDeploymentContractPartialNotExits()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qlnhansu.ControllerContext = mockControllerContext.Object;
            int id = 0;
            int idus = 0;
            var contentResult = (ContentResult)qlnhansu.xoaHopDong(id, idus);

            Assert.IsNotNull(contentResult.Content);
            Assert.AreEqual("DANHSACH", contentResult.Content);
        }

        //Test information employee delete Deployment Contract partial null
        [TestMethod]
        public void InformationEmployeeDeleteDeploymentContractPartialNotNull()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qlnhansu.ControllerContext = mockControllerContext.Object;
            int idus = 0;

            var contentResult = (ContentResult)qlnhansu.xoaHopDong(null, idus);
            Assert.IsNotNull(contentResult.Content);
            Assert.AreEqual("DANHSACH", contentResult.Content);
        }

        //Test lock account employee partial not exits
        [TestMethod]
        public void LockAccountEmployeeNotExits()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qlnhansu.ControllerContext = mockControllerContext.Object;
            int id = 0;

            var contentResult = (ContentResult)qlnhansu.khoaTaiKhoan(id);

            Assert.IsNotNull(contentResult.Content);
            Assert.AreEqual("DANHSACH", contentResult.Content);
        }

        //Test lock account employee partial null
        [TestMethod]
        public void LockAccountEmployeeNullParameter()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qlnhansu.ControllerContext = mockControllerContext.Object;

            var contentResult = (ContentResult)qlnhansu.khoaTaiKhoan(null);
            Assert.IsNotNull(contentResult.Content);
            Assert.AreEqual("DANHSACH", contentResult.Content);
        }
    }
}
