export async function GET() {
    console.log("TEST LOG - This should appear in server logs");
    return new Response("Check your server logs");
  }