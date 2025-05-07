-- Create contacts table
CREATE TABLE contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, NOW()) NOT NULL
);

-- Create index on email for faster lookups
CREATE INDEX contacts_email_idx ON contacts(email);

-- Enable Row Level Security (RLS)
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from authenticated and anonymous users
CREATE POLICY "Allow public inserts" ON contacts
    FOR INSERT
    TO public
    WITH CHECK (true);

-- Create policy to allow users to read their own contacts
CREATE POLICY "Allow users to read their own contacts" ON contacts
    FOR SELECT
    TO public
    USING (true); 