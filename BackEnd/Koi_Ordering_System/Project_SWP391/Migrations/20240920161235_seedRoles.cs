using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Project_SWP391.Migrations
{
    /// <inheritdoc />
    public partial class seedRoles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "311ca599-e785-4579-b543-38fbba36ae66", null, "Manager", "MANAGER" },
                    { "5c6dd6a8-facd-41cf-9b05-419a550153dc", null, "DeliveringStaff", "DELIVERINGSTAFF" },
                    { "93cfcb25-aa63-436f-a8ca-70fda0beacd5", null, "SalesStaff", "SALESSTAFF" },
                    { "a0532972-e0c7-41ee-9c28-43ac3fd1e408", null, "Customer", "CUSTOMER" },
                    { "fd41f6d8-f67f-4edf-b6f4-a37446cb71f0", null, "ConsultingStaff", "CONSULTINGSTAFF" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "311ca599-e785-4579-b543-38fbba36ae66");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5c6dd6a8-facd-41cf-9b05-419a550153dc");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "93cfcb25-aa63-436f-a8ca-70fda0beacd5");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a0532972-e0c7-41ee-9c28-43ac3fd1e408");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "fd41f6d8-f67f-4edf-b6f4-a37446cb71f0");
        }
    }
}
