import { Restaurant } from "../store/restaurantSlice";

const createPinElement = (background: string, glyphColor: string, borderColor: string) => {
  return new google.maps.marker.PinElement({
    background,
    glyphColor,
    borderColor,
  });
};

const createMarker = (
  map: google.maps.Map,
  location: google.maps.LatLng,
  title: string,
  content: HTMLElement
) => {
  return new google.maps.marker.AdvancedMarkerElement({
    map,
    position: location,
    content,
    title,
  });
};

const handleMarkerClick = (
  marker: google.maps.marker.AdvancedMarkerElement,
  onMarkerClick: (restaurantId: string) => void,
  placeId: string | undefined,
  highlightPinElement: HTMLElement,
  defaultPinElement: HTMLElement,
  highlightedMarker: any
) => {
  marker.addListener("click", () => {
    if (highlightedMarker.current) {
      highlightedMarker.current.content = defaultPinElement;
    }

    marker.content = highlightPinElement;
    highlightedMarker.current = marker;

    if (placeId) {
      onMarkerClick(placeId);
    }
  });
};

export const initMap = async (
  location: { lat: number; lng: number },
  onRestaurantsFetched: (restaurants: Restaurant[], markers: any[]) => void,
  onMarkerClick: (restaurantId: string) => void,
  selectedRestaurantId: string | null = null
) => {
  const { Map } = (await google.maps.importLibrary("maps")) as google.maps.MapsLibrary;
  const map = new Map(document.getElementById("map") as HTMLElement, {
    center: location,
    zoom: 14,
    mapId: "DEMO_MAP_ID",
    disableDefaultUI: true,
  });

  const request: google.maps.places.PlaceSearchRequest = {
    location: new google.maps.LatLng(location.lat, location.lng),
    type: "restaurant",
    rankBy: google.maps.places.RankBy.DISTANCE,
  };

  const service = new google.maps.places.PlacesService(map);
  const markers: { [key: string]: any } = {};
  let highlightedMarker: { current: any | null } = { current: null };

  service.nearbySearch(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
      const sortedResults = results.map((result) => {
        const distance = result.geometry?.location
          ? google.maps.geometry.spherical.computeDistanceBetween(
              new google.maps.LatLng(location.lat, location.lng),
              result.geometry.location
            ) / 1000
          : 0;

        const photo = result.photos && result.photos[0]?.getUrl({ maxWidth: 100 });
        const defaultPinElement = createPinElement("#545643", "white", "#909580").element;
        const highlightPinElement = createPinElement("#BBACC1", "white", "#909580").element;

        const marker = createMarker(
          map,
          result.geometry?.location as google.maps.LatLng,
          result.name || "",
          defaultPinElement
        );

        handleMarkerClick(marker, onMarkerClick, result.place_id, highlightPinElement, defaultPinElement, highlightedMarker);

        if (result.place_id) {
          markers[result.place_id] = marker;
        }

        return {
          id: result.place_id,
          name: result.name,
          distance,
          photo,
          rating: result.rating,
        } as Restaurant;
      });

      if (selectedRestaurantId && markers[selectedRestaurantId]) {
        const selectedMarker = markers[selectedRestaurantId];
        selectedMarker.content = createPinElement("#BBACC1", "white", "#909580").element;
        highlightedMarker.current = selectedMarker;
      }

      onRestaurantsFetched(sortedResults, Object.values(markers));
    } else {
      console.log("Error fetching restaurants:", status);
    }
  });
};
