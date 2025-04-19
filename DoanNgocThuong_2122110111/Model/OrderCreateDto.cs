using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace DoanNgocThuong_2122110111.Model
{
    public class OrderCreateDto
    {
        [Required]
        public int UserId { get; set; }

        [Required]
        public List<OrderDetailCreateDto> OrderDetails { get; set; }
    }
}