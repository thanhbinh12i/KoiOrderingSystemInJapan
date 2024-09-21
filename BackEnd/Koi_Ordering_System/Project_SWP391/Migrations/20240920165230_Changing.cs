using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Project_SWP391.Migrations
{
    /// <inheritdoc />
    public partial class Changing : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1d9cf859-c15e-4f4d-8d67-030f7c062c6a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6499a96a-a4fd-47e9-a47b-e42a3346e32e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8ee19af3-b321-46ea-9110-5563744da103");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a558582f-cf97-448f-b1b4-2070899518e9");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d4aebf3c-4355-47bb-9981-5215d818824d");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1c108ba2-626f-4e45-8d7a-ca3681a6b9d5", null, "ConsultingStaff", "CONSULTINGSTAFF" },
                    { "47f07066-4f14-409d-a22c-dbbcc73e6aaa", null, "SalesStaff", "SALESSTAFF" },
                    { "5c0cbe60-42a5-4e93-b30f-290b06e4c995", null, "Manager", "MANAGER" },
                    { "729f4d8d-e0f8-470f-bec0-4015c6d8f5a1", null, "DeliveringStaff", "DELIVERINGSTAFF" },
                    { "e38e2cea-bbf0-45e3-8b2d-9edf4602251e", null, "Customer", "CUSTOMER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1c108ba2-626f-4e45-8d7a-ca3681a6b9d5");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "47f07066-4f14-409d-a22c-dbbcc73e6aaa");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5c0cbe60-42a5-4e93-b30f-290b06e4c995");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "729f4d8d-e0f8-470f-bec0-4015c6d8f5a1");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e38e2cea-bbf0-45e3-8b2d-9edf4602251e");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1d9cf859-c15e-4f4d-8d67-030f7c062c6a", null, "Manager", "MANAGER" },
                    { "6499a96a-a4fd-47e9-a47b-e42a3346e32e", null, "SalesStaff", "SALESSTAFF" },
                    { "8ee19af3-b321-46ea-9110-5563744da103", null, "Customer", "CUSTOMER" },
                    { "a558582f-cf97-448f-b1b4-2070899518e9", null, "DeliveringStaff", "DELIVERINGSTAFF" },
                    { "d4aebf3c-4355-47bb-9981-5215d818824d", null, "ConsultingStaff", "CONSULTINGSTAFF" }
                });
        }
    }
}
