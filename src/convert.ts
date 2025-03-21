import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";
import convertapi from "convertapi";

dotenv.config(); // Load environment variables

const API_KEY = process.env.CONVERTAPI_KEY;
if (!API_KEY) {
    console.error("❌ CONVERTAPI_KEY is missing from .env file");
    process.exit(1);
}

const convertApiInstance = new convertapi(API_KEY);

// Define input and output directories
const INPUT_FOLDER: string = path.join(__dirname, "../epub-files");
const OUTPUT_FOLDER: string = path.join(__dirname, "../output");

// Ensure the output folder exists
if (!fs.existsSync(OUTPUT_FOLDER)) {
    fs.mkdirSync(OUTPUT_FOLDER, { recursive: true });
}

/**
 * Gets all EPUB files from the input directory.
 * @returns {string[]} List of EPUB filenames.
 */
export function getEpubFiles(): string[] {
    return fs.readdirSync(INPUT_FOLDER).filter((file: string) => file.endsWith(".epub"));
}

/**
 * Converts an EPUB file to PDF if it hasn't been converted yet.
 * @param {string} epubFile - The EPUB filename.
 */
export async function convertEpubToPdf(epubFile: string): Promise<void> {
    const inputPath: string = path.join(INPUT_FOLDER, epubFile);
    const outputPath: string = path.join(OUTPUT_FOLDER, epubFile.replace(".epub", ".pdf"));

    // Skip if the PDF already exists
    if (fs.existsSync(outputPath)) {
        console.log(`⏩ Skipping (Already Exists): ${epubFile}`);
        return;
    }

    try {
        console.log(`🔄 Converting: ${epubFile} → ${outputPath}`);
        const result = await convertApiInstance.convert("pdf", { File: inputPath }, "epub");
        await result.saveFiles(outputPath);
        console.log(`✅ Converted: ${epubFile} → ${outputPath}`);
    } catch (error) {
        console.error(`❌ Error converting ${epubFile}:`, error);
    }
}

/**
 * Processes all EPUB files in the input folder.
 * Converts only files that have not been converted before.
 */
export async function processAllEpubFiles(): Promise<void> {
    const epubFiles: string[] = getEpubFiles();

    if (epubFiles.length === 0) {
        console.log("📂 No EPUB files found in the input folder.");
        return;
    }

    console.log(`📑 Found ${epubFiles.length} EPUB file(s) to convert...`);

    for (const epubFile of epubFiles) {
        await convertEpubToPdf(epubFile);
    }

    console.log("🎉 All EPUB files have been processed!");
}
