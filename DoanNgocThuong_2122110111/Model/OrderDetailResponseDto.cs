using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
namespace DoanNgocThuong_2122110111.Model
{
    public class OrderDetailResponseDto
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public ProductResponseDto Product { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public string? UpdatedBy { get; set; }
    }
}