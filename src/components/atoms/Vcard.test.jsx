import React from 'react'
import { render } from 'react-testing-library'
import { StaticQuery } from 'gatsby'
import Vcard, { constructVcard, toDataURL, init } from './Vcard'
import data from '../../../jest/__fixtures__/meta.json'

describe('Vcard', () => {
  beforeEach(() => {
    StaticQuery.mockImplementationOnce(({ render }) => render({ ...data }))

    global.URL.createObjectURL = jest.fn()
  })

  it('renders correctly', () => {
    const { container } = render(<Vcard />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('combined vCard download process finishes', async () => {
    await init(data.contentYaml)
    expect(global.URL.createObjectURL).toHaveBeenCalledTimes(1)
  })

  it('vCard can be constructed', async () => {
    const vcard = await constructVcard(
      'data:image/jpeg;base64,00',
      data.contentYaml
    )
    expect(vcard).toBeDefined()
  })

  it('Base64 from image can be constructed', async () => {
    const dataUrl = await toDataURL('hello', 'image/jpeg')
    expect(dataUrl).toBeDefined()
  })
})