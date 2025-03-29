using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

public class Category
{
    [Key]  // Định nghĩa khóa chính
    public int Id { get; set; }

    [Required]  // Đảm bảo trường Name không được để trống
    public string Name { get; set; }
}

