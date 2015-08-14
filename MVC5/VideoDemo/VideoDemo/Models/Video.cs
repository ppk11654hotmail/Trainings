using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace VideoDemo.Models
{
    public class Video
    {
        [Display(Name = "影片代碼")]
        [Required(ErrorMessage = "{0}不可空白")]
        [StringLength(11, MinimumLength = 11, ErrorMessage = "{0}必須是{1}個字元")]
        [UIHint("Video")]
        public string Id { get; set; }

        [Display(Name = "影片標題")]
        [Required(ErrorMessage = "{0}不可空白")]
        [MaxLength(20)]
        public string Title { get; set; }

        [UIHint("Date")]
        [Display(Name = "開始日期")]
        public DateTime StartDate { get; set; }

        [UIHint("Date")]
        [Display(Name = "結束日期")]
        public DateTime EndDate { get; set; }

    }
}