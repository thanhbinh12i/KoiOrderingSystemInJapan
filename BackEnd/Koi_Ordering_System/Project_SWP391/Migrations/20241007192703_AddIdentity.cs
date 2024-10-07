using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Project_SWP391.Migrations
{
    /// <inheritdoc />
    public partial class AddIdentity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "01057524-b088-492b-ba10-b1ea78522afd");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "08cab93f-28eb-414b-9843-d534d0088cea");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0b3b82cb-f582-4871-bb60-22eb5a03f531");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2cbfd7b4-7229-444e-aee9-7db1bd821d49");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "720a6550-6d71-4e4b-a17d-f44100827cd9");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "4c5c51b2-bbba-4398-931d-a0c3f5c91cf7", null, "DeliveringStaff", "DELIVERINGSTAFF" },
                    { "5e8041c9-4af7-4d59-8e06-80ee51aa0df2", null, "ConsultingStaff", "CONSULTINGSTAFF" },
                    { "82d492bd-a3c2-4000-a958-9845aa4e0d26", null, "Manager", "MANAGER" },
                    { "bc64202b-8c10-4d68-bf07-61f71114012a", null, "Customer", "CUSTOMER" },
                    { "f90bf13c-a221-44de-9260-bcfda026b138", null, "SalesStaff", "SALESSTAFF" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4c5c51b2-bbba-4398-931d-a0c3f5c91cf7");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5e8041c9-4af7-4d59-8e06-80ee51aa0df2");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "82d492bd-a3c2-4000-a958-9845aa4e0d26");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "bc64202b-8c10-4d68-bf07-61f71114012a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f90bf13c-a221-44de-9260-bcfda026b138");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "01057524-b088-492b-ba10-b1ea78522afd", null, "Customer", "CUSTOMER" },
                    { "08cab93f-28eb-414b-9843-d534d0088cea", null, "ConsultingStaff", "CONSULTINGSTAFF" },
                    { "0b3b82cb-f582-4871-bb60-22eb5a03f531", null, "Manager", "MANAGER" },
                    { "2cbfd7b4-7229-444e-aee9-7db1bd821d49", null, "SalesStaff", "SALESSTAFF" },
                    { "720a6550-6d71-4e4b-a17d-f44100827cd9", null, "DeliveringStaff", "DELIVERINGSTAFF" }
                });
        }
    }
}
