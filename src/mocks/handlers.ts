import { rest } from "msw";

export const handlers = [
  rest.get(`https://pixabay.com/api/`, (req, res, ctx) => {
    const query = req.url.searchParams.get("q");
    if (query === "example") {
      return res(
        ctx.json({
          totalHits: 6,
          hits: [
            {
              id: 1,
              user: "user1",
              views: 10000,
              webformatURL: "https://example.com/image1.jpg",
            },
            {
              id: 2,
              user: "user2",
              views: 15,
              webformatURL: "https://example.com/image2.jpg",
            },
          ],
        })
      );
    }
  }),
  rest.get(`https://pixabay.com/api/`, (req, res, ctx) => {
    const query = req.url.searchParams.get("q");
    if (query === "jjjjjjj") {
      return res(
        ctx.json({
          totalHits: 0,
          hits: [],
        })
      );
    }
  }),
  rest.get(`https://pixabay.com/api/`, (req, res, ctx) => {
    const query = req.url.searchParams.get("q");
    if (query === "hello") {
      return res(ctx.status(500), ctx.json({ error: "Internal Server Error" }));
    }
  }),
];
