import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'adworks-aws-files',
  access: (allow) => ({
    'images/*': [allow.authenticated.to(['read', 'write', 'delete'])],
    'videos/*': [allow.authenticated.to(['read', 'write', 'delete'])],
    'audios/*': [allow.authenticated.to(['read', 'write', 'delete'])],
  }),
});
