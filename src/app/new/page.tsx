import { prisma } from '@/db';
import Link from 'next/link';
import { redirect } from 'next/navigation';

async function createTodo(data: FormData) {
  'use server';

  const title = data.get('title')?.valueOf();
  if (typeof title !== 'string' || title.length === 0) {
    throw new Error('Invalid title');
  }

  await prisma.todo.create({ data: { title, complete: false } });
  redirect('/');
}

export default function New() {
  return (
    <>
      <header className="flex justify-between items-center mb-4 bg- ">
        <h1>New</h1>
      </header>
      <form action={createTodo} className="flex gap-6 flex-col">
        <input
          type="text"
          name="title"
          className=" border border-slate-700 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-900"
        />
        <div className="flex gap-1 justify-end">
          <Link
            href=".."
            className="border border-slate-900 px-6 py-3 rounded hover:bg-slate-700 hover:text-slate-200 focus-within:bg-slate-700 outline-none"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="border border-slate-900 px-6 py-3 rounded hover:bg-slate-700 hover:text-slate-200 focus-within:bg-slate-700 outline-none"
          >
            Create
          </button>
        </div>
      </form>
    </>
  );
}
