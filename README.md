# Solar City Website

A modern, responsive website for Solar City, built with Next.js, Chakra UI, and Supabase.

## Features

- Responsive design with mobile-first approach
- Interactive solar quotation calculator
- Contact form with Supabase integration
- Animated UI components
- SEO optimized
- Accessible design

## Tech Stack

- Next.js 14
- Chakra UI
- Tailwind CSS
- Framer Motion
- Supabase
- TypeScript

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/solar-city-website.git
cd solar-city-website
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
solar-city-website/
├── src/
│   ├── app/
│   │   └── page.tsx
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── QuotationMaker.tsx
│   │   ├── Contact.tsx
│   │   ├── Card.tsx
│   │   ├── PrimaryButton.tsx
│   │   └── Layout.tsx
│   └── theme/
│       └── theme.ts
├── public/
├── .env.local
└── package.json
```

## Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Create a `contacts` table with the following schema:
```sql
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);
```

3. Copy your project URL and anon key to `.env.local`

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

The site is configured for deployment on Vercel:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add your environment variables
4. Deploy

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - see LICENSE file for details
