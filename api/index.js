export const config = {
  runtime: "edge",
};

export default async function handler(req) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const feedUrl = "https://jordansadie.substack.com/feed";
      const response = await fetch(feedUrl);
      const text = await response.text();

      const payload = {
        jsonrpc: "2.0",
        id: "1",
        result: {
          source: "Substack",
          feed: feedUrl,
          content: text,
        },
      };

      controller.enqueue(
        encoder.encode(`data: ${JSON.stringify(payload)}\n\n`)
      );

      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
