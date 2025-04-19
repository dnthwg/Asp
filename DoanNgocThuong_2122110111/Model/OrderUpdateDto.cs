using System.ComponentModel.DataAnnotations;

namespace DoanNgocThuong_2122110111.Model
{
    public class OrderUpdateDto
    {
        public int Id { get; set; }

        [Required]
        [StringLength(20)]
        public string Status { get; set; }
    }
}