export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const zodiac = searchParams.get("zodiac");

  const result = await fetch(`https://api.api-ninjas.com/v1/horoscope?zodiac=${zodiac}`, {
    headers: { "X-Api-Key": process.env.NINJA_API_KEY! }
  });
  const data = await result.json();
  return Response.json(data);
}