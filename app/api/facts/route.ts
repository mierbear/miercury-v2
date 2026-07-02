export async function GET() {
  const result = await fetch("https://api.api-ninjas.com/v1/facts", {
    headers: { "X-Api-Key": process.env.NINJA_API_KEY! }
  });
  const data = await result.json();
  return Response.json(data);
}