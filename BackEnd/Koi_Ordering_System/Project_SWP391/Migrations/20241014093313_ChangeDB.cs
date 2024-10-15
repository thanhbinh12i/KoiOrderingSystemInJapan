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

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Quotations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Quotations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "FullName",
                table: "Quotations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "Quotations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1176b0e9-c4dd-4dcb-aad8-e35151fcad88", null, "Manager", "MANAGER" },
                    { "309fb6bd-40e3-431c-9c26-95509bdf9e0f", null, "Customer", "CUSTOMER" },
                    { "510e9f6b-430e-4fa8-aea1-652d533fa553", null, "DeliveringStaff", "DELIVERINGSTAFF" },
                    { "8b9189ea-dab5-4d77-a2a8-7edbe60944e7", null, "ConsultingStaff", "CONSULTINGSTAFF" },
                    { "f43f7548-6345-4c6f-82eb-e627ee2674a1", null, "SalesStaff", "SALESSTAFF" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1176b0e9-c4dd-4dcb-aad8-e35151fcad88");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "309fb6bd-40e3-431c-9c26-95509bdf9e0f");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "510e9f6b-430e-4fa8-aea1-652d533fa553");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8b9189ea-dab5-4d77-a2a8-7edbe60944e7");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f43f7548-6345-4c6f-82eb-e627ee2674a1");

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
    }
}
