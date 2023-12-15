import { TodoItem } from '@/components/TodoItem';
import { prisma } from '@/db';

import Link from 'next/link';

function getTodos() {
  return prisma.todo.findMany();
}

async function toggleTodo(id: string, complete: boolean) {
  'use server';
  await prisma.todo.update({ where: { id }, data: { complete } });
}

export default async function Home() {
  const todos = await getTodos();

  return (
    <>
      <header className="flex justify-between items-center mb-10 ">
        <h1 className="text-6xl">Todo List</h1>
        <Link
          className="border border-slate-900 px-6 py-3 rounded hover:bg-slate-700 hover:text-slate-200 focus-within:bg-slate-700 outline-none text-3xl"
          href="/new"
        >
          New
        </Link>
      </header>
      <ul className="flex flex-col justify-center items-center">
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
        ))}
      </ul>
    </>
  );
}
