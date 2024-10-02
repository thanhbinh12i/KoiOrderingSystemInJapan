using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Project_SWP391.Migrations
{
    /// <inheritdoc />
    public partial class EditDB_DateTimeToString : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0d1ebe93-c657-4932-93c7-dff47db83f9d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "65c45728-ff3c-47bc-947d-bb8197c91ebb");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6db3e259-b900-40e2-9e6d-38799f2083c5");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "abb5eb97-0205-49c0-aae4-cf9deaaf8ec0");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "abfdea2d-d34d-459c-a134-eeaa5506c166");

            migrationBuilder.AlterColumn<string>(
                name: "StartTime",
                table: "Tours",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AlterColumn<string>(
                name: "FinishTime",
                table: "Tours",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AlterColumn<string>(
                name: "OpenHour",
                table: "KoiFarms",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AlterColumn<string>(
                name: "CloseHour",
                table: "KoiFarms",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AlterColumn<string>(
                name: "EstimatedDate",
                table: "DeliveryStatuses",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "4aa4bce8-bba5-43b4-b9de-4776d659b101", null, "DeliveringStaff", "DELIVERINGSTAFF" },
                    { "60e995f1-b50b-4eba-8e9a-e8c1c77b6375", null, "SalesStaff", "SALESSTAFF" },
                    { "611dcc94-a520-4444-91b1-98b696c02158", null, "Customer", "CUSTOMER" },
                    { "8824b3cd-e3f5-40f3-a346-6e018dcaadff", null, "ConsultingStaff", "CONSULTINGSTAFF" },
                    { "cf5eee2e-6ab0-4f65-860c-69977a334152", null, "Manager", "MANAGER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4aa4bce8-bba5-43b4-b9de-4776d659b101");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "60e995f1-b50b-4eba-8e9a-e8c1c77b6375");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "611dcc94-a520-4444-91b1-98b696c02158");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8824b3cd-e3f5-40f3-a346-6e018dcaadff");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "cf5eee2e-6ab0-4f65-860c-69977a334152");

            migrationBuilder.AlterColumn<DateTime>(
                name: "StartTime",
                table: "Tours",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<DateTime>(
                name: "FinishTime",
                table: "Tours",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<DateTime>(
                name: "OpenHour",
                table: "KoiFarms",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CloseHour",
                table: "KoiFarms",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<DateTime>(
                name: "EstimatedDate",
                table: "DeliveryStatuses",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0d1ebe93-c657-4932-93c7-dff47db83f9d", null, "DeliveringStaff", "DELIVERINGSTAFF" },
                    { "65c45728-ff3c-47bc-947d-bb8197c91ebb", null, "Customer", "CUSTOMER" },
                    { "6db3e259-b900-40e2-9e6d-38799f2083c5", null, "Manager", "MANAGER" },
                    { "abb5eb97-0205-49c0-aae4-cf9deaaf8ec0", null, "ConsultingStaff", "CONSULTINGSTAFF" },
                    { "abfdea2d-d34d-459c-a134-eeaa5506c166", null, "SalesStaff", "SALESSTAFF" }
                });
        }
    }
}
