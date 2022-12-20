using ITGlobalProject.Controllers;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using System.Web;
using System.Web.Mvc;
using Moq;
using ITGlobalProject.Models;
using System.Threading.Tasks;

namespace ITGlobalProjetsUnitTest.User.Controller
{
    [TestClass]
    public class TrangChu
    {
        TrangChuController trangchu = new TrangChuController();

        //Test request View Home page
        [TestMethod]
        public void trangChu()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            trangchu.ControllerContext = mockControllerContext.Object;

            ViewResult result = trangchu.Index() as ViewResult;

            Assert.IsNotNull(result.ViewName);
            Assert.AreEqual("Index", result.ViewName);
        }
    }
}
