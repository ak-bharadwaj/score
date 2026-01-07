 yarn build
yarn run v1.22.22
warning ..\..\..\..\package.json: No license field
$ tsc -p . && tsoa spec-and-routes
Done in 16.36s.
PS C:\Users\dorni\OneDrive\Desktop\score\Scoreboard-backend> yarn start 
yarn run v1.22.22
warning ..\..\..\..\package.json: No license field
$ node dist/index.js
C:\Users\dorni\OneDrive\Desktop\score\Scoreboard-backend\node_modules\mongoose\lib\connection.js:805
    err = new ServerSelectionError();
          ^

MongooseServerSelectionError: connect ECONNREFUSED 127.0.0.1:27017
    at _handleConnectionErrors (C:\Users\dorni\OneDrive\Desktop\score\Scoreboard-backend\node_modules\mongoose\lib\connection.js:805:11)   
    at NativeConnection.openUri (C:\Users\dorni\OneDrive\Desktop\score\Scoreboard-backend\node_modules\mongoose\lib\connection.js:780:11) {
  reason: TopologyDescription {
    type: 'Unknown',
    servers: Map(1) {
      '127.0.0.1:27017' => ServerDescription {
        address: '127.0.0.1:27017',
        type: 'Unknown',
        hosts: [],
        passives: [],
        arbiters: [],
        tags: {},
        minWireVersion: 0,
        maxWireVersion: 0,
        roundTripTime: -1,
        lastUpdateTime: 86443440,
        lastWriteDate: 0,
        error: MongoNetworkError: connect ECONNREFUSED 127.0.0.1:27017
            at connectionFailureError (C:\Users\dorni\OneDrive\Desktop\score\Scoreboard-backend\node_modules\mongodb\lib\cmap\connect.js:367:20)
            at Socket.<anonymous> (C:\Users\dorni\OneDrive\Desktop\score\Scoreboard-backend\node_modules\mongodb\lib\cmap\connect.js:290:22)
            at Object.onceWrapper (node:events:623:26)
            at Socket.emit (node:events:508:28)
            at emitErrorNT (node:internal/streams/destroy:170:8)
            at emitErrorCloseNT (node:internal/streams/destroy:129:3)
            at process.processTicksAndRejections (node:internal/process/task_queues:89:21) {
          cause: Error: connect ECONNREFUSED 127.0.0.1:27017
              at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1637:16) {
            errno: -4078,
            code: 'ECONNREFUSED',
            syscall: 'connect',
            address: '127.0.0.1',
            port: 27017
          },
          Symbol(errorLabels): Set(1) { 'ResetPool' }
        },
        topologyVersion: null,
        setName: null,
        setVersion: null,
        electionId: null,
        logicalSessionTimeoutMinutes: null,
        primary: null,
        me: null,
        '$clusterTime': null
      }
    },
    stale: false,
    compatible: true,
    heartbeatFrequencyMS: 10000,
    localThresholdMS: 15,
    setName: null,
    maxElectionId: null,
    maxSetVersion: null,
    commonWireVersion: 0,
    logicalSessionTimeoutMinutes: null
  },
  code: undefined
}

Node.js v24.11.1
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
PS C:\Users\dorni\OneDrive\Desktop\score\Scoreboard-backend> This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and pushed to [_InterIIT-Sports Organization_](https://github.com/InterIIT-Sports)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`
### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!


### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
