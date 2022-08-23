mapboxgl.accessToken =
  "pk.eyJ1IjoiYmlsYWxtb2htYW5kNTgiLCJhIjoiY2w0anlhbXRtMDl5ZjNsbzEzMXhyZHMwZyJ9.UTIZY2g0sYKmqFL1Lp2aOA";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: campground.geometry.coordinates, // starting position [lng, lat]
  zoom: 10, // starting zoom
});

new mapboxgl.Marker()
  .setLngLat(campground.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<h6>${campground.title}</h6><p>${campground.location}</p>`
    )
  )
  .addTo(map);

map.addControl(new mapboxgl.NavigationControl());
