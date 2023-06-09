import { rest } from "msw";

export const handlers = [
  rest.get(`https://pixabay.com/api/`, (req, res, ctx) => {
    console.log('hello')
    const query = req.url.searchParams.get('q');
    const per_page = req.url.searchParams.get('per_page');
    if (query === "flamingo" && per_page ==="200") {
      return res(
        ctx.json({
          totalHits: 500,
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
    } else {
      return res(ctx.json({
        hits: [],
        totalHits: 0
      }));
    }
  }),
];
