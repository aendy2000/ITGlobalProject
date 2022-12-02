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
            string typestr = "1";
            var resultViewRequest = (ContentResult)qlnhansu.timKiemNhanVien(content, typestr);

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
    }
}
