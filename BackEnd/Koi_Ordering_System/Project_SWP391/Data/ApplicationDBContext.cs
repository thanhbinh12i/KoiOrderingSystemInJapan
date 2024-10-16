using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Project_SWP391.Model;

namespace Project_SWP391.Data
{
    public class ApplicationDBContext : IdentityDbContext<AppUser>
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
        {
        }

        // DbSet cho các entity
        public DbSet<Koi> Kois { get; set; }
        public DbSet<KoiBill> KoiBills { get; set; }
        public DbSet<KoiFarm> KoiFarms { get; set; }
        public DbSet<KoiVariety> KoiVarieties { get; set; }
        public DbSet<KoiImage> KoiImages { get; set; }
        public DbSet<FarmImage> FarmImages { get; set; }
        public DbSet<Bill> Bills { get; set; }
        public DbSet<BillDetail> BillDetails { get; set; }
        public DbSet<TourDestination> TourDestinations { get; set; }
        public DbSet<Tour> Tours { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<DeliveryStatus> DeliveryStatuses { get; set; }
        public DbSet<PayStatus> PayStatuses { get; set; }
        public DbSet<Quotation> Quotations { get; set; }
        public DbSet<Rating> Ratings { get; set; }
        public DbSet<VarietyOfKoi> VarietyOfKois { get; set; }
        public DbSet<Delivery> Deliveries { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Config for table N-N TourDestination
            modelBuilder.Entity<TourDestination>()
                .HasKey(td => new { td.FarmId, td.TourId });

            modelBuilder.Entity<TourDestination>()
                .HasOne(td => td.KoiFarm)
                .WithMany(kf => kf.TourDestinations)
                .HasForeignKey(td => td.FarmId);

            modelBuilder.Entity<TourDestination>()
                .HasOne(td => td.Tour)
                .WithMany(t => t.TourDestinations)
                .HasForeignKey(td => td.TourId);

            // Config for table N-N Rating
            modelBuilder.Entity<Rating>()
                .HasKey(r => new { r.FarmId, r.UserId });

            modelBuilder.Entity<Rating>()
                .HasOne(r => r.KoiFarm)
                .WithMany(kf => kf.Ratings)
                .HasForeignKey(r => r.FarmId);

            modelBuilder.Entity<Rating>()
                .HasOne(r => r.User)
                .WithMany(u => u.Ratings)
                .HasForeignKey(r => r.UserId);

            // Config for table N-N VarietyOfKoi
            modelBuilder.Entity<VarietyOfKoi>()
                .HasKey(vok => new { vok.KoiId, vok.VarietyId });

            modelBuilder.Entity<VarietyOfKoi>()
                .HasOne(vof => vof.KoiVariety)
                .WithMany(kv => kv.VarietyOfKois)
                .HasForeignKey(vof => vof.VarietyId);

            modelBuilder.Entity<VarietyOfKoi>()
                .HasOne(vof => vof.Koi)
                .WithMany(k => k.VarietyOfKois)
                .HasForeignKey(vof => vof.KoiId);
            // Config for table N-N KoiBill
            modelBuilder.Entity<KoiBill>()
                .HasKey(kb => new { kb.KoiId, kb.BillId });

            modelBuilder.Entity<KoiBill>()
                .HasOne(kb => kb.Koi)
                .WithMany(k => k.KoiBills)
                .HasForeignKey(kb => kb.KoiId);

            modelBuilder.Entity<KoiBill>()
                .HasOne(kb => kb.Bill)
                .WithMany(b => b.KoiBills)
                .HasForeignKey(kb => kb.BillId);
            // Config for table Quotation
            modelBuilder.Entity<Quotation>()
                .HasKey(q => q.QuotationId);

            modelBuilder.Entity<Quotation>()
                .HasOne(q => q.User)
                .WithMany(u => u.Quotations)
                .HasForeignKey(q => q.UserId);

            modelBuilder.Entity<Quotation>()
                .HasOne(q => q.Tour)
                .WithMany(t => t.Quotations)
                .HasForeignKey(q => q.TourId);
            modelBuilder.Entity<Bill>()
                .HasOne(b => b.Quotation)
                .WithOne(q => q.Bill)
                .HasForeignKey<Bill>(b => b.QuotationId)
                .OnDelete(DeleteBehavior.Restrict); // Hạn chế xóa liên quan, tránh gây chu kỳ

            // Seed roles
            var roles = new List<IdentityRole>
            {
                new IdentityRole { Name = "Customer", NormalizedName = "CUSTOMER" },
                new IdentityRole { Name = "Manager", NormalizedName = "MANAGER" },
                new IdentityRole { Name = "SalesStaff", NormalizedName = "SALESSTAFF" },
                new IdentityRole { Name = "ConsultingStaff", NormalizedName = "CONSULTINGSTAFF" },
                new IdentityRole { Name = "DeliveringStaff", NormalizedName = "DELIVERINGSTAFF" }
            };
            modelBuilder.Entity<IdentityRole>().HasData(roles);

            base.OnModelCreating(modelBuilder); // Gọi base ở cuối
        }
    }
}
