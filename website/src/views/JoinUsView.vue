<!-- <template>
  <div>
    <h1>Interactive Tables</h1>

    <h2>Users Table</h2>
    <InteractiveTable :data="usersData" :columns="userColumns" />

    <h2>Products Table</h2>
    <InteractiveTable :data="productsData" :columns="productColumns" />
  </div>
</template>

<script>
import InteractiveTable from '@/components/InteractiveTable.vue'

export default {
  components: {
    InteractiveTable
  },
  data() {
    return {
      usersData: [
        { id: 1, name: 'Alice', email: 'alice@example.com' },
        { id: 2, name: 'Bob', email: 'bob@example.com' },
        { id: 3, name: 'Charlie', email: 'charlie@example.com' }
        // Add more users as needed
      ],
      userColumns: [
        { label: 'ID', field: 'id' },
        { label: 'Name', field: 'name' },
        { label: 'Email', field: 'email' }
      ],
      productsData: [
        { id: 1, name: 'Product A', price: 29.99 },
        { id: 2, name: 'Product B', price: 39.99 },
        { id: 3, name: 'Product C', price: 49.99 }
        // Add more products as needed
      ],
      productColumns: [
        { label: 'ID', field: 'id' },
        { label: 'Name', field: 'name' },
        { label: 'Price', field: 'price' }
      ]
    }
  }
}
</script> -->

<!-- <script setup>
import { ref } from 'vue'

const details = ref([])
const columns = [
  {
    key: 'avatar',
    label: '',
    filter: false,
    sorter: false
  },
  {
    key: 'name',
    _style: { width: '20%' }
  },
  {
    key: 'registered',
    sorter: (date1, date2) => {
      const a = new Date(date1.registered)
      const b = new Date(date2.registered)
      return a > b ? 1 : b > a ? -1 : 0
    }
  },
  {
    key: 'role',
    _style: { width: '20%' }
  },
  'status',
  {
    key: 'show_details',
    label: '',
    _style: { width: '1%' },
    filter: false,
    sorter: false
  }
]
const items = [
  {
    id: 1,
    name: 'Samppa Nori',
    avatar: '1.jpg',
    registered: '2021/03/01',
    role: 'Member',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Estavan Lykos',
    avatar: '2.jpg',
    registered: '2018/02/07',
    role: 'Staff',
    status: 'Banned'
  },
  {
    id: 3,
    name: 'Chetan Mohamed',
    avatar: '3.jpg',
    registered: '2020/01/15',
    role: 'Admin',
    status: 'Inactive',
    _selected: true
  },
  {
    id: 4,
    name: 'Derick Maximinus',
    avatar: '4.jpg',
    registered: '2019/04/05',
    role: 'Member',
    status: 'Pending'
  },
  {
    id: 5,
    name: 'Friderik Dávid',
    avatar: '5.jpg',
    registered: '2022/03/25',
    role: 'Staff',
    status: 'Active'
  },
  {
    id: 6,
    name: 'Yiorgos Avraamu',
    avatar: '6.jpg',
    registered: '2017/01/01',
    role: 'Member',
    status: 'Active'
  },
  {
    id: 7,
    name: 'Avram Tarasios',
    avatar: '7.jpg',
    registered: '2016/02/12',
    role: 'Staff',
    status: 'Banned',
    _selected: true
  },
  {
    id: 8,
    name: 'Quintin Ed',
    avatar: '8.jpg',
    registered: '2023/01/21',
    role: 'Admin',
    status: 'Inactive'
  },
  {
    id: 9,
    name: 'Enéas Kwadwo',
    avatar: '9.jpg',
    registered: '2024/03/10',
    role: 'Member',
    status: 'Pending'
  },
  {
    id: 10,
    name: 'Agapetus Tadeáš',
    avatar: '10.jpg',
    registered: '2015/01/10',
    role: 'Staff',
    status: 'Active'
  },
  {
    id: 11,
    name: 'Carwyn Fachtna',
    avatar: '11.jpg',
    registered: '2014/04/01',
    role: 'Member',
    status: 'Active'
  },
  {
    id: 12,
    name: 'Nehemiah Tatius',
    avatar: '12.jpg',
    registered: '2013/01/05',
    role: 'Staff',
    status: 'Banned',
    _selected: true
  },
  {
    id: 13,
    name: 'Ebbe Gemariah',
    avatar: '13.jpg',
    registered: '2012/02/25',
    role: 'Admin',
    status: 'Inactive'
  },
  {
    id: 14,
    name: 'Eustorgios Amulius',
    avatar: '14.jpg',
    registered: '2011/03/19',
    role: 'Member',
    status: 'Pending'
  },
  {
    id: 15,
    name: 'Leopold Gáspár',
    avatar: '15.jpg',
    registered: '2010/02/01',
    role: 'Staff',
    status: 'Active'
  }
]

const formatDate = (date) => {
  const _date = new Date(date)
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }

  return _date.toLocaleDateString('en-US', options)
}

