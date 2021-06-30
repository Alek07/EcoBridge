import Head from 'next/head'
import Sidebar from './Sidebar'
import { useRouter } from 'next/router'

const Layout = (props): JSX.Element => {
  // Hook de routing
  const router = useRouter()

  //console.log(props);

  const { children } = props

  return (
    <>
      <Head>
        <title>EcoBridge</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
          integrity="sha256-l85OmPOjvil/SOvVt3HnSSjzF1TUMyT9eV0c2BzEGzU="
          crossOrigin="anonymous"
        />
      </Head>

      {router.pathname === '/login' || router.pathname === '/nuevacuenta' ? (
        <div className="bg-login bg-cover bg-no-repeat min-h-screen flex flex-col justify-start p-10">
          {children}
        </div>
      ) : (
        <div className="min-h-screen">
          <div className="sm:flex min-h-screen">
            <Sidebar />

            <main className="sm:w-full xl:w-full sm:min-h-screen sm:ml-0 md:ml-36 lg:ml-40 xl:ml-48 h-full overflow-y-hidden no-scrollbar overflow-x-hidden">
              {children}
            </main>
          </div>
        </div>
      )}
    </>
  )
}

export default Layout
