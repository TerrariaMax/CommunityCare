<template>
  <div class="map-container">
    <h3>Google Maps Directions</h3>

    <div class="form-section">
      <label>From:</label>
      <input v-model="origin" type="text" placeholder="Enter starting location" />

      <label>To:</label>
      <input v-model="destination" type="text" placeholder="Enter destination" />

      <label>Travel Mode:</label>
      <select v-model="travelMode">
        <option value="DRIVING">Driving</option>
        <option value="WALKING">Walking</option>
        <option value="BICYCLING">Bicycling</option>
        <option value="TRANSIT">Transit</option>
      </select>

      <button @click="calculateRoute">Search</button>
    </div>

    <div class="trip-info" v-if="tripInfo">
      <p><strong>Distance:</strong> {{ tripInfo.distance }}</p>
      <p><strong>Duration:</strong> {{ tripInfo.duration }}</p>
    </div>

    <div id="map" class="map" style="width: 50%; height: 500px"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      origin: '',
      destination: '',
      travelMode: 'DRIVING', // Default travel mode
      map: null,
      directionsService: null,
      directionsRenderer: null,
      tripInfo: null
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap() {
      const mapOptions = {
        center: { lat: -37.915047, lng: 145.129272 },
        zoom: 8
      }
      this.map = new google.maps.Map(document.getElementById('map'), mapOptions)
      this.directionsService = new google.maps.DirectionsService()
      this.directionsRenderer = new google.maps.DirectionsRenderer()
      this.directionsRenderer.setMap(this.map)
    },
    calculateRoute() {
      if (this.origin && this.destination) {
        this.directionsService.route(
          {
            origin: this.origin,
            destination: this.destination,
            travelMode: this.travelMode
          },
          (response, status) => {
            if (status === 'OK') {
              this.directionsRenderer.setDirections(response)
              const route = response.routes[0].legs[0]
              this.tripInfo = {
                distance: route.distance.text,
                duration: route.duration.text
              }
            } else {
              alert('Directions request failed due to ' + status)
            }
          }
        )
      } else {
        alert('Please fill in both the origin and destination fields.')
      }
    }
  }
}
</script>

<style>
.form-section {
  display: flex;
  flex-direction: column; /* Arrange the elements vertically */
  align-items: flex-start; /* Align elements to the left */
  width: 100%; /* Ensure it spans the full container width */
  max-width: 400px; /* Set a max-width for the form, so it doesn't stretch too wide */
  margin-bottom: 20px;
}

.form-section label {
  margin-top: 10px;
  font-weight: bold;
}

.form-section input,
.form-section select,
.form-section button {
  width: 100%; /* Make each input/select/button take the full width of the container */
  margin-top: 5px;
  padding: 8px;
  box-sizing: border-box; /* Include padding and border in the element's total width and height */
}

button {
  cursor: pointer;
  margin-top: 15px;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
}
</style>

<!-- <template>
  <div>
    <h3>Google Maps Navigation</h3>

    <div class="location-inputs">
      <input type="text" v-model="origin" placeholder="Enter origin" @change="calculateRoute" />
      <input
        type="text"
        v-model="destination"
        placeholder="Enter destination"
        @change="calculateRoute"
      />
    </div>

    <div id="map" ref="map" style="width: 50%; height: 400px"></div>

    <div class="trip-info" v-if="tripInfo">
      <p><strong>Distance:</strong> {{ tripInfo.distance }}</p>
      <p><strong>Duration:</strong> {{ tripInfo.duration }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoogleMap',
  data() {
    return {
      origin: '',
      destination: '',
      map: null,
      directionsService: null,
      directionsRenderer: null,
      tripInfo: null // Holds trip distance and duration
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap() {
      // Set default map center
      const mapCenter = { lat: -37.915047, lng: 145.129272 }

      // Create the map instance
      this.map = new google.maps.Map(this.$refs.map, {
        center: mapCenter,
        zoom: 8
      })

      this.directionsService = new google.maps.DirectionsService()
      this.directionsRenderer = new google.maps.DirectionsRenderer()

      this.directionsRenderer.setMap(this.map)
    },

    calculateRoute() {
      if (this.origin && this.destination) {
        this.directionsService.route(
          {
            origin: this.origin,
            destination: this.destination,
            travelMode: google.maps.TravelMode.DRIVING // You can change the mode to WALKING, BICYCLING, TRANSIT
          },
          (response, status) => {
            if (status === 'OK') {
              this.directionsRenderer.setDirections(response)

              // Extract trip details (distance and duration)
              const route = response.routes[0].legs[0]
              this.tripInfo = {
                distance: route.distance.text,
                duration: route.duration.text
              }
            } else {
              alert('Directions request failed due to ' + status)
            }
          }
        )
      }
    }
  }
}
</script>

<style scoped>
/* Styling for the inputs and trip information */
.location-inputs {
  margin-bottom: 10px;
}
.location-inputs input {
  margin-right: 10px;
  padding: 8px;
  font-size: 14px;
}
.trip-info {
  margin-top: 10px;
  font-size: 16px;
}
</style> -->

<!-- 
<template>
  <div>
    <h3>Google Maps</h3>
    <div id="map" ref="map" style="width: 50%; height: 400px"></div>
  </div>
</template>

<script>
export default {
  name: 'GoogleMap',
  mounted() {
    this.initMap()
  },
  methods: {
    initMap() {
      // The location to center the map (lat and lng)
      const mapCenter = { lat: -37.915047, lng: 145.129272 }

      // Create a new map instance and bind it to the "map" div
      const map = new google.maps.Map(this.$refs.map, {
        center: mapCenter,
        zoom: 10
      })

      // Add a marker at the center
      new google.maps.Marker({
        position: mapCenter,
        map: map
      })
    }
  }
}
</script>

<style scoped>
#map {
  height: 400px;
  width: 100%;
}
</style> -->

