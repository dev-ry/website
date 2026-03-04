const QRCode = require("qrcode");
const fs = require("fs");
const path = require("path");

const campaigns = [
  {
    name: "sxsw2026-wheatpaste",
    url: "https://www.prosperxo.com?utm_source=wheatpaste&utm_medium=poster&utm_campaign=sxsw2026",
    description: "SXSW 2026 Wheatpaste Poster",
  },
];

const outputDir = path.join(__dirname, "../../assets/graphics/qr-codes");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function generateQRs() {
  console.log("🚀 Generating QR codes...");

  for (const campaign of campaigns) {
    const outputPath = path.join(outputDir, `${campaign.name}.png`);

    try {
      await QRCode.toFile(outputPath, campaign.url, {
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
        width: 1024,
        margin: 2,
        errorCorrectionLevel: "H",
      });
      console.log(`✅ Generated: ${campaign.name} -> ${outputPath}`);
    } catch (err) {
      console.error(`❌ Error generating ${campaign.name}:`, err);
    }
  }

  console.log("✨ All QR codes generated successfully.");
}

generateQRs();
