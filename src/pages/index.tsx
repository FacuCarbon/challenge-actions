import Table from "../components/Table";

const Home = () => {
  return (
    <div className="home">
      <div className="home__containerTitle">
        <h1 className="home__containerTitle__title">Stocks</h1>
      </div>

      <div className="home__containerBody">
        <Table />
      </div>
    </div>
  );
};

export default Home;
