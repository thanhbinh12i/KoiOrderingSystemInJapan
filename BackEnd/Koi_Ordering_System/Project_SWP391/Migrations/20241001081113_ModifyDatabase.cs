using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Project_SWP391.Migrations
{
    /// <inheritdoc />
    public partial class ModifyDatabase : Migration
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

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "009461b4-55b6-49d9-8cca-d98bc5e32795", null, "Manager", "MANAGER" },
                    { "59e0cf4c-6983-4d3d-8ec0-596d39367313", null, "ConsultingStaff", "CONSULTINGSTAFF" },
                    { "84ffb401-531a-4fdd-9b39-eafbce5d144f", null, "DeliveringStaff", "DELIVERINGSTAFF" },
                    { "9b2569f9-4090-4e88-88b1-b3bd76bf2cf9", null, "SalesStaff", "SALESSTAFF" },
                    { "9f71f375-cb8e-4960-b7e7-15b4d5bef7ac", null, "Customer", "CUSTOMER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "009461b4-55b6-49d9-8cca-d98bc5e32795");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "59e0cf4c-6983-4d3d-8ec0-596d39367313");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "84ffb401-531a-4fdd-9b39-eafbce5d144f");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9b2569f9-4090-4e88-88b1-b3bd76bf2cf9");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9f71f375-cb8e-4960-b7e7-15b4d5bef7ac");

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
