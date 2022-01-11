using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CarsLocation.Models;
using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace CarsLocation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _context;

        private readonly IWebHostEnvironment _webHostEnvironment;

        public ProductsController(AppDbContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            this._webHostEnvironment = webHostEnvironment;
        }

        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductsModel>>> GetProducts()
        {
            return await _context.Products
                .Select(x => new ProductsModel()
                {
                    ProductID = x.ProductID,
                    ProductName = x.ProductName,
                    Description = x.Description,
                    ImageName = x.ImageName,
                    ImageSrc = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, x.ImageName),
                    CategoryID = x.CategoryID,
                    Price = x.Price
                })
                .ToListAsync();
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductsModel>> GetProductsModel(int id)
        {
            var productsModel = await _context.Products.FindAsync(id);

            if (productsModel == null)
            {
                return NotFound();
            }

            return productsModel;
        }

        // PUT: api/Products/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductsModel(int id, [FromForm]ProductsModel productsModel)
        {
            if (id != productsModel.ProductID)
            {
                return BadRequest();
            }

            if (productsModel.ImageFile != null)
            {
                DeleteImage(productsModel.ImageName);
                productsModel.ImageName = await SaveImage(productsModel.ImageFile);
            }

            _context.Entry(productsModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductsModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Products
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProductsModel>> PostProductsModel([FromForm]ProductsModel productsModel)
        {
            productsModel.ImageName = await SaveImage(productsModel.ImageFile);
            _context.Products.Add(productsModel);
            await _context.SaveChangesAsync();

            //return CreatedAtAction("GetProductsModel", new { id = productsModel.ProductID }, productsModel);
            return StatusCode(201);
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductsModel(int id)
        {
            var productsModel = await _context.Products.FindAsync(id);
            if (productsModel == null)
            {
                return NotFound();
            }

            DeleteImage(productsModel.ImageName);
            _context.Products.Remove(productsModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductsModelExists(int id)
        {
            return _context.Products.Any(e => e.ProductID == id);
        }

        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_webHostEnvironment.ContentRootPath, "Images", imageName);

            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }

            return imageName;
        }
        [NonAction]
        public void DeleteImage(string imageName)
        {
            var imagePath = Path.Combine(_webHostEnvironment.ContentRootPath, "Images", imageName);
            if (System.IO.File.Exists(imagePath))
                System.IO.File.Delete(imagePath);
        }
    }
}
