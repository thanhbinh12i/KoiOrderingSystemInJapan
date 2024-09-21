using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Project_SWP391.Migrations
{
    /// <inheritdoc />
    public partial class ChangingType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AlterColumn<string>(
                name: "PhoneNumber",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "DateOfBirth",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(DateOnly),
                oldType: "date");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AlterColumn<int>(
                name: "PhoneNumber",
                table: "AspNetUsers",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<DateOnly>(
                name: "DateOfBirth",
                table: "AspNetUsers",
                type: "date",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

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
    }
}
