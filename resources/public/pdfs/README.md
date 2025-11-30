# PDF Resources

Store your PDF files here. They will be served via GitHub's raw file URLs, which uses GitHub's CDN instead of Vercel bandwidth.

## Setup

1. Add your PDF files to this directory (`public/pdfs/`)
2. Commit and push them to your GitHub repository
3. In `resources/data/resources.ts`, use the `pdfUrl()` helper function:

```typescript
import { pdfUrl } from "../lib/github-raw";

// In your resource items:
{
  title: "Document Name",
  description: "Description of the document",
  url: pdfUrl("filename.pdf"), // Assumes file is at public/pdfs/filename.pdf
}
```

## GitHub Raw URL Format

The URLs will be in the format:
```
https://raw.githubusercontent.com/username/repo/branch/public/pdfs/filename.pdf
```

## Configuration

Set your GitHub repository in one of these ways:

1. **Environment variable** (recommended): Add to `.env.local`:
   ```
   NEXT_PUBLIC_GITHUB_REPO=your-username/your-repo
   ```

2. **Direct in code**: Update `resources/lib/github-raw.ts` and set the default `repo` parameter

## Benefits

- ✅ No Vercel bandwidth usage
- ✅ No external services required
- ✅ Files versioned with your code
- ✅ GitHub's CDN handles delivery
- ✅ Simple setup - just commit files

## File Size Limits

GitHub has a 100MB file size limit per file. For larger files, consider:
- Splitting into multiple parts
- Using Git LFS (Large File Storage) - but this still uses Vercel bandwidth when served
- Linking to original sources if available

