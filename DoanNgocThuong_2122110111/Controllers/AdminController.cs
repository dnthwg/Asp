using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Security.Claims;

namespace DoanNgocThuong_2122110111.Controllers
{ // Yêu cầu đăng nhập cho toàn bộ controller
    public class AdminController : Controller
    {
        public IActionResult Index()
        {
            
                return View();
          
        }
        public IActionResult Login()
        {
            return View();
        }

        public IActionResult Register()
        {
            return View();
        }

        public IActionResult Dashboard()
        {
            return View();
        }

        public IActionResult ManageUsers()
        {
            return View();
        }

        public IActionResult ManageProducts()
        {
            return View();
        }

        public IActionResult ManageCategories()
        {
            return View();
        }

        public IActionResult ManageOrders()
        {
            return View();
        }
    }
}
