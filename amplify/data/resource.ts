import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  PrivacySetting: a.enum([
    'PRIVATE',
    'FRIENDS_ONLY',
    'PUBLIC'
  ]),
  VideoSetting: a.enum([
    'COMMERCIAL',
    'MOVIE',
  ]),
  TaskStatus: a.enum([
    'COMPLETED',
    'TODO',
    'IN_PROGRESS',
    'BLOCKED',
  ]),

  Task: a.model({
    title: a.string(),
    description: a.string(),
    status: a.ref('TaskStatus'),
    dueDate: a.datetime(),
    notes: a.string(),
  }),

  Tag: a.model({
    name: a.string(),
    videos: a.hasMany('VideoTag', 'tagId'),
  }).secondaryIndexes((index) => [index('name')]),

  VideoTag: a.model({
    videoId: a.id().required(),
    tagId: a.id().required(),
    video: a.belongsTo('Video', 'videoId'),
    tag: a.belongsTo('Tag', 'tagId'),
  }),

  Video: a.model({
    title: a.string().required(),
    description: a.string(),
    tags: a.hasMany('VideoTag', 'videoId'),
    youtubeUrl: a.url(),
    url: a.url().required(),
    duration: a.integer(),
    fileSize: a.integer(),
    fileType: a.string(),
    thumbnailUrls: a.url().array(),
    playlistId: a.id(),
    playlist: a.belongsTo('Playlist', 'playlistId'),
    privacySetting: a.ref('PrivacySetting'),
    videoSetting: a.ref('VideoSetting'),
    commercialId: a.id(),
    commercial: a.belongsTo('Commercial', 'commercialId'),
  }).secondaryIndexes((index) => [index('title'), index('duration')]),

  Image: a.model({
    title: a.string().required(),
    description: a.string(),
    url: a.url().required(),
    fileSize: a.integer(),
    width: a.integer(),
    height: a.integer(),
    fileType: a.string(),
    privacySetting: a.ref('PrivacySetting'),
  }),

  Audio: a.model({
    title: a.string().required(),
    description: a.string(),
    duration: a.integer(),
    url: a.url().required(),
    fileSize: a.integer(),
    fileType: a.string(),
    privacySetting: a.ref('PrivacySetting'),
  }),

  Commercial: a.model({
    startTime: a.datetime(),
    endTime: a.datetime(),
    video: a.hasOne('Video', 'commercialId'),
    playlists: a.hasMany('PlaylistCommercial', 'commercialId'),
  }),

  PlaylistCommercial: a.model({
    playlistId: a.id().required(),
    commercialId: a.id().required(),
    playlist: a.belongsTo('Playlist', 'playlistId'),
    commercial: a.belongsTo('Commercial', 'commercialId'),
  }),

  Playlist: a.model({
    title: a.string().required(),
    description: a.string(),
    videos: a.hasMany('Video', 'playlistId'),
    startTime: a.datetime(),
    endTime: a.datetime(),
    privacySetting: a.ref('PrivacySetting'),
    devices: a.hasMany('PlaylistDevice', 'playlistId'),
    commercials: a.hasMany('PlaylistCommercial', 'playlistId'),
  }),

  PlaylistDevice: a.model({
    playlistId: a.id().required(),
    deviceId: a.id().required(),
    playlist: a.belongsTo('Playlist', 'playlistId'),
    device: a.belongsTo('Device', 'deviceId'),
  }),

  Device: a.model({
    serialNumber: a.string().required(),
    title: a.string().required(),
    description: a.string(),
    deviceGroup: a.string(),
    organization: a.string(),
    assetTag: a.string(),
    deviceVersion: a.string(),
    appVersion: a.string(),
    locationId: a.string(),
    activatedOn: a.datetime(),
    isOnline: a.boolean(),
    playlists: a.hasMany('PlaylistDevice', 'deviceId'),
  }),

}).authorization(allow => [allow.owner()]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: tasks } = await client.models.Todo.list()

// return <ul>{tasks.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
