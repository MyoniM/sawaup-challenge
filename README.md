This is a repo for Sawaup Senior Fullstack - Challenge

Deployed URL: https://sawaup-challenge-bh4k.vercel.app/

The project is build using:
- NextJs
- Prisma ORM
- PostgeSql

You can find documentaion here: https://sawaup-challenge-bh4k.vercel.app/docs/api-docs

Here is the light house metric for the app:
![sawa light house report](https://user-images.githubusercontent.com/61096394/210861062-cc30dee8-1e40-45c8-97f5-34616ebaffe1.PNG)

- Since the app is small, I used react-query instead of state management packages(I did not implement optimistic updates. Doing so would have improved the user experience. I didnt have time).
- I created a component that makes YouTube embeds lighter, lazily loaded, and styled to match the rest of the site.
- I did not stress on the responsiveness since it was not stated in the challenge docs.
- Didnt implement tests b/c of time.

