

export const makeRequest = async (url, data = undefined, method) => {
  const baseUrl = "http://localhost:3456"
  let requestJson = {
    method: method,
    headers: { "Content-Type": "application/json" },
  }
  if (method !== "GET") {
    requestJson.body = JSON.stringify(data)
  }
  let response = await fetch(baseUrl + url, requestJson)
  if (!response.ok) {
    console.log('Error')
    return
  } if (response.headers.get("Content-Type") === "audio/wav") {
    data = await response.blob()
    return data
  }
  data = await response.json()
  console.log(data)
  return data
}