# Auctioneer

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install the dependencies and libraries. You can use any package managers but for this, we're using `npm`:

```

npm install


```

Then, generate the Prisma Client using the defined models and relationships in `prisma/schema.prisma`:

```

npx prisma generate


```

Finally, run the development server:

```

npm run dev


```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Compiling and Running the build

First, compile the Next project by running:

```

npm run build


```

Then run the build:

```

npm start


```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

The Auctioneer project is connected to Github and was imported to Vercel. Deployment is done by pushing to the `main` branch and the change in the source files will trigger a re-build in Vercel.

## Live Project

Check it out at [auctioneer-pi.vercel.app](https://auctioneer-pi.vercel.app/)

## Technologies Used

- Fullstack Framework - NextJS 13
- Styling - Tailwind
- ORM - Prisma
- Authentication - Next-auth
- Database - MySQL
- Serverless Platform - Planetscale
- Web Hosting Service - Vercel
