import Layout from '../../components/Layout'
import Header from '../../components/Header'
import Event from '../../components/Event'

export default function Learn(): JSX.Element {
  return (
    <Layout>
      <Header title="Connecting people and their resources." />
      <h2 className="w-full text-3xl md:text-5xl text-center md:text-left font-black text-green-700 mb-4 md:ml-3">
        Learn
      </h2>
      <Event />
    </Layout>
  )
}
