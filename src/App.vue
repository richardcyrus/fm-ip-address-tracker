<template>
  <header class="container__header">
    <h1 class="app__title">IP Address Tracker</h1>
    <form @submit.prevent="search">
      <div class="form__control">
        <div class="input__group">
          <label for="search" class="sr-only"
            >Search for any IP address or domain</label
          >
          <input
            type="text"
            placeholder="Search for any IP address or domain"
            name="search"
            id="search"
            v-model.trim="searchTerm"
          />
          <button type="submit" class="button" aria-label="Start search">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 11 14"
              width="11"
              height="14"
            >
              <path
                fill="none"
                stroke="#FFF"
                stroke-width="3"
                d="M2 1l6 6-6 6"
              />
            </svg>
          </button>
        </div>
      </div>
    </form>
  </header>
  <ip-details v-bind="ipDetails"></ip-details>
  <Map v-bind="{ latitude, longitude }"></Map>
</template>

<script>
import Map from './components/Map.vue'
import IpDetails from './components/IpDetails.vue'
import validator from 'validator'
import IpifyDataService from './services/IpifyDataService'
import axios from 'axios'

export default {
  components: { Map, IpDetails },
  data() {
    return {
      latitude: null,
      longitude: null,
      searchTerm: '',
      ipDetails: {
        ipAddress: '',
        location: '',
        timezone: '',
        isp: '',
      },
    }
  },
  methods: {
    search() {
      if (validator.isFQDN(this.searchTerm)) {
        IpifyDataService.getByDomain(this.searchTerm)
          .then((response) => {
            const { ip, location, isp } = response.data
            this.setSearchResults(ip, location, isp)
          })
          .catch((err) => console.error(err))
      } else if (validator.isIP(this.searchTerm)) {
        IpifyDataService.getByIp(this.searchTerm)
          .then((response) => {
            const { ip, location, isp } = response.data
            this.setSearchResults(ip, location, isp)
          })
          .catch((err) => console.error(err))
      }
      this.searchTerm = ''
    },
    setSearchResults(ip, location, isp) {
      this.ipDetails.ipAddress = ip
      this.ipDetails.location = `${location.city}, ${location.region} ${location.postalCode}`
      this.ipDetails.timezone = location.timezone
      this.ipDetails.isp = isp

      this.latitude = location.lat
      this.longitude = location.lng
    },
    initializeApp() {
      // Get the user's current IP.
      axios.get('https://freegeoip.app/json/')
        .then(response => {
          return response.data.ip
        })
        .then(clientIp => {
          IpifyDataService.getByIp(clientIp)
            .then((response) => {
              const { ip, location, isp } = response.data
              this.setSearchResults(ip, location, isp)
            })
            .catch((err) => console.error(err))
        })
        .catch((err) => console.error(err))
    },
  },
  mounted() {
    this.initializeApp()
  },
}
</script>
