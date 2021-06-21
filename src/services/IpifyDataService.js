import axios from 'axios'

class IpifyDataService {
  getDefault() {
    return axios.get('/api/ipify')
  }

  getByDomain(domain) {
    return axios.get(`/api/ipify?domain=${domain}`)
  }

  getByIp(ipAddress) {
    return axios.get(`/api/ipify?ipAddress=${ipAddress}`)
  }
}

export default new IpifyDataService()
