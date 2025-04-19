using System.ComponentModel.DataAnnotations;

namespace DoanNgocThuong_2122110111.Model
{
    public class UserLoginDto
    {
        [Required]
        [StringLength(100)]
        public string UsernameOrEmail { get; set; }

        [Required]
        [StringLength(100)]
        public string Password { get; set; }
    }
}