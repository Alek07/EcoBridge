import React from "react";
import { useRouter } from "next/router";

function Header(props) {
  const router = useRouter();

  const { nombre, apellido, fecha } = props;

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="sm:flex sm:justify-between mb-6">
      {props.nombre !== undefined ? (
        <p className="mr-2 mb-5 lg:mb-0">
          Hola: {nombre} {apellido}
        </p>
      ) : (
        <p>{fecha}</p>
      )}

      <button
        onClick={() => cerrarSesion()}
        type="button"
        className="bg-red-600 hover:bg-red-700 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md"
      >
        Cerrar Sesión
      </button>
    </div>
  );
}

export default Header;
