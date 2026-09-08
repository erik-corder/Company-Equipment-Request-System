import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Company_Equipment_Request</h1>
      <p>Scaffolded starter — see the repository README.</p>
      <Link href='/equipment-request-form'>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Submit Equipment Request</button>
      </Link>
    </main>
  );
}
