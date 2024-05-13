export interface HttpClient {
  get: (url: string, options?: any) => Promise<any>

  post: (url: string, body?: any) => Promise<any>

  put: (url: string, body?: any) => Promise<any>

  delete: (url: string) => Promise<any>
}
