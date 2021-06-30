import Link from 'next/link'
import { useRouter } from 'next/router'

function Sidebar() {
  // routing de next
  const router = useRouter()

  return (
    <aside className="xl:w-48 sm:w-min sm:min-h-screen z-10 p-5 bg-white md:fixed">
      <Link href="/">
        <div className="inline-flex items-center cursor-pointer">
          <img
            src="/images/ecobridge_logo.png"
            alt="ecobridge_logo"
            className="w-10"
          />
          <p className="ml-1 text-green-600 md:text-sm lg:text-md font-extrabold">
            EcoBridge
          </p>
        </div>
      </Link>

      <nav className="mt-5 list-none">
        <li
          className={
            router.pathname === '/about-us'
              ? 'bg-green-800 font-bold text-l p-2 rounded-md text-white md:mb-2'
              : 'text-green-600 text-l font-bold p-2 md:mb-2'
          }
        >
          <Link href="/about-us">
            <a className="block">ABOUT US</a>
          </Link>
        </li>
        <li
          className={
            router.pathname === '/resources'
              ? 'bg-green-800 font-bold text-l p-2 rounded-md text-white md:mb-2'
              : 'text-green-600 text-l font-bold p-2 md:mb-2'
          }
        >
          <Link href="/resources">
            <a className="block">RESOURCES</a>
          </Link>
        </li>
        <li
          className={
            router.pathname === '/learn'
              ? 'bg-green-800 font-bold text-l p-2 rounded-md text-white md:mb-2'
              : 'text-green-600 text-l font-bold p-2 md:mb-2'
          }
        >
          <Link href="/learn">
            <a className="block">LEARN</a>
          </Link>
        </li>
        <li
          className={
            router.pathname === '/events'
              ? 'bg-green-800 font-bold text-l p-2 rounded-md text-white md:mb-2'
              : 'text-green-600 text-l font-bold p-2 md:mb-2'
          }
        >
          <Link href="/events">
            <a className="block">EVENTS</a>
          </Link>
        </li>
      </nav>
    </aside>
  )
}

export default Sidebar
