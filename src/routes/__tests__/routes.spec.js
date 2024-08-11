const generateInstance = require("../../factories/saintFactory")
const routes = require("../routes")

const cases = [
  ["x8ddas"],
  [""],
  [false],
  [NaN],
  [undefined]
]

const response = {
  writeHead: jest.fn(),
  write: jest.fn(),
  end: jest.fn()
}

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

describe("Test routes", () => {
  test.each(cases)("Get an error from saint get route", async (idCases) => {
    const request = {
      queryString: {
        id: idCases
      }
    }

    const route = routes["/saint:get"]

    await route(request, response)
    expect(response.writeHead).toHaveBeenCalledWith(400, DEFAULT_HEADER)

  }),

  test("Get a sucessful response", async () => {
    const request = {
      queryString: {
        id: 1
      }
    }

    const route = routes["/saint:get"]
    
    await route(request, response)
    
    expect(response.writeHead).toHaveBeenCalledWith(200, DEFAULT_HEADER)
    expect(response.write).toHaveBeenCalledWith(JSON.stringify({ id: 1 }))
  })
})