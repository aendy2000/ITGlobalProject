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
    public class QuanLyTaiKhoan
    {
        QuanLyTaiKhoanController qltkcontroller = new QuanLyTaiKhoanController();

        //Test success login account
        [TestMethod]
        public void DangNhapAdminSuccess()
        {

            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qltkcontroller.ControllerContext = mockControllerContext.Object;
            string username = "info@it-global.net";
            string password = "Admin.123";

            ContentResult result = qltkcontroller.DangNhap(username, password) as ContentResult;

            Assert.IsNotNull(result.Content);
            Assert.AreEqual("admin", result.Content);
        }
        [TestMethod]
        public void DangNhapEmoloyeeSuccess()
        {

            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qltkcontroller.ControllerContext = mockControllerContext.Object;
            string username = "dnguyenhoang94@gmail.com";
            string password = "AdminAdmin.123";

            ContentResult resultViewWithEmployee = qltkcontroller.DangNhap(username, password) as ContentResult;

            Assert.IsNotNull(resultViewWithEmployee.Content);
            Assert.AreEqual("employee", resultViewWithEmployee.Content);
        }

        //Test fail username login account
        [TestMethod]
        public void DangNhap_FailUsername()
        {

            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qltkcontroller.ControllerContext = mockControllerContext.Object;
            string username = "";
            string password = "AdminAdmin.123";

            ContentResult result = qltkcontroller.DangNhap(username, password) as ContentResult;

            Assert.IsNotNull(result.Content);
            Assert.AreEqual("TKSAI", result.Content);
        }

        //Test fail password login account
        [TestMethod]
        public void DangNhap_FailPassword()
        {

            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qltkcontroller.ControllerContext = mockControllerContext.Object;
            string username = "dnguyenhoang94@gmail.com";
            string password = "";

            ContentResult resultViewLoginFail = qltkcontroller.DangNhap(username, password) as ContentResult;

            Assert.IsNotNull(resultViewLoginFail.Content);
            Assert.AreEqual("MKSAI", resultViewLoginFail.Content);
        }

        //Test fail null login account
        [TestMethod]
        public void DangNhap_NullAccount()
        {

            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qltkcontroller.ControllerContext = mockControllerContext.Object;
            string username = "";
            string password = "";

            ContentResult resultViewLoginNull = qltkcontroller.DangNhap(username, password) as ContentResult;

            Assert.IsNotNull(resultViewLoginNull.Content);
            Assert.AreEqual("TKSAI", resultViewLoginNull.Content);
        }

        //Test request view forgot password
        [TestMethod]
        public void RequestQuenMatKhau()
        {

            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qltkcontroller.ControllerContext = mockControllerContext.Object;

            ViewResult resultViewRequestForgotPass = qltkcontroller.QuenMatKhau() as ViewResult;

            Assert.IsNotNull(resultViewRequestForgotPass.ViewName);
            Assert.AreEqual("QuenMatKhau", resultViewRequestForgotPass.ViewName);
        }

        //Test request view forgot password form post email invalid
        [TestMethod]
        public void RequestQuenMatKhauSubmit()
        {

            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qltkcontroller.ControllerContext = mockControllerContext.Object;
            string email = "emailInvalid";
            ContentResult resultViewSubmit = qltkcontroller.QuenMatKhau(email) as ContentResult;

            Assert.IsNotNull(resultViewSubmit.Content);
            Assert.AreEqual("TKSAI", resultViewSubmit.Content);
        }

        //Test verify password success
        [TestMethod]
        public void VerifyPasswordSuccess()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["XacThucEmail"]).Returns("Valid");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qltkcontroller.ControllerContext = mockControllerContext.Object;
            ViewResult resultView = qltkcontroller.XacThucQuenMatKhau() as ViewResult;

            Assert.IsNotNull(resultView.ViewName);
            Assert.AreEqual("XacThucQuenMatKhau", resultView.ViewName);
        }

        //Test verify password null
        [TestMethod]
        public void VerifyPasswordNull()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["XacThucEmail"]).Returns(null);
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qltkcontroller.ControllerContext = mockControllerContext.Object;
            ViewResult resultViewVerifyPasswordNull = qltkcontroller.XacThucQuenMatKhau() as ViewResult;

            Assert.IsNotNull(resultViewVerifyPasswordNull.ViewName);
            Assert.AreEqual("DangNhap", resultViewVerifyPasswordNull.ViewName);
        }

        //Test submit verify password null parameter
        [TestMethod]
        public void SubmitVerifyPasswordNull()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["XacThucEmail"]).Returns(null);
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qltkcontroller.ControllerContext = mockControllerContext.Object;

            string ma = null;
            string email = null;
            ContentResult contentResult = qltkcontroller.XacThucQuenMatKhau(ma, email) as ContentResult;

            Assert.IsNotNull(contentResult.Content);
            Assert.AreEqual("DANGNHAP", contentResult.Content);
        }

        //Test submit verify password invalid
        [TestMethod]
        public void SubmitVerifyPasswordInvalid()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["XacThucEmail"]).Returns(null);
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qltkcontroller.ControllerContext = mockControllerContext.Object;

            string ma = "000000";
            string email = "dnguyenhoang94@gmail.com";

            ContentResult contentResult = qltkcontroller.XacThucQuenMatKhau(ma, email) as ContentResult;

            Assert.IsNotNull(contentResult.Content);
            Assert.AreNotEqual("SUCCESS", contentResult.Content);
        }

        //Test reset password view null
        [TestMethod]
        public void ResetPasswordRequestViewNull()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["XacThucEmail"]).Returns(null);
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qltkcontroller.ControllerContext = mockControllerContext.Object;

            var contentResult = (RedirectToRouteResult)qltkcontroller.DatLaiMatKhau();
            contentResult.RouteValues["action"].Equals("DangNhap");
            contentResult.RouteValues["controller"].Equals("QuanLyTaiKhoan");

            Assert.AreEqual("DangNhap", contentResult.RouteValues["action"]);
            Assert.AreEqual("QuanLyTaiKhoan", contentResult.RouteValues["controller"]);
        }

        //Test reset password view success
        [TestMethod]
        public void ResetPasswordRequestView()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["XacThucEmail"]).Returns("dnguyenhoang94@gmail.com");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qltkcontroller.ControllerContext = mockControllerContext.Object;

            var contentResult = (ViewResult)qltkcontroller.DatLaiMatKhau();
            Assert.AreEqual("DatLaiMatKhau", contentResult.ViewName);
        }

        //Test reset password submit invalid
        [TestMethod]
        public void ResetPasswordInvalid()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);
            qltkcontroller.ControllerContext = mockControllerContext.Object;

            string password = "123123";
            string email = "InvalidEmail";

            ContentResult contentResult = qltkcontroller.DatLaiMatKhau(password, email) as ContentResult;

            Assert.IsNotNull(contentResult.Content);
            Assert.AreNotEqual("SUCCESS", contentResult.Content);
        }

        //Test personal information admin view null
        [TestMethod]
        public void PersonalInformationAdminRequestViewNull()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qltkcontroller.ControllerContext = mockControllerContext.Object;
            int id = 0;
            var contentResult = (RedirectToRouteResult)qltkcontroller.ThongTinCaNhan(id);
            contentResult.RouteValues["action"].Equals("Overview");
            contentResult.RouteValues["controller"].Equals("Dashboard");

            Assert.AreEqual("Overview", contentResult.RouteValues["action"]);
            Assert.AreEqual("Dashboard", contentResult.RouteValues["controller"]);
        }

        //Test personal information admin view success
        [TestMethod]
        public void PersonalInformationAdminRequestView()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qltkcontroller.ControllerContext = mockControllerContext.Object;
            int id = 1;
            var contentResult = (ViewResult)qltkcontroller.ThongTinCaNhan(id);
            var employee = (Employees)contentResult.ViewData.Model;

            Assert.IsTrue(employee != null ? true : false);
            Assert.AreEqual("ThongTinCaNhan", contentResult.ViewName);
        }

        //Test update personal information admin view null
        [TestMethod]
        public void UpdatePersonalInformationAdminRequestViewNull()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qltkcontroller.ControllerContext = mockControllerContext.Object;
            int id = 0;
            var contentResult = (ContentResult)qltkcontroller.ChinhSuaThongTinCaNhanPartial(id);

            Assert.IsNotNull(contentResult.Content);
            Assert.AreEqual("TRANGCHU", contentResult.Content);
        }

        //Test request view change password valid
        [TestMethod]
        public void ChangePasswordViewValid()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qltkcontroller.ControllerContext = mockControllerContext.Object;
            int id = 0;
            var contentResult = (ContentResult)qltkcontroller.doiMatKhauPartial(id);

            Assert.IsNotNull(contentResult.Content);
            Assert.AreEqual("TRANGCHU", contentResult.Content);
        }

        //Test request view change password fail
        [TestMethod]
        public void ChangePasswordViewFailed()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qltkcontroller.ControllerContext = mockControllerContext.Object;
            int id = 0;
            string password = "pass";
            string newpassword = "newpass";
            var contentResult = (ContentResult)qltkcontroller.doiMatKhauPartial(id, password, newpassword);

            Assert.IsNotNull(contentResult.Content);
            Assert.AreEqual("TRANGCHU", contentResult.Content);
        }

        //Test request view change currend password invalid
        [TestMethod]
        public void ChangePasswordCurrendInvalid()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qltkcontroller.ControllerContext = mockControllerContext.Object;
            int id = 1;
            string password = "InValidPass";
            string newpassword = "newpass";
            var contentResult = (ContentResult)qltkcontroller.doiMatKhauPartial(id, password, newpassword);

            Assert.IsNotNull(contentResult.Content);
            Assert.AreEqual("PASSSAI", contentResult.Content);
        }
    }
}
