const Header = (props): JSX.Element => {
  const { title } = props
  return (
    <div className="bg-hero bg-cover h-1/3 sm:flex sm:justify-end mb-6">
      <h1 className="sm:w-full lg:w-2/5 my-auto text-green-800 text-2xl lg:text-5xl xl:text-6xl text-center md:text-right font-bold p-6">
        {title}
      </h1>
    </div>
  )
}

export default Header
