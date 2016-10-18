using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Bangazon.Data;
using Bangazon.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;

namespace WebAPIApplication.Controllers
{
    [Produces("application/json")]
    [Route("[controller]")]
    public class ProductsController : Controller
    {
        private BangazonContext context;

        public ProductsController(BangazonContext ctx)
        {
            context = ctx;
        }

        // GET api/values
        [HttpGet]
        public IActionResult Get()
        {
            IQueryable<object> products = from product in context.Product select product;

            if (products == null)
            {
                return NotFound();
            }
            return Ok(products);
        }

        // GET api/values/5
        [HttpGet("{id}", Name = "GetProduct")]
        public IActionResult Get([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                Product product = context.Product.Single(m => m.ProductId == id);

                if (product == null)
                {
                    return NotFound();
                }
                
                return Ok(product);
            }
            catch (System.InvalidOperationException ex)
            {
                return NotFound();
            }
        }

        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody] Product product)
                {
                    if (!ModelState.IsValid)
                    {
                        return BadRequest(ModelState);
                    }

                    context.Product.Add(product);
                    try
                    {
                        context.SaveChanges();
                    }
                    catch (DbUpdateException)
                    {
                        if (ProductExists(product.ProductId))
                        {
                            return new StatusCodeResult(StatusCodes.Status409Conflict);
                        }
                        else
                        {
                            throw;
                        }
                    }

                    return CreatedAtRoute("GetProduct", new { id = product.ProductId }, product);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                Product currentProduct = context.Product.Single(m => m.ProductId == id);

                if (currentProduct == null)
                {
                    return NotFound();
                }
                
                context.Product.Update(product);
                context.SaveChanges();
                
                return Ok(new {successful = $"Product with id {id} updated"});
            }

            catch (System.InvalidOperationException ex)
            {
                return NotFound();
            }
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                Product product = context.Product.Single(m => m.ProductId == id);

                if (product == null)
                {
                    return NotFound();
                }
                
                context.Product.Remove(product);
                context.SaveChanges();
                
                return Ok(new {successful = $"Order with id {id} deleted"});
            }

            catch (System.InvalidOperationException ex)
            {
                return NotFound();
            }
        }
        private bool ProductExists(int id)
        {
            return context.Product.Count(e => e.ProductId == id) > 0;
        }
    }
}
