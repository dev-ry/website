# QR Code Generator

This utility allows the Prosper XO team to generate custom QR codes with UTM parameters for marketing campaigns.

## Prerequisites

- **Node.js**: (Version 14 or higher recommended)
- **NPM**: (Usually comes with Node.js)

## Setup

Ensure you have installed the project dependencies:

```bash
npm install
```

## How to use

1.  **Open the Config**: Open `scripts/qr-gen/generate-qr.js`.
2.  **Add a Campaign**: Add a new object to the `campaigns` array:
    ```javascript
    {
      name: 'your-campaign-name',
      url: 'https://www.prosperxo.com?utm_source=...',
      description: 'Your Campaign Description'
    }
    ```
3.  **Run the Generator**: Execute the script from the root of the project:
    ```bash
    node scripts/qr-gen/generate-qr.js
    ```

## Output

Generated QR codes are saved as 1024x1024 PNG files in:
`assets/graphics/qr-codes/`

## Configuration

The generator uses the following settings by default:

- **Width**: 1024px
- **Error Correction**: Level H (High) - optimized for physical print environments where the code might get slightly damaged or dirty.
- **Margin**: 2 blocks.
- **Colors**: Black on White.

## Deployment

After generating new codes, remember to commit and push them to GitHub to make them available on the website:

```bash
git add .
git commit -m "feat: add QR codes for [Campaign Name]"
git push origin main
```
