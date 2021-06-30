import Layout from '../../components/Layout'
import Item from '../../components/Item'
import SearchInput from '../../components/SearchInput'
import data from '../../data/resources.dummy.json'

export default function Resources(): JSX.Element {
  return (
    <Layout>
      <div className="flex md:py-2 mb-2 flex-col md:flex-row md:fixed bg-white z-20 rounded-md shadow-xl lg:w-11/12 justify-start">
        <h2 className="w-auto xl:w-full text-3xl lg:text-4xl xl:text-5xl text-center md:text-left font-black text-green-700 md:ml-3 md:mt-2 md:mr-20">
          Resources Near You
        </h2>
        <SearchInput placeholder="Enter a Resource..." data={[1, 2, 3]} />
      </div>
      <div className="grid lg:grid-cols-4 xl:grid-cols-5 md:grid-cols-3 grid-cols-2 grid-flow-row h-auto md:mt-24 md:ml-1">
        {data.map((d, index) => (
          <Item
            key={index}
            name={d.name}
            price="$200.00"
            rating={d.rating}
            rating_style={d.rt_color}
            location={d.location}
            image={d.img}
          />
        ))}
      </div>
    </Layout>
  )
}
