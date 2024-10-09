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
                    { "3fbfa96f-70bb-4069-917e-9ce5e828c0e8", null, "ConsultingStaff", "CONSULTINGSTAFF" },
                    { "4d2bd26f-e4f4-4ecd-99a7-efb0ef3294ca", null, "DeliveringStaff", "DELIVERINGSTAFF" },
                    { "4f2f59d2-2bc6-4b4a-a986-ad96bed65ac0", null, "Manager", "MANAGER" },
                    { "5d6fa5db-32f1-46ca-ab1c-b7ee130f6bce", null, "Customer", "CUSTOMER" },
                    { "6a8e991f-4656-4588-bce8-6ed052fec12d", null, "SalesStaff", "SALESSTAFF" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3fbfa96f-70bb-4069-917e-9ce5e828c0e8");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4d2bd26f-e4f4-4ecd-99a7-efb0ef3294ca");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4f2f59d2-2bc6-4b4a-a986-ad96bed65ac0");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5d6fa5db-32f1-46ca-ab1c-b7ee130f6bce");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6a8e991f-4656-4588-bce8-6ed052fec12d");

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
    }
}
