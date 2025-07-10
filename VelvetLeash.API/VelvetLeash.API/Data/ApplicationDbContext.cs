using Microsoft.EntityFrameworkCore;
using VelvetLeash.API.Models;

namespace VelvetLeash.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; } // Added DbSet for Users
        public DbSet<Pet> Pets { get; set; }
        public DbSet<PetSitter> PetSitters { get; set; }
        public DbSet<PetSitterService> PetSitterServices { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<BookingMessage> BookingMessages { get; set; }
        public DbSet<UserNotificationSetting> UserNotificationSettings { get; set; }


    }
}
