using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Project_SWP391.Migrations
{
    /// <inheritdoc />
    public partial class AddDBSet : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FarmImage_KoiFarms_FarmId",
                table: "FarmImage");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FarmImage",
                table: "FarmImage");

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

            migrationBuilder.RenameTable(
                name: "FarmImage",
                newName: "FarmImages");

            migrationBuilder.RenameIndex(
                name: "IX_FarmImage_FarmId",
                table: "FarmImages",
                newName: "IX_FarmImages_FarmId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_FarmImages",
                table: "FarmImages",
                column: "ImageId");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "2f5b708f-10ee-42f8-ae18-52f0531ced1b", null, "ConsultingStaff", "CONSULTINGSTAFF" },
                    { "30828656-15c0-4e41-a834-1b3e87b90ba0", null, "Manager", "MANAGER" },
                    { "4436cc78-9917-4f87-92e4-35e035079f14", null, "SalesStaff", "SALESSTAFF" },
                    { "4cf54f29-e05d-45c3-a216-6226b7c471ea", null, "DeliveringStaff", "DELIVERINGSTAFF" },
                    { "a9a12911-25e3-45b5-86bb-6a6cac695a75", null, "Customer", "CUSTOMER" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_FarmImages_KoiFarms_FarmId",
                table: "FarmImages",
                column: "FarmId",
                principalTable: "KoiFarms",
                principalColumn: "FarmId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FarmImages_KoiFarms_FarmId",
                table: "FarmImages");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FarmImages",
                table: "FarmImages");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2f5b708f-10ee-42f8-ae18-52f0531ced1b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "30828656-15c0-4e41-a834-1b3e87b90ba0");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4436cc78-9917-4f87-92e4-35e035079f14");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4cf54f29-e05d-45c3-a216-6226b7c471ea");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a9a12911-25e3-45b5-86bb-6a6cac695a75");

            migrationBuilder.RenameTable(
                name: "FarmImages",
                newName: "FarmImage");

            migrationBuilder.RenameIndex(
                name: "IX_FarmImages_FarmId",
                table: "FarmImage",
                newName: "IX_FarmImage_FarmId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_FarmImage",
                table: "FarmImage",
                column: "ImageId");

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

            migrationBuilder.AddForeignKey(
                name: "FK_FarmImage_KoiFarms_FarmId",
                table: "FarmImage",
                column: "FarmId",
                principalTable: "KoiFarms",
                principalColumn: "FarmId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