const getBadge = (status) => {
  switch (status) {
    case 'Active':
      return 'success'
    case 'Inactive':
      return 'secondary'
    case 'Pending':
      return 'warning'
    case 'Banned':
      return 'danger'
    default:
      'primary'
  }
}

const toggleDetails = (item) => {
  if (details.value.includes(item._id)) {
    details.value = details.value.filter((_item) => _item !== item._id)
    return
  }

  details.value.push(item._id)
}
</script>
<template>
  <CSmartTable
    :activePage="2"
    cleaner
    columnFilter
    :columns="columns"
    columnSorter
    clickableRows
    footer
    :items="items"
    :itemsPerPage="5"
    itemsPerPageSelect
    pagination
    selectable
    :sorterValue="[{ column: 'status', state: 'asc' }]"
    :tableBodyProps="{
      className: 'align-middle'
    }"
    tableFilter
    :tableProps="{
      striped: true,
      hover: true
    }"
  >
    <template #avatar="{ item }">
      <td>
        <CAvatar :src="$withBase(`/images/avatars/${item.avatar}`)" />
      </td>
    </template>
    <template #registered="{ item }">
      <td>
        {{ formatDate(item.registered) }}
      </td>
    </template>
    <template #status="{ item }">
      <td>
        <CBadge :color="getBadge(item.status)">{{ item.status }}</CBadge>
      </td>
    </template>
    <template #show_details="{ item, index }">
      <td class="py-2">
        <CButton
          color="primary"
          variant="outline"
          square
          size="sm"
          @click="toggleDetails(item, index)"
        >
          {{ Boolean(item._toggled) ? 'Hide' : 'Show' }}
        </CButton>
      </td>
    </template>
    <template #details="{ item }">
      <CCollapse :visible="details.includes(item._id)">
        <div class="p-3">
          <h4>
            {{ item.name }}
          </h4>
          <p class="text-body-secondary">User since: {{ item.registered }}</p>
          <CButton size="sm" color="info">User Settings</CButton>
          <CButton size="sm" color="danger" class="ms-1">Delete</CButton>
        </div>
      </CCollapse>
    </template>
  </CSmartTable>
</template> -->

<template>
  <div class="container">
    <div class="header">
      <h1>WEATHER APP</h1>
      <div class="search-bar">
        <input type="text" v-model="city" placeholder="Enter city name" class="search-input" />
        <button @click="searchByCity" class="search-button">Search</button>
      </div>
    </div>

    <main>
      <div v-if="weatherData">
        <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>

        <div>
          <img :src="iconUrl" alt="Weather Icon" />
          <p>{{ temperature }} °C</p>
        </div>

        <span>{{ weatherData.weather[0].description }}</span>
      </div>

      <p v-if="error">{{ error }}</p>
    </main>
  </div>
</template>

<script>
// The info section in 10.1.1 provided detailed information about this package
import axios from 'axios'

const apikey = '1bb5027dec8149ef020494d26d044c16'

export default {
  name: 'App',
  data() {
    return {
      city: '',
      weatherData: null,
      hourlyForecast: [],
      dailyForecast: []
    }
  },
  //computed is a property that is used to define a property that
  //is dependent on other data properties.
  //If we using a more easy to understand words to understand the concept:
  //the derived value such as temperature automatically update when the relevant value change.
  computed: {
    //There are multiple way to obtain the data in Celsius format.
    //Calculation by yourself like below after data is retireved or via API parameters

    //Example of adding additional units requirement, if you choose this, remember to change section 3.1
    //https://api.openweathermap.org/data/2.5/weather?lat=XXX&lon=-XXX.15&appid={API key}&units=metric
    temperature() {
      return this.weatherData ? Math.floor(this.weatherData.main.temp - 273) : null
    },
    //Get the current weather icon using the API link
    iconUrl() {
      return this.weatherData
        ? `http://api.openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
        : null
    }
  },
  //There are two steps involved in this,
  //step 1: identify current location
  //step 2: after identify, get the weather data straight based on the current location.
  mounted() {
    this.fetchCurrentLocationWeather()
  },
  methods: {
    //Async in a easy to understand way means the method will run in backend thread,
    //And it won't occupy the main thread, so the user experience is still smooth
    async fetchCurrentLocationWeather() {
      //The navigator.geolocation object is part of the Web API provided by modern web browsers
      //Please note this function is not belongs to Vue or openweather.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords
          //API link to obtain the current weather based on the current location browser identified
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`
          //await means wait for the fetchWeatherData method to complete before proceeding
          await this.fetchWeatherData(url)
        })
      }
    },
    async fetchWeatherData(url) {
      try {
        const response = await axios.get(url)
        //Returned data from API is stored as JSON file in weatherData
        this.weatherData = response.data
      } catch (error) {
        console.error('Error fetching weather data:', error)
      }
    },
    async searchByCity() {
      if (!this.city) return
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apikey}`
      await this.fetchWeatherData(url)
    }
  }
}
</script>

<style></style>

<!--<template>
  <div class="text-center">
    <h1>Join Us</h1>
    <p></p>
    <router-view />
  </div>
</template> -->
