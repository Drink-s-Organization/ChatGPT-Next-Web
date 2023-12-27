interface RequestOptions {
  method?: string;
  data?: object;
}

interface RequestResult<T> {
  onFinish: (data: T) => void;
  onError?: (error: Error) => void;
}

export async function httpRequest<T>(
  url: string,
  options: RequestOptions,
  callback: RequestResult<T>,
) {
  try {
    const { method = "POST", data = {} } = options;
    url = `http://localhost:8888${url}`;
    const requestOptions: RequestInit = {
      method: method.toUpperCase(),
      body: method.toUpperCase() === "GET" ? undefined : JSON.stringify(data), // 如果是 GET 请求则不发送 body,
    };
    const token = localStorage.getItem("Authorization");
    if (token != undefined) {
      requestOptions.headers = {
        Authorization: String(token),
      };
    }
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const resp = await response.json();
    return callback.onFinish(resp);
  } catch (error) {
    if (callback.onError) {
      callback.onError(error as Error);
    } else {
      console.error("Error during HTTP request:", error);
    }
  }
}
