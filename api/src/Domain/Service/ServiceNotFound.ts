import type Server from '../Server/Server'

export class ServiceNotFound extends Error {
  constructor (
    public readonly serviceName: string,
    public readonly server?: Server
  ) {
    super(`Service ${serviceName} not found`)
  }

  static withServer (serviceName: string, server: Server): ServiceNotFound {
    return new ServiceNotFound(`${serviceName} on ${server.name}`)
  }
}
