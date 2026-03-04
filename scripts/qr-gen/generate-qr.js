const QRCode = require("qrcode");
const fs = require("fs");
const path = require("path");

const campaigns = [
  {
    name: "sxsw2026-streams",
    url: "https://www.prosperxo.com?utm_source=wheatpaste&utm_medium=poster&utm_campaign=sxsw2026&utm_content=streams_dx1",
    description: "SXSW 2026 - Streams (DX1)",
  },
  {
    name: "sxsw2026-28billion",
    url: "https://www.prosperxo.com?utm_source=wheatpaste&utm_medium=poster&utm_campaign=sxsw2026&utm_content=28billion_dx2",
    description: "SXSW 2026 - 28 Billion (DX2)",
  },
  {
    name: "sxsw2026-algo",
    url: "https://www.prosperxo.com?utm_source=wheatpaste&utm_medium=poster&utm_campaign=sxsw2026&utm_content=algo_dx3",
    description: "SXSW 2026 - Algo (DX3)",
  },
  {
    name: "sxsw2026-future",
    url: "https://www.prosperxo.com?utm_source=wheatpaste&utm_medium=poster&utm_campaign=sxsw2026&utm_content=future_dx4",
    description: "SXSW 2026 - Future (DX4)",
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
