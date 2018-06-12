import fetch from 'isomorphic-fetch'
import humps from 'humps'

const handleErrors = response =>
  new Promise((resolve, reject) => {
    if (!response) {
      reject(new Error('No response returned from fetch'))
      return
    }

    if (response.ok) {
      resolve(response)
      return
    }

    response.json()
      .then((json) => {
        const error = json || { message: response.statusText }
        reject(error)
      }).catch(() => reject(new Error('Response not JSON')))
  })

const getResponseBody = (response) => {
  const bodyIsEmpty = response.status === 204
  if (bodyIsEmpty) {
    return Promise.resolve()
  }
  return response.json()
}

class Api {
  static performRequest (uri, apiUrl, requestData = {}) {
    const url = `${apiUrl}${uri}`
    return new Promise((resolve, reject) => {
      fetch(url, requestData)
        .then(handleErrors)
        .then(getResponseBody)
        .then(response => resolve(humps.camelizeKeys(response)))
        .catch(error => reject(humps.camelizeKeys(error)))
    })
  }

  static get (uri, apiUrl = process.env.API_URL) {
    const requestData = {
      method: 'get',
      headers: {
        Accept: 'application/json',
      },
    }
    return Api.performRequest(uri, apiUrl, requestData)
  }

  static post (uri, data, apiUrl = process.env.API_URL) {
    const decamelizeData = humps.decamelizeKeys(data)
    const requestData = {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(decamelizeData),
    }
    return Api.performRequest(uri, apiUrl, requestData)
  }

  static delete (uri, data, apiUrl = process.env.API_URL) {
    const decamelizeData = humps.decamelizeKeys(data)
    const requestData = {
      method: 'delete',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(decamelizeData),
    }
    return Api.performRequest(uri, apiUrl, requestData)
  }

  static put (uri, data, apiUrl = process.env.API_URL) {
    const decamelizeData = humps.decamelizeKeys(data)
    const requestData = {
      method: 'put',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(decamelizeData),
    }
    return Api.performRequest(uri, apiUrl, requestData)
  }

  static patch (uri, data, apiUrl = process.env.API_URL) {
    const decamelizeData = humps.decamelizeKeys(data)
    const requestData = {
      method: 'patch',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(decamelizeData),
    }
    return Api.performRequest(uri, apiUrl, requestData)
  }
}

export default new Api()
