using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Project_SWP391.Migrations
{
    /// <inheritdoc />
    public partial class Update_rating : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "002d9d08-4531-413c-a02a-41ff719bc8f7");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7b74099f-427d-42ed-9f8f-057e1219703d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8c27da1e-a056-45d0-8f36-c63433c23067");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d4ae62ff-2a9a-4f58-bd30-9e21d9bbf7c4");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e9fafde9-229e-4825-b771-2c5a182f670d");

            migrationBuilder.AlterColumn<float>(
                name: "Rate",
                table: "Ratings",
                type: "real",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<string>(
                name: "RatingDate",
                table: "Ratings",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "08d21cbc-b7b8-4671-af3f-6cf6cbaf750d", null, "Customer", "CUSTOMER" },
                    { "625ddc54-9c16-4fce-9bbe-f7059ae69c92", null, "Manager", "MANAGER" },
                    { "68423525-7949-42f5-b67d-6d608177ebb9", null, "ConsultingStaff", "CONSULTINGSTAFF" },
                    { "8990a672-84d2-444d-a35b-b4179e525e05", null, "SalesStaff", "SALESSTAFF" },
                    { "d7dee160-47fb-4afa-8478-edc338ea0181", null, "DeliveringStaff", "DELIVERINGSTAFF" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "08d21cbc-b7b8-4671-af3f-6cf6cbaf750d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "625ddc54-9c16-4fce-9bbe-f7059ae69c92");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "68423525-7949-42f5-b67d-6d608177ebb9");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8990a672-84d2-444d-a35b-b4179e525e05");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d7dee160-47fb-4afa-8478-edc338ea0181");

            migrationBuilder.DropColumn(
                name: "RatingDate",
                table: "Ratings");

            migrationBuilder.AlterColumn<int>(
                name: "Rate",
                table: "Ratings",
                type: "int",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "real");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "002d9d08-4531-413c-a02a-41ff719bc8f7", null, "DeliveringStaff", "DELIVERINGSTAFF" },
                    { "7b74099f-427d-42ed-9f8f-057e1219703d", null, "Customer", "CUSTOMER" },
                    { "8c27da1e-a056-45d0-8f36-c63433c23067", null, "Manager", "MANAGER" },
                    { "d4ae62ff-2a9a-4f58-bd30-9e21d9bbf7c4", null, "SalesStaff", "SALESSTAFF" },
                    { "e9fafde9-229e-4825-b771-2c5a182f670d", null, "ConsultingStaff", "CONSULTINGSTAFF" }
                });
        }
    }
}
