import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { genSalt, hash } from 'bcrypt';
 
export async function GET() {
  try {
    await sql`SELECT * FROM People;`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
 
  const people = await sql`SELECT * FROM People;`;
  return NextResponse.json({ people: people.rows }, { status: 200 });
}

export async function POST(request: Request) {
  const saltRounds = 10;
  const salt = await genSalt(saltRounds)

  const formData = await request.formData();
  const name: string = formData.get('name') as string
  const email: string = formData.get('email') as string
  const hashedPassword = await hash(formData.get('password') as string, salt)

  try {
    await sql`INSERT INTO People (Name, Email, Password) VALUES (${name}, ${email}, ${hashedPassword});`;
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }

  return NextResponse.json({ formData }, { status: 200 });
}