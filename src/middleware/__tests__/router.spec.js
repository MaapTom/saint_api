const { extractRequest, handler } = require('../router')

const cases = [
  {
    url: '/saint/1',
    method: 'GET',
    expectStringFormat: '/saint:get',
    expectWriteResponse: "{\"id\":1}"
  },
  {
    url: '/saint',
    method: 'POST',
    expectStringFormat: '/saint:post',
    expectWriteResponse: 'Hello, your connection with the API is working'
  }
]

const DEFAULT_HEADER = { 'Content-Type': 'application/json' }

jest.mock("@supabase/supabase-js", () => ({
  createClient: jest.fn()
}))

jest.mock("../../factories/saintFactory", () => ({
  generateInstance: () => ({ 
    getSaint: () => {
      return { id: 1 }
    }
  })
}))

describe("Test router", () => {
  test.each(cases)("Return the formated string object key", (requestCases) => {
    const URLExtract = extractRequest(requestCases)

    expect(URLExtract.path).toBe(requestCases.expectStringFormat)
  })

  test.each(cases)("Get a correct route", async (requestCases) => {
    const response = {
      writeHead: jest.fn(),
      write: jest.fn(),
      end: jest.fn()
    }

    await handler(requestCases, response)
    expect(response.write.mock.calls[0][0]).toBe(requestCases.expectWriteResponse)
  })
})
