import React from "react";
import Head from "next/head";
import Sidebar from "./Sidebar";
import { useRouter } from "next/router";

const Layout = (props) => {
  // Hook de routing
  const router = useRouter();

  //console.log(props);

  const { children, nombre, apellido } = props;

  return (
    <>
      <Head>
        <title>AIG - Administración de Vacunados</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
          integrity="sha256-l85OmPOjvil/SOvVt3HnSSjzF1TUMyT9eV0c2BzEGzU="
          crossOrigin="anonymous"
        />
      </Head>

      {router.pathname === "/login" || router.pathname === "/nuevacuenta" ? (
        <div className="bg-gray-200 min-h-screen flex flex-col justify-center">
          <div>{children}</div>
        </div>
      ) : (
        <div className="bg-gray-200 min-h-screen">
          <div className="sm:flex min-h-screen">
            <Sidebar />

            <main className="sm:w-2/3 xl:w-full sm:min-h-screen p-5">
              {children}
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export default Layout;
