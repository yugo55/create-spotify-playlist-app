import Link from "next/link";

export default function Page() {
  return (
    <main className="h-screen grid place-items-center bg-[#202020]">
      <div>
        <h1 className="text-7xl text-white font-bold mb-20"><span className="text-green-500">Spotify</span> API</h1>
        <Link href="/login" className="grid place-items-center w-28 h-11 rounded-full bg-green-500 font-semibold mx-auto">
          Log in
        </Link>
      </div>
    </main>
  );
}
