import { rest } from "msw";

export const handlers = [
  rest.get(`https://pixabay.com/api/`, (req, res, ctx) => {
    const query = req.url.searchParams.get("q");
    if (query === "flamingo") {
      return res(
        ctx.json({
          hits: [
            { id: 1, previewURL: "https://example.com/image1.jpg" },
            { id: 2, previewURL: "https://example.com/image2.jpg" },
          ],
        })
      );
    } else {
      return res(ctx.status(500), ctx.json({ error: "Internal Server Error" }));
    }
  }),
];
