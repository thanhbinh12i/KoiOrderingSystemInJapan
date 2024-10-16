using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Project_SWP391.Migrations
{
    /// <inheritdoc />
    public partial class EditDB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Bills_UserId",
                table: "Bills");

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

            migrationBuilder.AlterColumn<string>(
                name: "UpdateDate",
                table: "Kois",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0cbfd504-ba58-4eb6-a600-5b338336a300", null, "ConsultingStaff", "CONSULTINGSTAFF" },
                    { "65c663ca-b543-4db8-9a3b-7c1be05a16a3", null, "Customer", "CUSTOMER" },
                    { "7e190e9d-0715-4a5c-a840-375c7c771caf", null, "Manager", "MANAGER" },
                    { "80058da3-eac9-49e7-b9e1-ca4b6e299170", null, "SalesStaff", "SALESSTAFF" },
                    { "9ebefaee-8495-429c-ae5d-de6ce873f6cf", null, "DeliveringStaff", "DELIVERINGSTAFF" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Bills_UserId",
                table: "Bills",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Bills_UserId",
                table: "Bills");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0cbfd504-ba58-4eb6-a600-5b338336a300");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "65c663ca-b543-4db8-9a3b-7c1be05a16a3");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7e190e9d-0715-4a5c-a840-375c7c771caf");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "80058da3-eac9-49e7-b9e1-ca4b6e299170");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9ebefaee-8495-429c-ae5d-de6ce873f6cf");

            migrationBuilder.AlterColumn<string>(
                name: "UpdateDate",
                table: "Kois",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

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

            migrationBuilder.CreateIndex(
                name: "IX_Bills_UserId",
                table: "Bills",
                column: "UserId",
                unique: true);
        }
    }
}
