import { LocationMarkerIcon } from '@heroicons/react/outline'

const Event = (): JSX.Element => {
  //const { /* name, description, value, date, location */  } = props
  return (
    <div
      className="relative bg-gray-50 shadow rounded-sm h-80"
      style={{ width: 554 }}
    >
      <p className="w-56 h-40 absolute text-xs font-medium text-justify text-green-700 left-4 top-24">
        A day to help clean the coast of Costa del Este. A day to help clean the
        coast of Costa del Este. A day to help clean the coast of Costa del
        Este. A day to help clean the coast of Costa del Este. A day to help
        clean the coast of Costa del Este. A day to help clean the coast of
        Costa del Este. . A day to help clean the coast of Costa del Este.
      </p>
      <img
        className="w-72 h-auto absolute rounded-sm right-2 top-2"
        src="https://via.placeholder.com/308x325"
      />
      <p className="w-48 h-12 absolute text-xl font-medium top-3 left-4">
        Beach Cleaning Day
      </p>
      <div
        className="absolute left-4 top-14 flex"
        style={{ width: 162, height: 25 }}
      >
        <LocationMarkerIcon className="w-5 h-5" />
        <p className="w-40 h-6 ml-4 top-0 text-xs font-medium text-center text-green-700">
          Panama City, Panama
        </p>
      </div>
      <div className="p-2 w-28 h-9 text-white absolute bottom-4 left-4 font-medium bg-green-600 border border-green-600 rounded-full shadow-md hover:shadow-none active:shadow-inner active:bg-green-700 antialiased sm:subpixel-antialiased md:antialiased">
        <p className="flex-1 h-full text-sm font-bold tracking-wider text-center text-white">
          REGISTER
        </p>
      </div>
      <p className="w-24 h-6 absolute text-xs font-medium text-center text-green-700 bottom-4 left-32">
        FREE
      </p>
    </div>
  )
}

export default Event
