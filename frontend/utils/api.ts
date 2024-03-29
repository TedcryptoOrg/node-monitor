type BeforeRequestFunction = () => void;
type SuccessCallbackFunction<T> = (data: T) => void;
type ErrorCallbackFunction = (error: Error) => void;

enum RequestType {
  DELETE = 'DELETE',
  GET = 'GET',
  HEAD = 'HEAD',
  OPTIONS = 'OPTIONS',
  PATCH = 'PATCH',
  POST = 'POST',
  PUT = 'PUT',
}

interface FetchOptions {
  method: RequestType;
  url?: string;
  path?: string;
  body?: any;
  beforeRequest?: BeforeRequestFunction;
  successCallback?: SuccessCallbackFunction<any>;
  errorCallback?: ErrorCallbackFunction;
  delay?: number;
}

async function apiCall<T>(options: FetchOptions): Promise<void> {
  const {
    method,
    url,
    path,
    body,
    beforeRequest,
    successCallback,
    errorCallback,
    delay,
  } = options;
  const defaultUrl = process.env.NEXT_PUBLIC_API_HOST;

  const endpointUrl = options.url ? options.url : defaultUrl;
  try {
    if (delay) {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    beforeRequest && beforeRequest();

    if (endpointUrl) {
      const response = await fetch(endpointUrl + (path ? path : ''), {
        mode: 'cors',
        method,
        headers: {
          'Content-Type': 'application/json', // add more headers here if needed
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      successCallback && successCallback(data);
    }
  } catch (error) {
    errorCallback && errorCallback(error as any);
  }
}

export { apiCall, RequestType };

export type {
  BeforeRequestFunction,
  SuccessCallbackFunction,
  ErrorCallbackFunction,
};
