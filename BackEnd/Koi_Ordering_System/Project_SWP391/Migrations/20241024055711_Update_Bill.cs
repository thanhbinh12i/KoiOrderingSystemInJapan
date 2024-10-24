using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Project_SWP391.Migrations
{
    /// <inheritdoc />
    public partial class Update_Bill : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BillDetails");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "305c89dc-8a78-4580-88a4-8a88735440b3");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3cb4e351-ff7d-4086-a318-3c412f9820e7");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "57100a18-8304-4feb-acfc-7a2f63733f67");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "68e6cebd-f42f-435a-a8a8-f54f3e851a84");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c38ff5a3-962d-436b-ba3a-9502a5f36096");

            migrationBuilder.RenameColumn(
                name: "Price",
                table: "Bills",
                newName: "TourPrice");

            migrationBuilder.AddColumn<float>(
                name: "KoiPrice",
                table: "Bills",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PaymentDate",
                table: "Bills",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<float>(
                name: "TotalPrice",
                table: "Bills",
                type: "real",
                nullable: true);

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropColumn(
                name: "KoiPrice",
                table: "Bills");

            migrationBuilder.DropColumn(
                name: "PaymentDate",
                table: "Bills");

            migrationBuilder.DropColumn(
                name: "TotalPrice",
                table: "Bills");

            migrationBuilder.RenameColumn(
                name: "TourPrice",
                table: "Bills",
                newName: "Price");

            migrationBuilder.CreateTable(
                name: "BillDetails",
                columns: table => new
                {
                    BillDetailId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BillId = table.Column<int>(type: "int", nullable: false),
                    ArriveDate = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BookBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DeliveryEstimateDate = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DepartDate = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TotalPrice = table.Column<float>(type: "real", nullable: false),
                    TourName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BillDetails", x => x.BillDetailId);
                    table.ForeignKey(
                        name: "FK_BillDetails_Bills_BillId",
                        column: x => x.BillId,
                        principalTable: "Bills",
                        principalColumn: "BillId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "305c89dc-8a78-4580-88a4-8a88735440b3", null, "SalesStaff", "SALESSTAFF" },
                    { "3cb4e351-ff7d-4086-a318-3c412f9820e7", null, "Customer", "CUSTOMER" },
                    { "57100a18-8304-4feb-acfc-7a2f63733f67", null, "DeliveringStaff", "DELIVERINGSTAFF" },
                    { "68e6cebd-f42f-435a-a8a8-f54f3e851a84", null, "ConsultingStaff", "CONSULTINGSTAFF" },
                    { "c38ff5a3-962d-436b-ba3a-9502a5f36096", null, "Manager", "MANAGER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_BillDetails_BillId",
                table: "BillDetails",
                column: "BillId",
                unique: true);
        }
    }
}
