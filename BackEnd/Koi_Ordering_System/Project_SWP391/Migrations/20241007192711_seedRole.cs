using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Project_SWP391.Migrations
{
    /// <inheritdoc />
    public partial class seedRole : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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
                    { "397c1518-af48-40fd-a9df-cc66e3015ec7", null, "DeliveringStaff", "DELIVERINGSTAFF" },
                    { "43e374c3-f121-4e9b-b1d7-424bb53b2e39", null, "Manager", "MANAGER" },
                    { "9236398e-4bc4-4dea-be8e-1976f10463b2", null, "SalesStaff", "SALESSTAFF" },
                    { "d8e35ddc-1997-4908-a9de-3262fd1950cb", null, "ConsultingStaff", "CONSULTINGSTAFF" },
                    { "fbd6d7c8-8f35-4e70-93fd-d3105dcba1d7", null, "Customer", "CUSTOMER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "397c1518-af48-40fd-a9df-cc66e3015ec7");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "43e374c3-f121-4e9b-b1d7-424bb53b2e39");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9236398e-4bc4-4dea-be8e-1976f10463b2");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d8e35ddc-1997-4908-a9de-3262fd1950cb");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "fbd6d7c8-8f35-4e70-93fd-d3105dcba1d7");

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
    }
}
