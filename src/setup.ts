import { server } from './mocks/server'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
console.log(server, 'server')
afterAll(() => server.close())
afterEach(() => server.resetHandlers())