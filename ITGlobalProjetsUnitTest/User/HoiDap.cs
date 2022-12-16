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
    public class HoiDap
    {
        HoiDapController hoidap = new HoiDapController();

        //Test request View Liên hệ
        [TestMethod]
        public void ViewIndex()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            hoidap.ControllerContext = mockControllerContext.Object;

            ViewResult result = hoidap.Index() as ViewResult;

            Assert.IsNotNull(result.ViewName);
            Assert.AreEqual("Index", result.ViewName);
        }
    }
}
