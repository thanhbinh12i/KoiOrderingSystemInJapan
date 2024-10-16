using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Project_SWP391.Migrations
{
    /// <inheritdoc />
    public partial class ChangTableBill : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_KoiBills",
                table: "KoiBills");

            migrationBuilder.DropIndex(
                name: "IX_KoiBills_KoiId",
                table: "KoiBills");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2b10d3cb-c1ea-4fc9-a058-b8d2c97d84e9");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4a0a69f7-5ee6-40d0-8cc1-2328be2a9cbc");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "54d792e3-a48a-46eb-9309-3b917e288b9b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7a87051a-adbd-49a5-ab15-c720b11edf85");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "87f0bc67-4012-429d-90e0-ea7f6752fa1a");

            migrationBuilder.DropColumn(
                name: "KoiBillId",
                table: "KoiBills");

            migrationBuilder.AddPrimaryKey(
                name: "PK_KoiBills",
                table: "KoiBills",
                columns: new[] { "KoiId", "BillId" });

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
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_KoiBills",
                table: "KoiBills");

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

            migrationBuilder.AddColumn<int>(
                name: "KoiBillId",
                table: "KoiBills",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_KoiBills",
                table: "KoiBills",
                column: "KoiBillId");

            migrationBuilder.CreateTable(
                name: "VNPay",
                columns: table => new
                {
                    VNPayId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    vnp_Amount = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    vnp_BankCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    vnp_OrderInfo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    vnp_PayDate = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    vnp_ResponseCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    vnp_SecureHash = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    vnp_TmnCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    vnp_TransactionNo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    vnp_TxnRef = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VNPay", x => x.VNPayId);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "2b10d3cb-c1ea-4fc9-a058-b8d2c97d84e9", null, "Manager", "MANAGER" },
                    { "4a0a69f7-5ee6-40d0-8cc1-2328be2a9cbc", null, "ConsultingStaff", "CONSULTINGSTAFF" },
                    { "54d792e3-a48a-46eb-9309-3b917e288b9b", null, "Customer", "CUSTOMER" },
                    { "7a87051a-adbd-49a5-ab15-c720b11edf85", null, "DeliveringStaff", "DELIVERINGSTAFF" },
                    { "87f0bc67-4012-429d-90e0-ea7f6752fa1a", null, "SalesStaff", "SALESSTAFF" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_KoiBills_KoiId",
                table: "KoiBills",
                column: "KoiId");
        }
    }
}
