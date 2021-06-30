import Layout from '../../components/Layout'
import Header from '../../components/Header'
import Person from '../../components/Person'

export default function Events(): JSX.Element {
  return (
    <Layout>
      <Header title="Connecting people and their resources." />
      <h2 className="w-full text-3xl md:text-5xl text-center md:text-left font-black text-green-700 mb-4 md:ml-3">
        About Us
      </h2>
      <div className="space-x-5 flex flex-col flex-wrap md:flex-row items-center lg:justify-center">
        <div className="mb-5 justify-self-center">
          <Person
            name="Alejandro De León"
            description="Co-leader of the project and a student of Software Engineering at Technological University of Panama, interested in Design, Sustainability and Data Science. He had developed software for different NGOs and continues to do that."
          />
        </div>
        <div className="mb-5 mx-0">
          <Person
            name="Alek Rutherford"
            description="Co-leader of the project and a student of Software Engineering at Technological University of Panama, interested in Design, Sustainability and Data Science. He had developed software for different NGOs and continues to do that."
          />
        </div>
        <div className="mb-5 mx-0">
          <Person
            name="Michael Knight"
            description="Co-leader of the project and a student of Software Engineering at Technological University of Panama, interested in Design, Sustainability and Data Science. He had developed software for different NGOs and continues to do that."
          />
        </div>
        <div className="mb-5 mx-0">
          <Person
            name="Jose Regalado"
            description="Co-leader of the project and a student of Software Engineering at Technological University of Panama, interested in Design, Sustainability and Data Science. He had developed software for different NGOs and continues to do that."
          />
        </div>
        <div className="mb-5 mx-0">
          <Person
            name="Arístides Isaza"
            description="Co-leader of the project and a student of Software Engineering at Technological University of Panama, interested in Design, Sustainability and Data Science. He had developed software for different NGOs and continues to do that."
          />
        </div>
      </div>
    </Layout>
  )
}
