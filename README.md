# Settlement Process Application

## Overview

This application implements a settlement process between two parties, Party A and Party B. The system handles iterative negotiation of settlement amounts by Party A, along with approvals or objections from Party B. The process ensures that all changes and responses are reflected on Party A's and Party B's interface.

## Features

- Party A can submit an initial settlement amount.
- Party A can modify and resubmit the settlement amount any number of times until Party B responds.
- Party B can dispute or agree to the submitted amount. If disputed, Party A can modify and resubmit the amount.
- Real-time updates are provided through polling.
- Context is used to manage state across components.

## Technologies Used

- **Frontend:** React, Next.js, TypeScript, Tailwind CSS
- **Backend:** NestJS, TypeORM, SQLite
- **State Management:** React Context API
- **HTTP Client:** Axios

## Installation

### Prerequisites

- Node.js (v14 or above)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:

   ```sh
   cd backend
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

3. Start the backend server:
   ```sh
   npm run start
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```sh
   cd ../frontend
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

3. Start the frontend development server:
   ```sh
   npm run dev
   ```

## Usage

### Party A Interface

1. Open your browser and navigate to `http://localhost:3000/party-a`.
2. Enter an initial settlement amount and submit.
3. If Party B disputes the amount, you will be able to modify and resubmit the amount.
4. If Party B agrees, the transaction will be marked as settled.

### Party B Interface

1. Open your browser and navigate to `http://localhost:3000/party-b`.
2. You will see the current settlement amount submitted by Party A.
3. You can either agree or dispute the amount.
4. If you dispute, Party A will be notified and can modify the amount.

## Project Structure

```
project-root
│
├── backend
│   ├── src
│   │   ├── app.module.ts
│   │   ├── main.ts
│   │   ├── settlement.controller.ts
│   │   ├── settlement.entity.ts
│   │   ├── settlement.service.ts
│   │
│   ├── tsconfig.json
│   ├── package.json
│   └── ...
│
├── frontend
│   ├── pages
│   │   ├── index.tsx
│   │   ├── party-a.tsx
│   │   ├── party-b.tsx
│   │
│   ├── context
│   │   └── SettlementContext.tsx
│   │
│   ├── types
│   │   └── Settlement.ts
│   │
│   ├── tsconfig.json
│   ├── package.json
│   └── ...
│
└── README.md
```

## Additional Information

- **Polling Interval:** The frontend uses a polling interval of 3 seconds to fetch the latest settlement data.
- **Error Handling:** Basic error handling is implemented for network requests.
