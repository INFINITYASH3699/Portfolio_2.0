# Yash Hulle Portfolio

![Portfolio Screenshot](public/images/hero-bg.jpg)

A modern, interactive portfolio website showcasing Yash Hulle's skills, projects and experience as a web developer. The portfolio features stunning 3D effects, animations, and a responsive design.

## 🌟 Features

- **Modern UI/UX Design**: Clean, professional interface with attention to details
- **3D Effects**: Interactive 3D particles and card effects powered by Three.js
- **Animations**: Smooth scroll animations and transitions using Framer Motion
- **Responsive Layout**: Optimized for all device sizes
- **Interactive Elements**: Hover effects, parallax scrolling, and animated components
- **Easy to Update**: Data-driven content through JSON files for easy updates
- **SEO Friendly**: Proper metadata and semantic HTML

## 💻 Tech Stack

- **Framework**: Next.js
- **Styling**: Tailwind CSS
- **JavaScript**: ES6+
- **Animation**: Framer Motion
- **3D Graphics**: Three.js with React Three Fiber/Drei
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (or Bun)
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/yash-portfolio.git
   cd yash-portfolio
   ```

2. Install dependencies:
   ```bash
   bun install
   # or
   npm install
   ```

3. Run the development server:
   ```bash
   bun run dev
   # or
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 📝 Customization

### Updating Personal Information

Edit the `src/data/portfolio-data.json` file to update:

- Personal details and contact information
- Skills and technologies
- Work experience
- Projects
- Education and certifications

### Styling

The project uses Tailwind CSS for styling. Global styles are defined in `src/app/globals.css`.

### Adding Projects

To add a new project:
1. Add the project information to `src/data/portfolio-data.json` in the projects array
2. Add project images to `public/images/`

## 📱 Responsive Design

The portfolio is optimized for:
- Mobile devices
- Tablets
- Desktop computers

## 🏗️ Project Structure

```
├── public/             # Static assets
│   └── images/         # Image files
├── src/
│   ├── app/            # Next.js App Router
│   ├── components/     # React components
│   ├── data/           # JSON data files
│   └── hooks/          # Custom React hooks
└── package.json        # Dependencies and scripts
```

## 🚀 Deployment

This project is configured for deployment to Vercel:

```bash
# Build for production
bun run build

# Deploy to Vercel
vercel
```

## 🔧 Performance Optimization

- Static site generation for fast loading
- Optimized images and assets
- Code splitting and lazy loading

## 📄 License

MIT License

## 🙏 Acknowledgements

- Three.js for 3D graphics
- Framer Motion for animations
- Next.js team for the amazing framework
- Tailwind CSS for styling utilities

---

Developed with ❤️ by Yash Hulle
