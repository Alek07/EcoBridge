/* import { LocationMarkerIcon } from '@heroicons/react/outline' */

const Person = (props): JSX.Element => {
  const { name, description, profile_pic } = props
  return (
    <>
      <div className="w-auto" style={{ height: '27rem' }}>
        <div className="relative bg-gray-50 shadow rounded-md w-72 md:w-64 h-full">
          <h2 className="w-72 h-9 absolute text-md md:text-xl font-medium text-gray-800 z-10 top-64 left-2">
            {name}
          </h2>
          <p
            className="w-56 absolute text-xs font-medium text-gray-800"
            style={{ left: 15, bottom: 15 }}
          >
            {description}
          </p>
          <img
            className="w-full h-64 absolute rounded-xl p-2"
            src="https://via.placeholder.com/330x330"
          />
          <img
            className="w-auto h-6 absolute rounded-xl"
            style={{ right: 10, top: 290 }}
            src={profile_pic}
          />
        </div>
      </div>
    </>
  )
}

export default Person
