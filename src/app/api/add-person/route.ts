import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS People (Name TEXT, Email TEXT, Password TEXT);`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
 
  const people = await sql`SELECT * FROM People;`;
  return NextResponse.json({ people: people.rows }, { status: 200 });
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const name: string = formData.get('name') as string
  const email: string = formData.get('email') as string
  const password: string = formData.get('password') as string

  try {
    await sql`INSERT INTO People (Name, Email, Password) VALUES (${name}, ${email}, ${password});`;
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }

  return NextResponse.json({ formData }, { status: 200 });
}