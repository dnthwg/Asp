using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

public class Category
{
    public int Id { get; set; }
    public string? Name { get; set; } // Tên danh mục
    public string? Description { get; set; } // Mô tả danh mục

    // Quan hệ 1-N với Product
    public List<Product> Products { get; set; } = new List<Product>();
}

