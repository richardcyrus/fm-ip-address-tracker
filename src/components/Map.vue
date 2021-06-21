<template>
  <div id="map"></div>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import locationIcon from '../assets/images/icon-location.svg'

export default {
  name: 'Map',
  props: {
    latitude: Number,
    longitude: Number,
  },
  data() {
    return {
      mapDiv: null,
      markerIcon: L.icon({
        iconUrl: locationIcon,
        iconSize: [46, 56],
        iconAnchor: [26, 56],
      })
    }
  },
  watch: {
    latitude: function (val, oldVal) {
      this.replaceMap()
    },
  },
  methods: {
    setupLeafletMap: function () {
      this.mapDiv = L.map('map').fitWorld()
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.mapDiv)
    },
    setView() {
      this.mapDiv = L.map('map').setView([this.latitude, this.longitude], 16)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.mapDiv)

      L.marker([this.latitude, this.longitude], { icon: this.markerIcon }).addTo(
        this.mapDiv
      )
    },
    replaceMap() {
      this.mapDiv.remove()
      this.setView()
    },
  },
  mounted() {
    this.setupLeafletMap()
  },
}
</script>
