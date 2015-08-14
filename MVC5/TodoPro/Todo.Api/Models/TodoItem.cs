using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;


namespace Todo.Api.Models
{
    public class TodoItem
    {
        public int Id { get; set; }
        [Required, StringLength(maximumLength: 30)]
        public string Description { get; set; }
        public bool IsDone { get; set; }

    }
}