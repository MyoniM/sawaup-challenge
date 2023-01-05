This is a repo for Sawaup Senior Fullstack - Challenge

Deployed URL: https://sawaup-challenge-bh4k.vercel.app/

The project is build using:
- Clean Architecture
- NextJs
- Typescript
- Prisma ORM
- PostgeSql

You can find documentaion here: https://sawaup-challenge-bh4k.vercel.app/docs/api-docs

Here is the light house metric for the app:
![sawa light house report](https://user-images.githubusercontent.com/61096394/210861062-cc30dee8-1e40-45c8-97f5-34616ebaffe1.PNG)

- Since the app is small, I used react-query instead of state management packages(I did not implement optimistic updates. Doing so would have improved the user experience. I didnt have time).
- I created a component that makes YouTube embeds lighter, lazily loaded, and styled to match the rest of the site.
- I did not stress on the responsiveness since it was not stated in the challenge docs.
- Didnt implement tests b/c of time.

If you clone and run the project locally:
- sawa.postman_collection.json is a Postman collection. It has all the endpoints.
- Update the DATABASE_URL's value inside .env file.  If you use a cloud-hosted database for development, you need SHADOW_DATABASE_URL. Here is a link https://www.prisma.io/docs/concepts/components/prisma-migrate/shadow-database#cloud-hosted-shadow-databases-must-be-created-manually\
- Run database migration using the command ```npx prisma migrate dev --schema=./src/prisma/schema.prisma```
- Generate types for prisma and reload IDE ```npx prisma generate --schema=./src/prisma/schema.prisma```
- Seed the data inside the excel file to database with the command ```npx prisma db seed```. Make sure you have ts-node globally installed.

Thanks.
