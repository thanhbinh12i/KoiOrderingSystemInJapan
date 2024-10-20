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

          
            migrationBuilder.DropColumn(
                name: "KoiBillId",
                table: "KoiBills");

            migrationBuilder.AddPrimaryKey(
                name: "PK_KoiBills",
                table: "KoiBills",
                columns: new[] { "KoiId", "BillId" });

          
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_KoiBills",
                table: "KoiBills");

          

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

          

            migrationBuilder.CreateIndex(
                name: "IX_KoiBills_KoiId",
                table: "KoiBills",
                column: "KoiId");
        }
    }
}
