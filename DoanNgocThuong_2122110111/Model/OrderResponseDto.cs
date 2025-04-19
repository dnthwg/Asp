using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
namespace DoanNgocThuong_2122110111.Model
{
    public class OrderResponseDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal TotalAmount { get; set; }
        public string Status { get; set; }
        public UserResponseDto User { get; set; }
        public List<OrderDetailResponseDto> OrderDetails { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public string? UpdatedBy { get; set; }
    }
}