import Layout from '../components/Layout'
import Header from '../components/Header'
import CardCarousel from '../components/CardCarousel'

export const Home = (): JSX.Element => (
  <Layout>
    <Header title="Connecting people and their resources." />
    <div className="flex justify-between mt-10 mb-20 w-full">
      <div className="w-full lg:w-4/12 flex flex-col items-center">
        <h2 className="w-full text-3xl md:text-5xl text-center md:text-left font-black text-green-700 mb-4 md:ml-3 antialiased sm:subpixel-antialiased md:antialiased">
          Welcome to EcoBridge.
        </h2>
        <p className="text-green-600 text-xl text-justify font-medium pl-10 pr-10 mb-10">
          We are a community where people can sell, exchange or trade their
          resources in order to promote green consumption and reduce waste.{' '}
        </p>
        <button
          type="button"
          className="w-3/5 h-16 transition duration-800 ease-in-out text-white font-medium bg-green-600 border border-green-600 rounded-full shadow-md hover:shadow-none active:shadow-inner active:bg-green-700 antialiased sm:subpixel-antialiased md:antialiased"
        >
          Read our pledge here
        </button>
      </div>

      {/* espacio para lo de la grafica en el diseño */}
      <div className="w-auto md:w-2/5"></div>
    </div>
    <CardCarousel title="Resources Near You" />
    <CardCarousel title="Upcoming Events" />
    <CardCarousel title="Videos" />
  </Layout>
)

export default Home
