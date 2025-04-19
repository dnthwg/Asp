using System.ComponentModel.DataAnnotations;

namespace DoanNgocThuong_2122110111.Model
{
    public class OrderDetailCreateDto
    {
        [Required]
        public int ProductId { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int Quantity { get; set; }
    }
}