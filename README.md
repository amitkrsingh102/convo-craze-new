# Convo Craze

Convo Craze is a real-time chat application built with Next.js and React, utilizing MongoDB as the database, Prisma ORM for database interactions, NextAuth for authentication, and Pusher for real-time chat functionality. Additionally, the application utilizes Cloudinary for image storage and is hosted on Vercel.

## Features

-   Real-time chat functionality powered by Pusher.
-   User authentication and authorization provided by NextAuth.
-   Secure database interactions using Prisma ORM.
-   Image storage and management with Cloudinary.
-   Hosted on Vercel for easy deployment and scalability.

## Technologies Used

-   Next.js
-   React
-   TypeScript
-   MongoDB
-   Prisma ORM
-   NextAuth
-   Pusher
-   Cloudinary
-   Vercel

## Getting Started

To run the Convo Craze application locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/amitkrsingh102/convo-craze-new
```

2. Navigate to the project directory:

```bash
cd convo-craze
```

3. Install dependencies:

```bash
npm install
```

4. Set up environment variables:

Create a `.env` file in the root directory and add the following environment variables:

```sql
DATABASE_URL=""
NEXTAUTH_SECRET=""

GITHUB_ID=
GITHUB_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=

PUSHER_APP_ID=
PUSHER_APP_SECRET=
NEXT_PUBLIC_PUSHER_APP_KEY=
```

5. Start the development server:

```bash
npm  run  dev
# or
yarn  dev
# or
pnpm  dev
# or
bun  dev
```

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

-   Next.js: https://nextjs.org/
-   React: https://reactjs.org/
-   TypeScript: https://www.typescriptlang.org/
-   MongoDB: https://www.mongodb.com/
-   Prisma ORM: https://www.prisma.io/
-   NextAuth: https://next-auth.js.org/
-   Pusher: https://pusher.com/
-   Cloudinary: https://cloudinary.com/
-   Vercel: https://vercel.com/
