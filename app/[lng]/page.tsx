import UserForm from "../_components/forms";

type IProps = {
  params: {
    lng: string
  }
};

const Home: React.FC<IProps> = async ({ params: { lng } }) => {
  return (
    <main className="min-h-screen">
      <section className="py-24 md:py-36 px-6">
        <div className="container mx-auto">
          <UserForm />
        </div>
      </section>
    </main>
  )
}

export default Home;