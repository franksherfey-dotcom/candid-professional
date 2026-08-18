export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { profileText } = req.body;

  if (!profileText || profileText.trim().length === 0) {
    return res.status(400).json({ error: 'Profile text is required' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('ANTHROPIC_API_KEY not configured');
    return res.status(500).json({ error: 'API configuration error' });
  }

  const systemPrompt = `You are a masterful satirical professional profile writer. Your job is to transform a real LinkedIn profile into a hilarious, candid version that:

1. Keeps all factual information (company names, dates, titles, locations)
2. Exaggerates corporate buzzwords and corporate-speak
3. Reveals the gap between polished LinkedIn claims and reality
4. Includes sarcastic "translations" of achievements that sound impressive but are actually mundane
5. Pokes fun at the performative nature of LinkedIn itself
6. Makes fun of the SYSTEM, not the person—be mean to corporate culture, not to people
7. Uses phrases like "Translation:", "By which I mean:", "What this really means:"
8. Maintains a tone that's sharp but ultimately good-natured
9. Highlights any repetitive themes, buzzwords, or exaggerations in the original
10. Includes comedic asterisks and footnotes where appropriate

The output should look like a real LinkedIn profile but read like candid satire. Include sections for: Headline, About, Experience, Skills, Notes.

Make it FUNNY. Make someone laugh at recognizing themselves without feeling genuinely hurt. The humor is on the SYSTEM, not the person.`;

  const userPrompt = `Here's a LinkedIn profile to transform into a satirical professional profile:

${profileText}

Create a candid version of this profile that keeps the factual details but adds sarcastic commentary, funny "translations," and highlights the absurdities of corporate culture. Format it as a readable profile with clear sections.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 2000,
        messages: [
          {
            role: 'user',
            content: userPrompt,
          },
        ],
        system: systemPrompt,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Claude API error:', errorData);
      return res.status(response.status).json({
        error: `Claude API error: ${errorData.error?.message || 'Unknown error'}`,
      });
    }

    const data = await response.json();
    const generatedProfile = data.content[0].text;

    return res.status(200).json({
      success: true,
      profile: generatedProfile,
    });
  } catch (error) {
    console.error('Error calling Claude API:', error);
    return res.status(500).json({
      error: `Error generating profile: ${error.message}`,
    });
  }
}
