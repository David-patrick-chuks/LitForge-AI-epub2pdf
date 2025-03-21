# LitForgeAI-EPUB2PDF

A TypeScript tool to convert multiple EPUB files to PDF format efficiently. The tool supports batch processing, automatic skipping of already converted files, and API key management via environment variables.

## Features

- **Batch conversion:** Converts all EPUB files in a folder at once  
- **Smart skipping:** Skips files that have already been converted to save time  
- **Secure API key management:** Uses `.env` file for API key storage  
- **Automatic folder creation:** Ensures input and output directories exist  
- **Error handling:** Provides clear logs in case of conversion failures  

## Installation

1. Make sure you have **Node.js** installed on your system.  
2. Clone or download this repository.  
3. Install dependencies using:  
   ```sh
   yarn install
   ```
   or  
   ```sh
   npm install
   ```

## Setup

1. Create a `.env` file in the project root and add your ConvertAPI key:
   ```env
   CONVERTAPI_KEY=your_secret_key_here
   ```
2. Place all your EPUB files inside the `epub-files/` folder.

## How to Use

Run the script with:
```sh
yarn start
```
or
```sh
npm run start
```

## Folder Structure

```
📚 project-root/
 ├── 📚 epub-files/       # Input folder (place EPUB files here)
 ├── 📚 output/          # Output folder (converted PDFs will be saved here)
 ├── 📄 .env             # Stores API key
 ├── 📂 src/             # Source code directory
 │   ├── 📄 index.ts     # Entry point
 │   ├── 📄 convert.ts   # Conversion logic
 │   ├── 📄 index.d.ts   # Type definitions
 ├── 📂 dist/            # Compiled TypeScript output
 ├── 📄 package.json     # Dependencies and metadata
 ├── 📄 tsconfig.json    # TypeScript configuration
 └── 📄 README.md        # Project documentation
```

## Example Output

```
👑 Found 10 EPUB file(s) to convert...
🔄 Converting: book1.epub → book1.pdf
✅ Converted: book1.epub → book1.pdf
⏩ Skipping (Already Exists): book2.epub
🎉 All EPUB files have been processed!
```

## Notes

- If a PDF file **already exists**, the script **skips** that EPUB to prevent redundant conversions.  
- You can convert **multiple EPUBs** in a single run.  
- Ensure your **ConvertAPI key** allows enough daily requests.  

## License

This project is open-source under the MIT License.
