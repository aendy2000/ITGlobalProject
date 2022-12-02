using ITGlobalProject.Areas.Admins.Controllers;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using System.Web;
using System.Web.Mvc;
using ITGlobalProject.Controllers;
using Moq;
using ITGlobalProject.Models;

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
            string username = "nfo@it-global.net";
            string password = "AdminAdmin.123";

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
            string password = "Tuanoi.Tuan123";

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

            ContentResult resultViewLoginNull= qltkcontroller.DangNhap(username, password) as ContentResult;

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
    }
}
