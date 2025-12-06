// storage-adapter-import-placeholder
import { s3Storage } from '@payloadcms/storage-s3'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { ThemeSettings } from './ThemeSettings/config'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Categories } from './collections/Categories'
import { Users } from './collections/Users/index'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Branding } from './Branding/config'
import { Header } from './Header/config'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Check if R2 credentials are configured (for production)
const useR2Storage =
  process.env.R2_BUCKET_NAME &&
  process.env.R2_ACCOUNT_ID &&
  process.env.R2_ACCESS_KEY_ID &&
  process.env.R2_SECRET_ACCESS_KEY

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    autoLogin:
      process.env.NODE_ENV === 'development'
        ? {
            email: 'saajanpatel@hotmail.com',
            password: 'Password123!',
            prefillOnly: true,
          }
        : false,
  },
  routes: {
    admin: '/portal',
  },
  collections: [Pages, Posts, Categories, Users, Media],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
  sharp,
  globals: [Header, ThemeSettings, Branding],
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
    ...(useR2Storage
      ? [
          s3Storage({
            collections: {
              media: true,
            },
            bucket: process.env.R2_BUCKET_NAME!,
            config: {
              credentials: {
                accessKeyId: process.env.R2_ACCESS_KEY_ID!,
                secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
              },
              region: 'auto',
              endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
            },
          }),
        ]
      : []),
  ],
  cors: [
    process.env.PAYLOAD_URL || 'http://localhost:3000',
    process.env.FRONTEND_URL || 'http://localhost:4000',
  ].filter(Boolean),
})
