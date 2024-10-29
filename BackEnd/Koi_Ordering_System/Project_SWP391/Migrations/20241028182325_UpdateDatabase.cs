using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Project_SWP391.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDatabase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1a070119-0353-4f3b-b2bf-aa0bf284601c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "42fcb48d-b5e9-47cc-8482-860f1608bdfd");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "598b999b-8d2a-48b4-9cce-4cf6d063d89c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "bb952c3b-4f99-4995-894c-be08795b1b38");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ece9df02-a877-4a40-8c68-506947d9d5e9");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "11c9592c-f25f-4291-a9aa-8d6da0613fc8", null, "Customer", "CUSTOMER" },
                    { "37893749-b37c-43ff-b243-a81ba51a7e78", null, "ConsultingStaff", "CONSULTINGSTAFF" },
                    { "48e9c566-946f-46ba-89a1-136af1761796", null, "DeliveringStaff", "DELIVERINGSTAFF" },
                    { "49668926-ac39-4674-b160-b5b7c8288380", null, "SalesStaff", "SALESSTAFF" },
                    { "7fbc0255-3563-4aec-98c7-f68a149ebcdb", null, "Manager", "MANAGER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "11c9592c-f25f-4291-a9aa-8d6da0613fc8");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "37893749-b37c-43ff-b243-a81ba51a7e78");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "48e9c566-946f-46ba-89a1-136af1761796");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "49668926-ac39-4674-b160-b5b7c8288380");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7fbc0255-3563-4aec-98c7-f68a149ebcdb");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1a070119-0353-4f3b-b2bf-aa0bf284601c", null, "Manager", "MANAGER" },
                    { "42fcb48d-b5e9-47cc-8482-860f1608bdfd", null, "Customer", "CUSTOMER" },
                    { "598b999b-8d2a-48b4-9cce-4cf6d063d89c", null, "DeliveringStaff", "DELIVERINGSTAFF" },
                    { "bb952c3b-4f99-4995-894c-be08795b1b38", null, "ConsultingStaff", "CONSULTINGSTAFF" },
                    { "ece9df02-a877-4a40-8c68-506947d9d5e9", null, "SalesStaff", "SALESSTAFF" }
                });
        }
    }
}
