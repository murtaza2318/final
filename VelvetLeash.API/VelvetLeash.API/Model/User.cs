using System.ComponentModel.DataAnnotations;

namespace VelvetLeash.API.Models
{
    public enum UserRole
    {
        Booker,
        Sitter
    }

    public class User
    {
        [Key]
        public string Id { get; set; } // Or int, depending on your Id strategy

        [Required]
        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; } // Store hashed passwords only!

        public UserRole Role { get; set; } = UserRole.Booker; // Default role

        // Navigation properties
        public virtual ICollection<Pet> Pets { get; set; }
        public virtual PetSitter PetSitterProfile { get; set; }
        public virtual ICollection<Booking> Bookings { get; set; }
        public virtual ICollection<Review> Reviews { get; set; }
        public virtual ICollection<UserNotificationSetting> NotificationSettings { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
