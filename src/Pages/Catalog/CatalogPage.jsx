import FilterForm from "../../Components/Filters/Filters";
import CarList from "../../Components/СarLists/CarList";

const CatalogPage = () => {
  return (
      <section>
        <FilterForm />
        <CarList />
      </section>
  );
};

export default CatalogPage;
