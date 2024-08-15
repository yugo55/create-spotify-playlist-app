import Link from "next/link";
import Image from "next/image";

export default function SideNav() {
  return (
    <div className="flex flex-col justify-between h-full gap-3 w-96">
      <div className="w-full p-5 rounded-lg bg-[#161616]">
        <Link href="/spotify" className="block text-white font-semibold text-2xl ml-2 pb-2 border-b-2 border-[#484848] hover:opacity-70"><span className="text-green-500">Spotify</span> API</Link>
        <Link href="/spotify/analysis" className="text-gray-400 block ml-2 mt-2 font-semibold text-xl hover:opacity-70">分析</Link>
      </div>
      <div className="bg-[#161616] p-5 rounded-lg flex-grow overflow-y-auto ff-sidebar">
        <p className="text-gray-400 font-semibold mb-2 ml-2">お気に入りアーティスト</p>
        <ul>
          <li>
            <Link href="" className="flex items-center hover:bg-[#282828] p-2 rounded-lg">
              <Image src="/radwimps.jpeg" width={50} height={50} alt="" className="rounded-full" />
              <p className="ml-3">RADWIMPS</p>
            </Link>
          </li>
          <li>
            <Link href="" className="flex items-center hover:bg-[#282828] p-2 rounded-lg">
              <Image src="/radwimps.jpeg" width={50} height={50} alt="" className="rounded-full" />
              <p className="ml-3">RADWIMPS</p>
            </Link>
          </li>
          <li>
            <Link href="" className="flex items-center hover:bg-[#282828] p-2 rounded-lg">
              <Image src="/radwimps.jpeg" width={50} height={50} alt="" className="rounded-full" />
              <p className="ml-3">RADWIMPS</p>
            </Link>
          </li>
          <li>
            <Link href="" className="flex items-center hover:bg-[#282828] p-2 rounded-lg">
              <Image src="/radwimps.jpeg" width={50} height={50} alt="" className="rounded-full" />
              <p className="ml-3">RADWIMPS</p>
            </Link>
          </li>
          <li>
            <Link href="" className="flex items-center hover:bg-[#282828] p-2 rounded-lg">
              <Image src="/radwimps.jpeg" width={50} height={50} alt="" className="rounded-full" />
              <p className="ml-3">RADWIMPS</p>
            </Link>
          </li>
          <li>
            <Link href="" className="flex items-center hover:bg-[#282828] p-2 rounded-lg">
              <Image src="/radwimps.jpeg" width={50} height={50} alt="" className="rounded-full" />
              <p className="ml-3">RADWIMPS</p>
            </Link>
          </li>
          <li>
            <Link href="" className="flex items-center hover:bg-[#282828] p-2 rounded-lg">
              <Image src="/radwimps.jpeg" width={50} height={50} alt="" className="rounded-full" />
              <p className="ml-3">RADWIMPS</p>
            </Link>
          </li>
          <li>
            <Link href="" className="flex items-center hover:bg-[#282828] p-2 rounded-lg">
              <Image src="/radwimps.jpeg" width={50} height={50} alt="" className="rounded-full" />
              <p className="ml-3">RADWIMPS</p>
            </Link>
          </li>
          <li>
            <Link href="" className="flex items-center hover:bg-[#282828] p-2 rounded-lg">
              <Image src="/radwimps.jpeg" width={50} height={50} alt="" className="rounded-full" />
              <p className="ml-3">RADWIMPS</p>
            </Link>
          </li>
          <li>
            <Link href="" className="flex items-center hover:bg-[#282828] p-2 rounded-lg">
              <Image src="/radwimps.jpeg" width={50} height={50} alt="" className="rounded-full" />
              <p className="ml-3">RADWIMPS</p>
            </Link>
          </li>
          <li>
            <Link href="" className="flex items-center hover:bg-[#282828] p-2 rounded-lg">
              <Image src="/radwimps.jpeg" width={50} height={50} alt="" className="rounded-full" />
              <p className="ml-3">RADWIMPS</p>
            </Link>
          </li>
          <li>
            <Link href="" className="flex items-center hover:bg-[#282828] p-2 rounded-lg">
              <Image src="/radwimps.jpeg" width={50} height={50} alt="" className="rounded-full" />
              <p className="ml-3">RADWIMPS</p>
            </Link>
          </li>
        </ul>
      </div>
      <div className="bg-[#161616] p-5 rounded-lg">
        <p className="ml-2">Log out</p>
      </div>
    </div>
  );
}