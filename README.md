# Modern Portfolio Website

A modern, minimalist, and highly interactive personal portfolio website built with React, Vite, Tailwind CSS, GSAP ScrollTrigger, and Lenis.js. Features smooth scrolling, cinematic transitions, and a premium Apple-style aesthetic.

## ✨ Features

- **Modern Design**: Clean, minimalist design with Apple-inspired aesthetics
- **Smooth Scrolling**: Powered by Lenis.js for buttery-smooth scroll experience
- **Cinematic Animations**: GSAP ScrollTrigger for scroll-driven animations
- **Responsive Design**: Fully responsive across all devices
- **Interactive Elements**: Hover effects, micro-interactions, and scroll-triggered animations
- **Performance Optimized**: GPU-accelerated animations for smooth performance
- **Accessibility**: Proper semantic HTML and keyboard navigation support

## 🚀 Tech Stack

- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **GSAP** - Professional-grade animation library
- **Lenis.js** - Smooth scrolling library
- **Inter & Poppins** - Modern typography

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd portfolio-jeremiah
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the website.

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## 🎨 Customization

### Personal Information
Update the following files with your personal information:

1. **Hero Section** (`src/components/Hero.jsx`)
   - Update name and tagline
   - Modify CTA buttons

2. **About Section** (`src/components/About.jsx`)
   - Update bio and description
   - Add your photo
   - Modify skills list

3. **Projects Section** (`src/components/Projects.jsx`)
   - Replace with your actual projects
   - Update project images, descriptions, and links
   - Modify technologies used

4. **Contact Section** (`src/components/Contact.jsx`)
   - Update contact information
   - Add your social media links
   - Configure form submission

### Styling
- **Colors**: Modify the color palette in `tailwind.config.js`
- **Typography**: Update font families in `tailwind.config.js`
- **Animations**: Customize GSAP animations in individual components

### Images
Replace placeholder images with your actual photos:
- Hero background elements
- About section photo
- Project screenshots

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure build settings:
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - Deploy!

### Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `dist` folder
   - Or connect your GitHub repository for automatic deployments

### Other Platforms

The built files in the `dist` folder can be deployed to any static hosting service:
- GitHub Pages
- Firebase Hosting
- AWS S3 + CloudFront
- DigitalOcean App Platform

## 📱 Performance

This portfolio is optimized for performance:

- **Lazy Loading**: Images and components load as needed
- **GPU Acceleration**: Animations use transform and opacity for smooth performance
- **Code Splitting**: Automatic code splitting with Vite
- **Optimized Images**: Responsive images with proper sizing
- **Minimal Bundle**: Tree-shaking removes unused code

## 🎯 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📞 Support

If you have any questions or need help with customization, feel free to reach out:

- Email: your.email@example.com
- LinkedIn: [Your LinkedIn Profile]
- GitHub: [Your GitHub Profile]

---

**Made with ❤️ by Jeremiah Panganoran**
