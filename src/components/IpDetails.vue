<template>
  <div class="details__panel">
    <div class="details__block">
      <p class="details__label">IP Address</p>
      <p class="details__value" id="ip-address">{{ ipAddress }}</p>
    </div>
    <div class="details__block">
      <p class="details__label">Location</p>
      <p class="details__value" id="location">{{ location }}</p>
    </div>
    <div class="details__block">
      <p class="details__label">Timezone</p>
      <p class="details__value">
        UTC <span id="timezone">{{ timezone }}</span>
      </p>
    </div>
    <div class="details__block">
      <p class="details__label">ISP</p>
      <p class="details__value" id="isp">{{ isp }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ip-details',
  props: {
    ipAddress: String,
    location: String,
    timezone: String,
    isp: String,
  },
}
</script>
