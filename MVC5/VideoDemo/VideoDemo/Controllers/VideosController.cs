using System.Data.Entity;
using System.Linq;
using System.Web.Mvc;
using VideoDemo.Models;
using Kendo.Mvc.Extensions;

namespace VideoDemo.Controllers
{
    public class VideosController : Controller
    {
        private VideoContext db = new VideoContext();

        public ActionResult Index()
        {
            return View(db.Videos.ToList());
        }

        [HttpPost]
        public ActionResult Create([Bind(Include = "Id,Title,StartDate,EndDate")] Video video)
        {
            if (ModelState.IsValid)
            {
                db.Videos.Add(video);
                db.SaveChanges();
                return RedirectToAction("Index", this.GridRouteValues());
            }

            return View("Index", db.Videos.ToList());
        }

        [HttpPost]
        public ActionResult Edit([Bind(Include = "Id,Title,StartDate,EndDate")] Video video)
        {
            if (ModelState.IsValid)
            {
                db.Entry(video).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index", this.GridRouteValues());
            }
            return View("Index", db.Videos.ToList());
        }

        [HttpPost]
        public ActionResult Delete(string id)
        {
            Video video = db.Videos.Find(id);
            db.Videos.Remove(video);
            db.SaveChanges();
            return RedirectToAction("Index", this.GridRouteValues());
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
