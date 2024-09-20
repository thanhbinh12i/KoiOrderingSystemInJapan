using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Project_SWP391.Migrations
{
    /// <inheritdoc />
    public partial class ChangeDateOfBirthType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AlterColumn<DateOnly>(
                name: "UpdateDate",
                table: "Kois",
                type: "date",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AlterColumn<DateOnly>(
                name: "DateOfBirth",
                table: "AspNetUsers",
                type: "date",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1c8bbb01-b5e6-4ad3-97b0-33553251ed99", null, "Customer", "CUSTOMER" },
                    { "2ce73e8e-4fe1-46d1-a2a1-80aca3f9961f", null, "DeliveringStaff", "DELIVERINGSTAFF" },
                    { "533db6b3-a14d-44cd-807c-f8732caa485d", null, "SalesStaff", "SALESSTAFF" },
                    { "66375332-ab30-4d53-8455-05abcafa872c", null, "ConsultingStaff", "CONSULTINGSTAFF" },
                    { "af54aab8-3c76-49d7-bd0a-3cdb963b7254", null, "Manager", "MANAGER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1c8bbb01-b5e6-4ad3-97b0-33553251ed99");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2ce73e8e-4fe1-46d1-a2a1-80aca3f9961f");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "533db6b3-a14d-44cd-807c-f8732caa485d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "66375332-ab30-4d53-8455-05abcafa872c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "af54aab8-3c76-49d7-bd0a-3cdb963b7254");

            migrationBuilder.AlterColumn<DateTime>(
                name: "UpdateDate",
                table: "Kois",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(DateOnly),
                oldType: "date");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateOfBirth",
                table: "AspNetUsers",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(DateOnly),
                oldType: "date");

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
    }
}
