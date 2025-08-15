# Automated InvoiceGenerator

A modern, responsive healthcare management system with invoice generation capabilities. Built with React, Node.js, Express, and MySQL.

link: https://689f1b0c864d460008acd276--healthcaremanagementsystem2.netlify.app/

## Features

- 🏥 **Automated Invoice Generator Interface** - Clean, professional design with healthcare branding
- 📄 **Invoice Management** - Create, view, and download professional invoices
- 👥 **Client Management** - Add and manage client information
- 📊 **Dashboard Analytics** - View invoice statistics and financial summaries
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- 🎨 **Modern UI/UX** - Glass-morphism design with smooth animations
- 📋 **PDF Generation** - Download invoices as PDF documents
- 🔍 **Search & Filter** - Find invoices quickly with advanced filtering

## Technologies Used

### Frontend
- React 18
- React Router DOM
- Bootstrap 5
- Font Awesome Icons
- Modern CSS with animations and glass-morphism effects

### Backend
- Node.js
- Express.js
- MySQL2
- PDFKit for PDF generation
- CORS, Helmet, Morgan for security and logging

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MySQL database
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Automated InvoiceGenerator
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up the database**
   - Create a MySQL database
   - Run the SQL scripts in `backend/sql/`:
     ```bash
     mysql -u your_username -p your_database < backend/sql/schema.sql
     mysql -u your_username -p your_database < backend/sql/sample_data.sql
     ```

4. **Configure environment variables**
   - Create a `.env` file in the `backend` directory:
     ```env
     DB_HOST=localhost
     DB_USER=your_username
     DB_PASSWORD=your_password
     DB_NAME=your_database
     PORT=3000
     CORS_ORIGIN=http://localhost:5173
     ```

### Running the Application

#### Development Mode (Recommended)

Run both frontend and backend simultaneously:
```bash
npm run dev
```

This will start:
- Backend API server on `http://localhost:3000`
- Frontend development server on `http://localhost:5173`

#### Production Mode

1. **Build the frontend**
   ```bash
   npm run build
   ```

2. **Start the backend server**
   ```bash
   npm start
   ```

### Individual Services

#### Backend Only
```bash
npm run dev:backend
```

#### Frontend Only
```bash
npm run dev:frontend
```

## Project Structure

```
Automated-InvoiceGenerator/
├── backend/
│   ├── src/
│   │   ├── models/           # Database models
│   │   ├── routes/           # API routes
│   │   ├── utils/            # Utility functions
│   │   └── server.js         # Main server file
│   ├── sql/                  # Database schemas and sample data
│   └── package.json
├── frontend/
│   ├── components/           # React components
│   ├── src/pages/           # Page components
│   ├── api.js               # API client
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   ├── index.html           # HTML template
│   └── package.json
└── package.json             # Root package.json
```

## API Endpoints

### Clients
- `GET /api/clients` - Get all clients
- `POST /api/clients` - Create a new client

### Invoices
- `GET /api/invoices` - Get all invoices
- `GET /api/invoices/:id` - Get specific invoice
- `POST /api/invoices` - Create new invoice
- `GET /api/invoices/:id/pdf` - Download invoice as PDF

## Usage

1. **Access the application** at `http://localhost:5173`
2. **Add clients** using the "Add Client" form
3. **Create invoices** by selecting services and entering details
4. **View and manage** all invoices from the dashboard
5. **Download PDFs** of invoices for sharing or printing

## Key Improvements Made

### Enhanced UI/UX
- Modern glass-morphism design
- Smooth animations and transitions
- Responsive layout for all screen sizes
- Professional healthcare branding
- Interactive elements with hover effects
- Loading states and user feedback

### Code Quality
- Clean component structure
- Proper error handling
- Responsive design patterns
- Modern React patterns with hooks
- Optimized performance

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## 🚀 Deployment

### Quick Deployment

Use the included deployment script for easy setup:

**Windows:**
```bash
scripts\deploy.bat
```

**Linux/Mac:**
```bash
./scripts/deploy.sh
```

### Manual Deployment

#### Frontend (Netlify)
1. **Build**: `cd frontend && npm run build`
2. **Deploy**: Upload `frontend/dist` to Netlify or connect GitHub repository
3. **Configure**: Set `VITE_API_BASE_URL` environment variable

#### Backend (Multiple Options)
- **Railway** (Recommended): Easy MySQL + Node.js hosting
- **Heroku**: Classic PaaS with MySQL add-ons
- **DigitalOcean**: App Platform with managed databases
- **Render**: Modern hosting with PostgreSQL

### Detailed Instructions
- 📚 **[DEPLOYMENT.md](DEPLOYMENT.md)** - Complete deployment guide
- 🐙 **[GITHUB_SETUP.md](GITHUB_SETUP.md)** - GitHub repository setup

## 🔧 Environment Configuration

### Frontend Environment Variables
Create `frontend/.env`:
```env
VITE_API_BASE_URL=https://your-backend-api.com/api
```

### Backend Environment Variables
Create `backend/.env`:
```env
# Database
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=healthcare_management

# Server
PORT=3000
CORS_ORIGIN=https://your-app.netlify.app
```

## 📦 Deployment Files

The project includes all necessary deployment configurations:
- `netlify.toml` - Netlify deployment configuration
- `frontend/_redirects` - SPA routing for Netlify
- `.github/workflows/deploy.yml` - GitHub Actions for automatic deployment
- `.gitignore` - Git ignore patterns
- `scripts/deploy.*` - Deployment automation scripts

## 🌐 Live Demo

After deployment, your application will be available at:
- **Frontend**: `https://your-app-name.netlify.app`
- **Backend API**: `https://your-backend-service.com/api`

## Support

For support or questions, please contact the development team.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m "Add feature"`
4. Push to your branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
