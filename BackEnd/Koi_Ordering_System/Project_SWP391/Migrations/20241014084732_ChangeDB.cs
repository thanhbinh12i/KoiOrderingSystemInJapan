using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Project_SWP391.Migrations
{
    /// <inheritdoc />
    public partial class ChangeDB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2801c371-5cdd-45ee-b58f-3b06ef6cedee");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b5b1b2e4-ac56-4c70-a25b-a897c00fdfcc");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c51f96d6-7787-4131-b532-0a6762fab602");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ced5ce34-9c77-4236-bfdd-3cdaf131bd60");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f8e49502-7f66-467a-a6f9-86fdf4765220");

            migrationBuilder.RenameColumn(
                name: "username",
                table: "Quotations",
                newName: "Username");

            migrationBuilder.RenameColumn(
                name: "tourName",
                table: "Quotations",
                newName: "TourName");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "282a0369-ce70-46ea-93a3-6c961e58d9ae", null, "Manager", "MANAGER" },
                    { "2c6e8e34-bcdf-44ef-aa79-e1491e808b85", null, "ConsultingStaff", "CONSULTINGSTAFF" },
                    { "4124988f-6166-4644-9b68-f21a0b882e84", null, "Customer", "CUSTOMER" },
                    { "4146dd7e-ddec-49de-94cd-3713006d5153", null, "DeliveringStaff", "DELIVERINGSTAFF" },
                    { "c6fad17b-df5d-4083-bff4-f4d7553f7050", null, "SalesStaff", "SALESSTAFF" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "282a0369-ce70-46ea-93a3-6c961e58d9ae");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2c6e8e34-bcdf-44ef-aa79-e1491e808b85");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4124988f-6166-4644-9b68-f21a0b882e84");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4146dd7e-ddec-49de-94cd-3713006d5153");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c6fad17b-df5d-4083-bff4-f4d7553f7050");

            migrationBuilder.RenameColumn(
                name: "Username",
                table: "Quotations",
                newName: "username");

            migrationBuilder.RenameColumn(
                name: "TourName",
                table: "Quotations",
                newName: "tourName");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "2801c371-5cdd-45ee-b58f-3b06ef6cedee", null, "SalesStaff", "SALESSTAFF" },
                    { "b5b1b2e4-ac56-4c70-a25b-a897c00fdfcc", null, "DeliveringStaff", "DELIVERINGSTAFF" },
                    { "c51f96d6-7787-4131-b532-0a6762fab602", null, "ConsultingStaff", "CONSULTINGSTAFF" },
                    { "ced5ce34-9c77-4236-bfdd-3cdaf131bd60", null, "Manager", "MANAGER" },
                    { "f8e49502-7f66-467a-a6f9-86fdf4765220", null, "Customer", "CUSTOMER" }
                });
        }
    }
}
