using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Project_SWP391.Migrations
{
    /// <inheritdoc />
    public partial class EditRatingTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
          
            migrationBuilder.AlterColumn<float>(
                name: "Rate",
                table: "Ratings",
                type: "real",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<string>(
                name: "RatingDate",
                table: "Ratings",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
         
            migrationBuilder.DropColumn(
                name: "RatingDate",
                table: "Ratings");

            migrationBuilder.AlterColumn<int>(
                name: "Rate",
                table: "Ratings",
                type: "int",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "real");
        }
    }
}