<!-- <template>
  <div ref="map" style="width: 500px; height: 500px"></div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
const map = ref(null)
onMounted(() => {
  new window.google.maps.Map(map.value, {
    center: { lat: -37.915047, lng: 145.129272 },
    zoom: 10
  })
}) -->
//
<!-- <template>
//   <div class="container">
//     <div class="header">
//       <h1>WEATHER APP</h1>
//       <div class="search-bar">
//         <input type="text" v-model="city" placeholder="Enter city name" class="search-input" />
//         <button @click="searchByCity" class="search-button">Search</button>
//       </div>
//     </div>

//     <main>
//       <div v-if="weatherData">
//         <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>

//         <div>
//           <img :src="iconUrl" alt="Weather Icon" />
//           <p>{{ temperature }} °C</p>
//         </div>

//         <span>{{ weatherData.weather[0].description }}</span>
//       </div>

//       <p v-if="error">{{ error }}</p>
//     </main>
//   </div>
// </template>

// <script>
// // The info section in 10.1.1 provided detailed information about this package
// import axios from 'axios'

// const apikey = '1bb5027dec8149ef020494d26d044c16'

// export default {
//   name: 'App',
//   data() {
//     return {
//       city: '',
//       weatherData: null,
//       hourlyForecast: [],
//       dailyForecast: []
//     }
//   },
//   //computed is a property that is used to define a property that
//   //is dependent on other data properties.
//   //If we using a more easy to understand words to understand the concept:
//   //the derived value such as temperature automatically update when the relevant value change.
//   computed: {
//     //There are multiple way to obtain the data in Celsius format.
//     //Calculation by yourself like below after data is retireved or via API parameters

//     //Example of adding additional units requirement, if you choose this, remember to change section 3.1
//     //https://api.openweathermap.org/data/2.5/weather?lat=XXX&lon=-XXX.15&appid={API key}&units=metric
//     temperature() {
//       return this.weatherData ? Math.floor(this.weatherData.main.temp - 273) : null
//     },
//     //Get the current weather icon using the API link
//     iconUrl() {
//       return this.weatherData
//         ? `http://api.openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
//         : null
//     }
//   },
//   //There are two steps involved in this,
//   //step 1: identify current location
//   //step 2: after identify, get the weather data straight based on the current location.
//   mounted() {
//     this.fetchCurrentLocationWeather()
//   },
//   methods: {
//     //Async in a easy to understand way means the method will run in backend thread,
//     //And it won't occupy the main thread, so the user experience is still smooth
//     async fetchCurrentLocationWeather() {
//       //The navigator.geolocation object is part of the Web API provided by modern web browsers
//       //Please note this function is not belongs to Vue or openweather.
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(async (position) => {
//           const { latitude, longitude } = position.coords
//           //API link to obtain the current weather based on the current location browser identified
//           const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`
//           //await means wait for the fetchWeatherData method to complete before proceeding
//           await this.fetchWeatherData(url)
//         })
//       }
//     },
//     async fetchWeatherData(url) {
//       try {
//         const response = await axios.get(url)
//         //Returned data from API is stored as JSON file in weatherData
//         this.weatherData = response.data
//       } catch (error) {
//         console.error('Error fetching weather data:', error)
//       }
//     },
//     async searchByCity() {
//       if (!this.city) return
//       const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apikey}`
//       await this.fetchWeatherData(url)
//     }
//   }
// }
//
</script>

//
<!--<template>
//   <div class="text-center">
//     <h1>Join Us</h1>
//     <p></p>
//     <router-view />
//   </div>
// </template> -->
