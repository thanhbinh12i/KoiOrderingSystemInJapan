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
            //config of table N-N TourDestion
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
            base.OnModelCreating(modelBuilder);
            //config of table N-N Rating
            modelBuilder.Entity<Rating>()
                .HasKey(td => new { td.FarmId, td.UserId });

            modelBuilder.Entity<Rating>()
                .HasOne(r => r.KoiFarm)
                .WithMany(kf => kf.Ratings)
                .HasForeignKey(r => r.FarmId);

            modelBuilder.Entity<Rating>()
                .HasOne(r => r.User)
                .WithMany(u => u.Ratings)
                .HasForeignKey(r => r.UserId);
            base.OnModelCreating(modelBuilder);
            //config of table N-N VarietyOfKoi
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
            base.OnModelCreating(modelBuilder);

            //config of table N-N Quotation
            modelBuilder.Entity<Quotation>()
                .HasKey(q => q.QuotationId);

            modelBuilder.Entity<Quotation>()
                .HasOne(q => q.User)
                .WithMany(u => u.Quotations)
                .HasForeignKey(q => q.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Quotation>()
                .HasOne(q => q.Tour)
                .WithMany(t => t.Quotations)
                .HasForeignKey(q => q.TourId)
                .OnDelete(DeleteBehavior.Cascade);
            base.OnModelCreating(modelBuilder);


            //modelBuilder.Entity<Bill>()
            //    .HasOne(b => b.User)
            //    .WithMany(u => u.Bills)
            //    .HasForeignKey(b => b.UserId)
            //    .OnDelete(DeleteBehavior.Cascade); // Cascade delete if needed
            //base.OnModelCreating(modelBuilder);
            List<IdentityRole> roles = new List<IdentityRole>
            {
                new IdentityRole
                {
                    Name="Customer",
                    NormalizedName="CUSTOMER"
                }, new IdentityRole
                {
                    Name= "Manager",
                    NormalizedName="MANAGER"
                },new IdentityRole
                {
                    Name= "SalesStaff",
                    NormalizedName="SALESSTAFF"
                },new IdentityRole
                {
                    Name= "ConsultingStaff",
                    NormalizedName="CONSULTINGSTAFF"
                },new IdentityRole
                {
                    Name= "DeliveringStaff",
                    NormalizedName="DELIVERINGSTAFF"
                }
            };
            modelBuilder.Entity<IdentityRole>().HasData(roles);
        }
    }
}
