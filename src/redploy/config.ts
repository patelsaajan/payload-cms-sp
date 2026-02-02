import type { GlobalConfig } from 'payload'

export const Redeploy: GlobalConfig = {
  slug: 'redeploy',
  access: {
    read: () => true,
  },
  admin: {
    components: {
      elements: {
        SaveButton: '@/redploy/components/EmptyButton#EmptyButton',
      },
    },
  },
  fields: [
    {
      name: 'redeployment',
      type: 'ui',
      admin: {
        components: {
          Field: '@/redploy/components/RedeploymentButton#RedeploymentButton',
        },
      },
    },
  ],
}
