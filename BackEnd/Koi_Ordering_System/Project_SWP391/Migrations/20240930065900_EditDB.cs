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
            migrationBuilder.DropForeignKey(
                name: "FK_Bills_DeliveryStatuses_DeliveryStatusDeliveryId",
                table: "Bills");

            migrationBuilder.DropForeignKey(
                name: "FK_FarmImage_KoiFarms_KoiFarmFarmId",
                table: "FarmImage");

            migrationBuilder.DropForeignKey(
                name: "FK_Kois_KoiFarms_KoiFarmFarmId",
                table: "Kois");

            migrationBuilder.DropForeignKey(
                name: "FK_Kois_KoiVarieties_KoiVarietyVarietyId",
                table: "Kois");

            migrationBuilder.DropIndex(
                name: "IX_Kois_KoiFarmFarmId",
                table: "Kois");

            migrationBuilder.DropIndex(
                name: "IX_Kois_KoiVarietyVarietyId",
                table: "Kois");

            migrationBuilder.DropIndex(
                name: "IX_FarmImage_KoiFarmFarmId",
                table: "FarmImage");

            migrationBuilder.DropIndex(
                name: "IX_Bills_DeliveryStatusDeliveryId",
                table: "Bills");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1c108ba2-626f-4e45-8d7a-ca3681a6b9d5");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "47f07066-4f14-409d-a22c-dbbcc73e6aaa");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5c0cbe60-42a5-4e93-b30f-290b06e4c995");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "729f4d8d-e0f8-470f-bec0-4015c6d8f5a1");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e38e2cea-bbf0-45e3-8b2d-9edf4602251e");

            migrationBuilder.DropColumn(
                name: "KoiFarmFarmId",
                table: "Kois");

            migrationBuilder.DropColumn(
                name: "KoiVarietyVarietyId",
                table: "Kois");

            migrationBuilder.DropColumn(
                name: "KoiFarmFarmId",
                table: "FarmImage");

            migrationBuilder.DropColumn(
                name: "DeliveryStatusDeliveryId",
                table: "Bills");

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

            migrationBuilder.CreateIndex(
                name: "IX_Kois_FarmId",
                table: "Kois",
                column: "FarmId");

            migrationBuilder.CreateIndex(
                name: "IX_Kois_VarietyId",
                table: "Kois",
                column: "VarietyId");

            migrationBuilder.CreateIndex(
                name: "IX_FarmImage_FarmId",
                table: "FarmImage",
                column: "FarmId");

            migrationBuilder.CreateIndex(
                name: "IX_Bills_DeliveryId",
                table: "Bills",
                column: "DeliveryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bills_DeliveryStatuses_DeliveryId",
                table: "Bills",
                column: "DeliveryId",
                principalTable: "DeliveryStatuses",
                principalColumn: "DeliveryId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_FarmImage_KoiFarms_FarmId",
                table: "FarmImage",
                column: "FarmId",
                principalTable: "KoiFarms",
                principalColumn: "FarmId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Kois_KoiFarms_FarmId",
                table: "Kois",
                column: "FarmId",
                principalTable: "KoiFarms",
                principalColumn: "FarmId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Kois_KoiVarieties_VarietyId",
                table: "Kois",
                column: "VarietyId",
                principalTable: "KoiVarieties",
                principalColumn: "VarietyId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bills_DeliveryStatuses_DeliveryId",
                table: "Bills");

            migrationBuilder.DropForeignKey(
                name: "FK_FarmImage_KoiFarms_FarmId",
                table: "FarmImage");

            migrationBuilder.DropForeignKey(
                name: "FK_Kois_KoiFarms_FarmId",
                table: "Kois");

            migrationBuilder.DropForeignKey(
                name: "FK_Kois_KoiVarieties_VarietyId",
                table: "Kois");

            migrationBuilder.DropIndex(
                name: "IX_Kois_FarmId",
                table: "Kois");

            migrationBuilder.DropIndex(
                name: "IX_Kois_VarietyId",
                table: "Kois");

            migrationBuilder.DropIndex(
                name: "IX_FarmImage_FarmId",
                table: "FarmImage");

            migrationBuilder.DropIndex(
                name: "IX_Bills_DeliveryId",
                table: "Bills");

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

            migrationBuilder.AddColumn<int>(
                name: "KoiFarmFarmId",
                table: "Kois",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "KoiVarietyVarietyId",
                table: "Kois",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "KoiFarmFarmId",
                table: "FarmImage",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "DeliveryStatusDeliveryId",
                table: "Bills",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1c108ba2-626f-4e45-8d7a-ca3681a6b9d5", null, "ConsultingStaff", "CONSULTINGSTAFF" },
                    { "47f07066-4f14-409d-a22c-dbbcc73e6aaa", null, "SalesStaff", "SALESSTAFF" },
                    { "5c0cbe60-42a5-4e93-b30f-290b06e4c995", null, "Manager", "MANAGER" },
                    { "729f4d8d-e0f8-470f-bec0-4015c6d8f5a1", null, "DeliveringStaff", "DELIVERINGSTAFF" },
                    { "e38e2cea-bbf0-45e3-8b2d-9edf4602251e", null, "Customer", "CUSTOMER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Kois_KoiFarmFarmId",
                table: "Kois",
                column: "KoiFarmFarmId");

            migrationBuilder.CreateIndex(
                name: "IX_Kois_KoiVarietyVarietyId",
                table: "Kois",
                column: "KoiVarietyVarietyId");

            migrationBuilder.CreateIndex(
                name: "IX_FarmImage_KoiFarmFarmId",
                table: "FarmImage",
                column: "KoiFarmFarmId");

            migrationBuilder.CreateIndex(
                name: "IX_Bills_DeliveryStatusDeliveryId",
                table: "Bills",
                column: "DeliveryStatusDeliveryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bills_DeliveryStatuses_DeliveryStatusDeliveryId",
                table: "Bills",
                column: "DeliveryStatusDeliveryId",
                principalTable: "DeliveryStatuses",
                principalColumn: "DeliveryId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_FarmImage_KoiFarms_KoiFarmFarmId",
                table: "FarmImage",
                column: "KoiFarmFarmId",
                principalTable: "KoiFarms",
                principalColumn: "FarmId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Kois_KoiFarms_KoiFarmFarmId",
                table: "Kois",
                column: "KoiFarmFarmId",
                principalTable: "KoiFarms",
                principalColumn: "FarmId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Kois_KoiVarieties_KoiVarietyVarietyId",
                table: "Kois",
                column: "KoiVarietyVarietyId",
                principalTable: "KoiVarieties",
                principalColumn: "VarietyId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
