import { useStoreState } from "~~/stores/useStoreState";

const FavoritesPage = () => {
  const { stores, loading, error, fetchStores } = useStoreState();

  return (
    <div>
      <h1>Favorites</h1>
      <div>
        {stores.length > 0 ? (
          stores.map(store => (
            <div key={store.id}>
              <h2>{store.name}</h2>
              <img src={store.image} alt={store.name} />
              <p>Rating: {store.rating}</p>
              <p>Reviews: {store.reviews}</p>
              <p>Distance: {store.distance}</p>
              <p>Address: {store.address}</p>
              <p>Available Until: {store.availableUntil}</p>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
