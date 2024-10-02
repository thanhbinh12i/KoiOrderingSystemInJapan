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
        public DbSet<KoiFarm> KoiFarms { get; set; }
        public DbSet<KoiVariety> KoiVarieties { get; set; }
        public DbSet<KoiImage> KoiImages { get; set; }
        public DbSet<FarmImage> FarmImages { get; set; }
        public DbSet<Bill> Bills { get; set; }
        public DbSet<BillDetail> BillDetails { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<Tour> Tours { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<DeliveryStatus> DeliveryStatuses { get; set; }
        public DbSet<PayStatus> PayStatuses { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //config of table N-N BillDetail
            modelBuilder.Entity<BillDetail>()
                .HasKey(bd => new { bd.BillId, bd.ServiceId });

            modelBuilder.Entity<BillDetail>()
                .HasOne(bd => bd.Bill)
                .WithMany(b => b.BillDetails)
                .HasForeignKey(bd => bd.BillId);

            modelBuilder.Entity<BillDetail>()
                .HasOne(bd => bd.Service)
                .WithMany(s => s.BillDetails)
                .HasForeignKey(bd => bd.ServiceId);
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Bill>()
                .HasOne(b => b.User)
                .WithMany(u => u.Bills)
                .HasForeignKey(b => b.UserId)
                .OnDelete(DeleteBehavior.Cascade); // Cascade delete if needed
            base.OnModelCreating(modelBuilder);
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
