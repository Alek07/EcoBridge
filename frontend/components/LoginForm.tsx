//import { useState } from "react";
import { useForm } from 'react-hook-form'
import Link from 'next/link'
//import { useRouter } from "next/router";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { userService } from './../services/userService'

interface IFormInputs {
  email: string
  password: string
}

const schema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
})

export default function LoginForm() {
  //const router = useRouter()

  //const [mensaje, guardarMensaje] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  })
  const onSubmit = (data: IFormInputs) => {
    userService
      .login(data.email, data.password)
      .then((res) => {
        alert('Inicio de sesión exitoso.')
        localStorage.setItem('token', res.data.access_token)
      })
      .catch((err) => {
        let msg = ''

        if (err.response) {
          if (err.response.status === 401) {
            msg = 'Correo y/o contraseña incorrecta.'
          } else {
            msg = `Error del servidor. ${err.toString()}`
          }
        } else {
          msg = `Error del cliente. ${err.toString()}`
        }

        alert(msg)
      })
  }

  /*  const mostrarMensaje = () => {
    return (
      <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
        <p>{mensaje}</p>
      </div>
    );
  }; */

  return (
    <div className="w-96 flex flex-col justify-start mt-5">
      <form
        className="flex flex-col justify-center bg-white border-2 border-green-700 rounded-lg shadow-md px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-green-700 text-3xl text-center font-bold">Login</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>

          <input
            className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            {...register('email')}
          />
        </div>

        {errors.email ? (
          <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
            <p className="font-bold">Error</p>
            <p>{errors.email?.message}</p>
          </div>
        ) : null}

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>

          <input
            className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            {...register('password')}
          />
        </div>

        {errors.password ? (
          <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
            <p className="font-bold">Error</p>
            <p>{errors.password?.message}</p>
          </div>
        ) : null}

        <input
          type="submit"
          className="bg-green-700 w-full rounded-md mt-5 p-2 text-white cursor-pointer hover:bg-green-900"
          value="Iniciar Sesión"
        />
      </form>
      <Link href="/nuevacuenta">
        <p className="bg-green-700 w-full rounded-md mt-5 p-3 text-center text-white cursor-pointer hover:bg-green-900 hover:text-white">
          Nuevo Usuario
        </p>
      </Link>
    </div>
  )
}
