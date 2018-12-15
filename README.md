**Warning:** 
The successful deployment is only possible on a dedicated hardware system that BloSS was evaluated on. 

# User Interface of `bloss-dashboard`
- The `bloss-dashboard` component is a front-end dashboard displaying relevant information for the human analyst. The bloss-dashboard is implemented as a single-page application (SPA) and attached to [bloss-node](http://github.com/blockchain-signaling-system/bloss-node) via WebSockets. 

![bloss-dashboard-all-states-c600](/figures/bloss-dashboard-all-states-c600.png)

# BloSS architecture
- **The Blockchain Signaling System (BloSS) architecture consists of three components.**
  - **`bloss-core`**: The  [bloss-core](http://github.com/blockchain-signaling-system/bloss-core) component monitors and manages the network traffic of the underlying infrastructure and takes care of the communication with the private PoA Ethereum blockchain, the InfluxDB and also communicates with `bloss-node`. The RESTful interface is used to exchange information (e.g. attack_reports, blocking status, traffic breaches) with bloss-node. 
  - **`bloss-node`**: : Essentially, the [bloss-node](http://github.com/blockchain-signaling-system/bloss-node) component acts as a relay server for communication between `bloss-core` and `bloss-dashboard`. To achieve (near) real-time communication, a WebSocket interface is used to exchange data with the front-end bloss-dashboard. Additionally, bloss-node handles state management of attack_reports and has a RESTful interface for direct communication with other instances of bloss-node running on other Autonomous Systems. 
  - **`bloss-dashboard`**: This repository. The `bloss-dashboard` component is a front-end dashboard displaying relevant information for the human analyst. The bloss-dashboard is implemented as a single-page application (SPA) and attached to `bloss-node`

![bloss-full-architecture](/figures/bloss-full-architecture.png)

## Installation 
The successful installation is only possible on a dedicated hardware system that it was evaluated on. 

### Project setup
```
npm install
# Compiles and hot-reloads for development
npm run serve 
# Compiles and minifies for production
npm run build
# Linting 
npm run lint
```

