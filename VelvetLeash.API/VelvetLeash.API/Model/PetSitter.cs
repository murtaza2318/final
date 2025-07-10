using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using VelvetLeash.API.Models; // Added using statement for User model

public class PetSitter
{
    public int Id { get; set; }

    [Required]
    public string UserId { get; set; }
    [ForeignKey("UserId")] // Added ForeignKey attribute
    public virtual User User { get; set; } // Added navigation property to User

    public string? About { get; set; }
    public string? Skills { get; set; }
    public string? HomeDetails { get; set; }
    public string? Address { get; set; }
    public string? City { get; set; }
    public string? State { get; set; }
    public string? ZipCode { get; set; }
    public double? Latitude { get; set; }
    public double? Longitude { get; set; }
    public bool IsStarSitter { get; set; } = false;
    public bool IsAvailable { get; set; } = true;

    // Use double instead of decimal
    [Column(TypeName = "decimal(18,2)")]
    public decimal? HourlyRate { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal? DailyRate { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal? OvernightRate { get; set; }
    public float AverageRating { get; set; } = 0f;
    public int TotalReviews { get; set; } = 0;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
