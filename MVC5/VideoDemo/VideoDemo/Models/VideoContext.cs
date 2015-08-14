using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace VideoDemo.Models
{
    public class VideoContext : DbContext
    {
        public DbSet<Video> Videos { get; set; }
    }
}