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
    public class QuanLyVaiTro
    {
        QuanLyVaiTroController qlnhansu = new QuanLyVaiTroController();

        //Test request View List Position
        [TestMethod]
        public void DanhSachVaiTroRequestView()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qlnhansu.ControllerContext = mockControllerContext.Object;

            ViewResult result = qlnhansu.danhSachVaiTro() as ViewResult;

            Assert.IsNotNull(result.Model);
            Assert.IsNotNull(result.ViewName);
            Assert.AreEqual("danhSachVaiTro", result.ViewName);
        }

        //Test add postion null parameter
        [TestMethod]
        public void AddPositionNullParameter()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qlnhansu.ControllerContext = mockControllerContext.Object;
            string name = "";
            string description = "DescriptionTest";
            ContentResult result = qlnhansu.themVaiTro(name, description, null) as ContentResult;

            Assert.IsNotNull(result.Content);
            Assert.AreEqual("DANHSACH", result.Content);
        }

        //Test update postion null parameter
        [TestMethod]
        public void UpdatePositionNullParameter()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qlnhansu.ControllerContext = mockControllerContext.Object;
            string name = "";
            string description = "DescriptionTest";
            ContentResult result = qlnhansu.chinhSuaVaiTro(null, name, description, null) as ContentResult;

            Assert.IsNotNull(result.Content);
            Assert.AreEqual("DANHSACH", result.Content);
        }

        //Test update postion not exits
        [TestMethod]
        public void UpdatePositionNotExits()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qlnhansu.ControllerContext = mockControllerContext.Object;
            int id = 0;
            string name = "";
            string description = "DescriptionTest";
            ContentResult result = qlnhansu.chinhSuaVaiTro(id, name, description, null) as ContentResult;

            Assert.IsNotNull(result.Content);
            Assert.AreEqual("DANHSACH", result.Content);
        }

        //Test delete postion not exits
        [TestMethod]
        public void DeletePositionNotExits()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qlnhansu.ControllerContext = mockControllerContext.Object;
            int id = 0;

            ContentResult result = qlnhansu.xoaVaiTro(id) as ContentResult;

            Assert.IsNotNull(result.Content);
            Assert.AreEqual("DANHSACH", result.Content);
        }

        //Test delete postion null parametor
        [TestMethod]
        public void DeletePositionNullParameter()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qlnhansu.ControllerContext = mockControllerContext.Object;

            ContentResult result = qlnhansu.xoaVaiTro(null) as ContentResult;

            Assert.IsNotNull(result.Content);
            Assert.AreEqual("DANHSACH", result.Content);
        }
    }
}
