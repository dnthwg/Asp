using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using DoanNgocThuong_2122110111.Data;
using DoanNgocThuong_2122110111.Model;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using System.Collections.Generic;
using System;
using System.Linq;

namespace DoanNgocThuong_2122110111.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public UserController(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // GET: /User
        // GET: /User
        [HttpGet]
        // [Authorize(Roles = "Admin")] // Bật nếu muốn giới hạn quyền
        public async Task<ActionResult<IEnumerable<UserResponseDto>>> GetUsers()
        {
            var users = await _context.Users
                .Select(u => new UserResponseDto
                {
                    Id = u.Id,
                    Username = u.Username,
                    Email = u.Email,
                    FullName = u.FullName,
                    Role = u.Role,
                    IsDeleted = u.DeletedDate != null // Thêm thông tin đã bị xóa hay chưa
                })
                .ToListAsync();

            if (!users.Any())
            {
                return NotFound("No users found.");
            }

            return Ok(users);
        }



        // GET: /User/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserResponseDto>> GetUser(int id)
        {
            var user = await _context.Users
                .Where(u => u.Id == id && u.DeletedDate == null)
                .Select(u => new UserResponseDto
                {
                    Id = u.Id,
                    Username = u.Username,
                    Email = u.Email,
                    FullName = u.FullName,
                    Role = u.Role
                })
                .FirstOrDefaultAsync();

            if (user == null)
            {
                return NotFound($"User with ID {id} not found.");
            }

            return Ok(user);
        }


        // POST: /User/Register
        [HttpPost("Register")]
        public async Task<ActionResult<UserResponseDto>> Register(UserRegisterDto userDto)
        {
            if (await _context.Users.AnyAsync(u => u.Username == userDto.Username && u.DeletedDate == null))
            {
                return BadRequest("Username already exists.");
            }
            if (await _context.Users.AnyAsync(u => u.Email == userDto.Email && u.DeletedDate == null))
            {
                return BadRequest("Email already exists.");
            }

            // Kiểm tra vai trò hợp lệ
            var validRoles = new[] { "Admin", "User" }; // Danh sách vai trò hợp lệ
            if (!validRoles.Contains(userDto.Role))
            {
                return BadRequest("Invalid role.");
            }

            var user = new User
            {
                Username = userDto.Username,
                Email = userDto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(userDto.Password),
                FullName = userDto.FullName,
                Role = userDto.Role, // Sử dụng giá trị Role từ DTO
                CreatedDate = DateTime.Now,
                CreatedBy = "System"
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, new UserResponseDto
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email,
                FullName = user.FullName,
                Role = user.Role
            });
        }



        // POST: /User/Login
        [HttpPost("Login")]
        public async Task<ActionResult<LoginResponseDto>> Login(UserLoginDto loginDto)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => (u.Username == loginDto.UsernameOrEmail || u.Email == loginDto.UsernameOrEmail) && u.DeletedDate == null);

            if (user == null)
            {
                return BadRequest(new { success = false, message = "Invalid username or email." });
            }

            if (!BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash))
            {
                return BadRequest(new { success = false, message = "Invalid password." });
            }

            var token = GenerateJwtToken(user);

            return Ok(new
            {
                success = true,
                redirectUrl = "/Admin/Dashboard", // URL chuyển hướng
                token,
                user = new UserResponseDto
                {
                    Id = user.Id,
                    Username = user.Username,
                    Email = user.Email,
                    FullName = user.FullName,
                    Role = user.Role
                }
            });
        }



        // PUT: /User/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, UserUpdateDto userDto)
        {
            if (id != userDto.Id)
            {
                return BadRequest();
            }

            var user = await _context.Users.FindAsync(id);
            if (user == null || user.DeletedDate != null)
            {
                return NotFound();
            }

            if (await _context.Users.AnyAsync(u => u.Username == userDto.Username && u.Id != id && u.DeletedDate == null))
            {
                return BadRequest("Username already exists.");
            }
            if (await _context.Users.AnyAsync(u => u.Email == userDto.Email && u.Id != id && u.DeletedDate == null))
            {
                return BadRequest("Email already exists.");
            }

            user.Username = userDto.Username;
            user.Email = userDto.Email;
            user.FullName = userDto.FullName;
            user.Role = userDto.Role;
            user.UpdatedDate = DateTime.Now;
            user.UpdatedBy = "System";

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        // DELETE: /User/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null || user.DeletedDate != null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);

            await _context.SaveChangesAsync();

            return NoContent();
        }
        // GET: /User/Deleted
        [HttpGet("Deleted")]
        // [Authorize(Roles = "Admin")] // Bật nếu bạn muốn giới hạn quyền truy cập
        public async Task<ActionResult<IEnumerable<UserResponseDto>>> GetDeletedUsers()
        {
            var deletedUsers = await _context.Users
                .Where(u => u.DeletedDate != null)
                .Select(u => new UserResponseDto
                {
                    Id = u.Id,
                    Username = u.Username,
                    Email = u.Email,
                    FullName = u.FullName,
                    Role = u.Role
                })
                .ToListAsync();

            if (!deletedUsers.Any())
            {
                return NotFound("No deleted users found.");
            }

            return Ok(deletedUsers);
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id && e.DeletedDate == null);
        }

        private string GenerateJwtToken(User user)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}