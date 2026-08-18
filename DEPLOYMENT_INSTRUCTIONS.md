# Deploy The Candid Professional to Vercel

Your satirical profile generator is ready to deploy. Here's how:

## Option 1: Deploy via GitHub (Recommended)

1. **Create a GitHub repo** (or use an existing one):
   - Go to github.com/new
   - Name it `candid-professional`
   - Click "Create repository"

2. **Upload these files to your repo:**
   - `index.html` (root)
   - `api/generate-profile.js` (in api/ folder)
   - `package.json` (root)

3. **Connect to Vercel:**
   - Go to vercel.com/new
   - Select your GitHub account
   - Import the `candid-professional` repo
   - Click "Import"

4. **Add Environment Variable:**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add: `ANTHROPIC_API_KEY` = your Anthropic API key
   - Click "Save"

5. **Deploy:**
   - Vercel will auto-deploy when you push to GitHub
   - Your app is live at `candid-professional.vercel.app`

## Option 2: Deploy via Vercel CLI

```bash
npm install -g vercel
cd vercel-deploy
vercel
```

Then:
- Accept the prompts to create a new project
- When asked for environment variables, add: `ANTHROPIC_API_KEY=[your-api-key]`

## Getting Your Anthropic API Key

1. Go to console.anthropic.com
2. Click "API Keys" in the left sidebar
3. Create a new key
4. Copy it to your clipboard

## That's It!

Once deployed, share the URL with friends:
- It works on mobile and desktop
- No backend required (Vercel serverless handles the Claude API calls)
- API key is secure (never exposed to the browser)

## Troubleshooting

**"API configuration error"** → Make sure `ANTHROPIC_API_KEY` is set in Vercel environment variables

**"Failed to fetch"** → Check that your API key is valid and has proper permissions

**Questions?** → Check Vercel docs or reach out!
