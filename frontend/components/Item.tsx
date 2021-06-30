import { LocationMarkerIcon } from '@heroicons/react/outline'

const Item = (props): JSX.Element => {
  const { name, price, rating_style, location, image } = props
  return (
    <>
      <div className="w-auto h-60 lg:auto m-2">
        <div
          className="relative bg-gray-50 shadow rounded-md"
          style={{ width: '100%', height: '100%' }}
        >
          <p className="w-28 md:w-32 xl:w-auto h-9 absolute text-sm md:text-md xl:text-lg font-semibold antialiased top-1 left-2">
            {name}
          </p>
          <p className="w-auto h-6 absolute text-sm md:text-md xl:text-lg font-semibold text-green-700 antialiased top-12 xl:top-7 left-2">
            {price}
          </p>
          <div className="flex items-center justify-center w-auto h-auto absolute space-x-1 antialiased z-10 bottom-2 right-2 rounded-tl-md bg-gray-50 p-2">
            <LocationMarkerIcon className="h-4 w-4 text-green-600" />
            <p className="w-auto h-full text-xs font-semibold text-right antialiased text-green-600">
              {location}
            </p>
          </div>
          <div className="inline-flex space-x-1.5 items-center rating justify-end w-6 h-6 absolute right-2 top-2">
            <div className={`w-6 h-full rounded ${rating_style}`} />
          </div>

          <img
            className="w-full h-44 xl:h-48 absolute p-2 bottom-0 rounded-xl filter brightness-95"
            src={image}
          />
        </div>
      </div>
    </>
  )
}

export default Item
