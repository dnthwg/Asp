using System.ComponentModel.DataAnnotations;

namespace DoanNgocThuong_2122110111.Model
{
    public class UserRegisterDto
    {
        [Required]
        [StringLength(50)]
        public string Username { get; set; }

        [Required]
        [EmailAddress]
        [StringLength(100)]
        public string Email { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 6)]
        public string Password { get; set; }

        [StringLength(100)]
        public string? FullName { get; set; }

        [Required]
        [StringLength(20)]
        public string Role { get; set; } // Thêm thuộc tính Role
    }

}