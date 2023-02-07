import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_ID,
  apiVersion: '2023-01-04',
  token: process.env.NEXT_PUBLIC_SANITY_WRITE_KEY,
  useCdn: false,
}

export const client = sanityClient(config)

const builder = imageUrlBuilder(client)
export const urlFor = source => builder.image(source)
