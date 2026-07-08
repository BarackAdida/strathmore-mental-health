```markdown
# MindBridge Mental Health Web

## Features

- Choose between **Peer Support**, **Random Psychologist**, or **Specific Psychologist**
- View available peer counselors
- Select a preferred psychologist (if applicable)
- Fill in personal details and preferred date/time
- Receive a confirmation modal upon successful booking

## Prerequisites
- *.env* file with:
    VITE_ADMIN_USER
    VITE_ADMIN_PASS
    ***When the web runs, it will automatically create an admin user***
- **Node.js** (v14 or higher)
- **npm** (comes with Node)

## Getting Started

Follow these steps to run the project locally.

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd <project-folder>
```

### 2. Install dependencies

Using npm:

```bash
npm install
```

Or using yarn:

```bash
yarn
```

### 3. Start the development server

```bash
npm run dev
```

or

```bash
yarn dev
```

This will start the Vite development server. Open [http://localhost:5173](http://localhost:5173) (or the port shown in the terminal) to view the app.

### 4. Build for production

To create a production build:

```bash
npm run build
```

or

```bash
yarn build
```

The built files will be in the `dist` folder.

### 5. Preview the production build

```bash
npm run preview
```

or

```bash
yarn preview
```

This serves the built app locally for testing.

## Project Structure

```
├── src
│   ├── Styles
│   │   └── BookAppointment.css   # Styles for the booking page
│   ├── BookAppointment.jsx       # Main booking component
│   └── ...                       # Other components, pages, hooks
├── public
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Technologies Used

- [React](https://reactjs.org/) – UI library
- [Vite](https://vitejs.dev/) – Build tool and development server
- [React Router](https://reactrouter.com/) – Navigation between pages (if used)
- [CSS Modules / plain CSS] – Styling (as seen in the import)

## Notes

- This project currently uses **dummy data** for psychologists and peer counselors. Replace with real API endpoints as needed.
- The `navigate('/')` on confirmation redirects to the home page; adjust to your routing logic.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is for educational purposes and is not licensed for commercial use.
```