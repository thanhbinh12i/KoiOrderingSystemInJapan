﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project_SWP391.Model
{
    public class Quotation
    {
        [Key]
        public int QuotationId { get; set; }
        public float PriceOffer { get; set; }
        public string Status { get; set; }
        public string ApprovedDate { get; set; }
        public Guid UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public AppUser User { get; set; }
        public int TourId { get; set; }
        [ForeignKey(nameof(TourId))]
        public Tour Tour { get; set; }
    }
}
