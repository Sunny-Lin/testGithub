const isProd = process.env.NODE_ENV === 'production'
const protocol = window.location.protocol
const dataTestHost = '192.168.0.187'
const defaultHost = isProd ? window.location.hostname : dataTestHost
const defaultPort = isProd ? window.location.port : '6060'

let servers = [
  {
    serverName: 'default-base',
    domainName: `${protocol}//${defaultHost}:${defaultPort}`
  },
  {
    serverName: 'mock-server',
    domainName: `${protocol}//yapi.tp-data.com/mock`
  },
  {
    serverName: 'kinship-domain',
    domainCode: 'KINSHIP_DOMAIN',
    default: `${protocol}//192.168.0.187:9000/api-kinship`
  }
]

export default servers
