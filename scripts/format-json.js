#!/usr/bin/env node

/**
 * JSON Formatter for FlintBenchmark
 * Uses FracturedJson to produce human-readable, compact JSON output.
 * Small arrays/objects are inlined, larger ones are expanded.
 * 
 * Usage:
 *   node scripts/format-json.js          # Format all JSON files in tests/
 *   node scripts/format-json.js --check  # Check if files are formatted (for CI)
 */

const fs = require('fs');
const path = require('path');
const { Formatter } = require('fracturedjsonjs');

const TESTS_DIR = path.join(__dirname, '..', 'tests');

// FracturedJson configuration for optimal readability
const formatter = new Formatter();
formatter.MaxTotalLineLength = 100;           // Max line length before wrapping
formatter.MaxInlineLength = 60;               // Max length for inline arrays/objects
formatter.MaxInlineComplexity = 2;            // Max nesting for inline elements
formatter.MaxCompactArrayComplexity = 1;      // Compact simple arrays
formatter.NestedBracketPadding = false;       // No extra spaces in nested brackets
formatter.SimpleBracketPadding = true;        // Spaces in simple brackets like [1, 2, 3]
formatter.ColonPadding = true;                // Space after colons
formatter.CommaPadding = true;                // Space after commas
formatter.IndentSpaces = 2;                   // 2-space indentation
formatter.PreferMultipleItemsPerLine = true;  // Multiple items per line when possible
formatter.TableObjectMinimumSimilarity = 0.5; // Align similar objects in tables
formatter.TableArrayMinimumSimilarity = 0.5;  // Align similar arrays in tables

/**
 * Find all JSON files recursively in a directory
 */
function findJsonFiles(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...findJsonFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.json')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

/**
 * Format a single JSON file
 * Returns true if file was modified (or would be modified in check mode)
 */
function formatFile(filePath, checkOnly = false) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  let parsed;
  try {
    parsed = JSON.parse(content);
  } catch (e) {
    console.error(`❌ Invalid JSON: ${filePath}`);
    console.error(`   ${e.message}`);
    return { error: true, changed: false };
  }
  
  const formatted = formatter.Serialize(parsed) + '\n';
  
  if (content === formatted) {
    return { error: false, changed: false };
  }
  
  if (checkOnly) {
    return { error: false, changed: true };
  }
  
  fs.writeFileSync(filePath, formatted, 'utf8');
  return { error: false, changed: true };
}

// Main execution
const args = process.argv.slice(2);
const checkOnly = args.includes('--check');

console.log(checkOnly ? '🔍 Checking JSON formatting...' : '✨ Formatting JSON files...');
console.log();

const jsonFiles = findJsonFiles(TESTS_DIR);
let hasErrors = false;
let changedCount = 0;

for (const file of jsonFiles) {
  const relativePath = path.relative(path.join(__dirname, '..'), file);
  const result = formatFile(file, checkOnly);
  
  if (result.error) {
    hasErrors = true;
  } else if (result.changed) {
    changedCount++;
    if (checkOnly) {
      console.log(`❌ ${relativePath} (needs formatting)`);
    } else {
      console.log(`✅ ${relativePath}`);
    }
  }
}

console.log();

if (hasErrors) {
  console.log('❌ Some files contain invalid JSON');
  process.exit(1);
}

if (checkOnly) {
  if (changedCount > 0) {
    console.log(`❌ ${changedCount} file(s) need formatting. Run 'npm run format' to fix.`);
    process.exit(1);
  } else {
    console.log(`✅ All ${jsonFiles.length} JSON files are properly formatted.`);
  }
} else {
  if (changedCount > 0) {
    console.log(`✅ Formatted ${changedCount} file(s).`);
  } else {
    console.log(`✅ All ${jsonFiles.length} JSON files were already formatted.`);
  }
}
