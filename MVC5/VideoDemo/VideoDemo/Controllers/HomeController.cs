using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VideoDemo.Models;

namespace VideoDemo.Controllers
{
    public class HomeController : Controller
    {
        private VideoContext db = new VideoContext();
        public ActionResult Index()
        {
            var model =
            db.Videos
                .Where(e => e.StartDate <= DateTime.Today &&
                        e.EndDate >= DateTime.Today)
                .OrderBy(e => Guid.NewGuid()).FirstOrDefault();
            return View(model);
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}