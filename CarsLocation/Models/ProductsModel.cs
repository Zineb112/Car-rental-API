using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CarsLocation.Models
{
    public class ProductsModel
    {
        [Key]
        public int ProductID { get; set; }

        public string ProductName { get; set; }

        public string Description { get; set; }

        public int Price { get; set; }

        [NotMapped]
        public IFormFile ImageFile { get; set; }

        public string ImageName { get; set; }

        [NotMapped]
        public string ImageSrc { get; set; }

        [Required(ErrorMessage = "Please Select a Category!")]
        public int CategoryID { get; set; }
        public virtual CategoriesModel Categories { get; set; }
    }
}
