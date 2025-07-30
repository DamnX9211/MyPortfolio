"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import {
  Menu,
  X,
  Twitter,
  Linkedin,
  Github,
  Mail,
  ExternalLink,
  Moon,
  Sun,
  BarChart3,
  Star,
  GitFork,
  Eye,
  Award,
  Database,
  Code2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"

// Advanced Chart Component for Skills
const SkillChart = ({ skill, level, delay = 0 }: { skill: string; level: number; delay?: number }) => {
  const [progress, setProgress] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setProgress(level)
      }, delay)
      return () => clearTimeout(timer)
    }
  }, [isInView, level, delay])

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="font-medium text-sm">{skill}</span>
        <span className="text-sm text-gray-500">{progress}%</span>
      </div>
      <div className="relative">
        <Progress value={progress} className="h-2" />
        <motion.div
          className="absolute top-0 left-0 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1.5, delay: delay / 1000, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}

// GitHub Stats Component
const GitHubStats = () => {
  const [stats, setStats] = useState({
    totalRepos: 4,
    totalStars: 10,
    totalForks: 12,
    totalCommits: 24,
    streak: 8,
    languages: [
      { name: "Python", percentage: 40, color: "#3776ab" },
      { name: "JavaScript", percentage: 25, color: "#f1e05a" },
      { name: "SQL", percentage: 15, color: "#e38c00" },
      { name: "HTML/CSS", percentage: 12, color: "#e34c26" },
      { name: "R", percentage: 8, color: "#198ce7" },
    ],
  })

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Github className="w-5 h-5" />
          GitHub Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{stats.totalRepos}</div>
            <div className="text-sm text-gray-400">Repositories</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">{stats.totalStars}</div>
            <div className="text-sm text-gray-400">Stars</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{stats.totalForks}</div>
            <div className="text-sm text-gray-400">Forks</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">{stats.streak}</div>
            <div className="text-sm text-gray-400">Day Streak</div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium text-sm">Top Languages</h4>
          {stats.languages.map((lang, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: lang.color }} />
              <span className="text-sm flex-1">{lang.name}</span>
              <span className="text-sm text-gray-400">{lang.percentage}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Interactive Timeline Component for Experience/Education
const Timeline = () => {
  const experiences = [
    {
      role: "Data Science and AI Intern",
      company: "Labmentix",
      period: "Jun 2025 - July 2025",
      description: "Analyzed customer data using Python and SQL to identify trends and improve business decisions.",
      achievements: [
        "Increased data processing efficiency by 30%",
        "Created interactive dashboards",
        "Automated reporting workflows",
      ],
      color: "from-blue-500 to-cyan-600",
      type: "internship",
    },
    {
      role: "Bachelor of Technology in Biotechnology",
      company: "National Institute of Technology, Durgapur",
      period: "2022 - 2026",
      description:
        "Specialized in Data Science and Web Technologies. Relevant coursework in statistics, databases, and programming.",
      achievements: ["CGPA: 6.31/10", "Biotechnogy", "Web Development and data science Projects"],
      color: "from-purple-500 to-pink-600",
      type: "education",
    },
  ]

  return (
    <div className="space-y-8">
      {experiences.map((exp, i) => (
        <motion.div
          key={i}
          className="relative"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: i * 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex gap-6">
            <div className="relative">
              <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${exp.color} relative z-10`} />
              {i < experiences.length - 1 && (
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-0.5 h-20 bg-gray-300 dark:bg-gray-700" />
              )}
            </div>
            <div className="flex-1 pb-8">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-bold">{exp.role}</h3>
                  <Badge variant="outline" className="capitalize text-xs">
                    {exp.type}
                  </Badge>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                  <span>{exp.company}</span>
                  <span className="mx-2">•</span>
                  <span>{exp.period}</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{exp.description}</p>
                <div className="space-y-2">
                  {exp.achievements.map((achievement, j) => (
                    <div key={j} className="flex items-center gap-2 text-sm">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${exp.color}`} />
                      <span>{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// Certifications Component
const Certifications = () => {
  const certifications = [
    {
      name: "AWS-Solutions	Architecture	Job	Simulation",
      issuer: "Forage",
      date: "May 2025",
      badge: "/placeholder.svg?height=60&width=60",
      skills: ["EC2", "S3", "Lambda", "CloudFormation", "VPC"],
    },
    {
      name: "Delloitte Australia Data	Analytics	Job	Simulation	",
      issuer: "Forage",
      date: "June 2025",
      badge: "/placeholder.svg?height=60&width=60",
      skills: ["Python", "Pandas", "NumPy", "Matplotlib"],
    },
    {
      name: "Data Science with Python Certificate",
      issuer: "Scaler Topics",
      date: "2025",
      badge: "/placeholder.svg?height=60&width=60",
      skills: ["SQL", "Database Design", "Data Modeling"],
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {certifications.map((cert, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
          viewport={{ once: true }}
        >
          <Card className="h-full hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">{cert.name}</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {cert.issuer} • {cert.date}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {cert.skills.map((skill, j) => (
                  <Badge key={j} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [activeSection, setActiveSection] = useState("projects")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const router = useRouter()

  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  // Custom cursor effect
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", updateMousePosition)
    return () => window.removeEventListener("mousemove", updateMousePosition)
  }, [])

  // Toggle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  // Projects for a fresher data analyst and web developer
  const projects = [
    {
      title: "Delhivery-Analysis",
      description: "Sales data analysis and visualization dashboard for Delhivery",
      image: "/Delhivery.png?height=500&width=300",
      tags: ["Python", "Pandas", "Jupyter", "Data Analysis"],
      github: "https://github.com/DamnX9211/Delhivery-Analysis",
      demo: "https://sales-dashboard-demo.streamlit.app",
      stats: { stars: 23, forks: 8, views: 450 },
      category: "data-analysis",
    },
    {
      title: "Car Rental Website",
      description: "Full-stack car rental application with user authentication and booking system",
      image: "/car-rental.jpg?height=400&width=400",
      tags: ["Next.js", "Node.js", "MongoDB", "JavaScript"],
      github: "https://github.com/DamnX9211/Car-Rental",
      demo: "https://car-rental-murex-six.vercel.app/",
      stats: { stars: 18, forks: 5, views: 320 },
      category: "web-development",
    },
    {
      title: "Netflix Movies and TVshows Clustring",
      description: "Clustering analysis of Netflix movies and TV shows using K-means",
      image: "/placeholder.svg?height=400&width=400",
      tags: ["Python", "Scikit-learn", "Matplotlib", "Seaborn"],
      github: "https://github.com/DamnX9211/Netflix_Movies_and_TVshows_Clustring",
      demo: "https://colab.research.google.com/drive/15MY8n1TeYjjhVz0lMUDWmSQpd78-qw3z?usp=sharing",
      stats: { stars: 31, forks: 12, views: 680 },
      category: "data-analysis",
    },
    
    {
      title: "Portfolio Website",
      description: "Personal portfolio website built with Next.js and Tailwind CSS",
      image: "/placeholder.svg?height=400&width=400",
      tags: ["Next.js", "Tailwind", "Framer Motion", "TypeScript"],
      github: "https://github.com/DamnX9211/My-Portfolio",
      demo: "https://my-portfolio-seven-liart-81.vercel.app/",
      stats: { stars: 12, forks: 3, views: 180 },
      category: "web-development",
    },
  ]

  return (
    <div
      className={`min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-300 relative overflow-hidden`}
    >
      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 bg-blue-500 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      />

      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 dark:opacity-10"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 dark:opacity-10"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      {/* Header/Navigation - Updated for Fresher Data Analyst */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <BarChart3 className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ROHIT Kumar.
            </span>
          </motion.div>

          {/* Desktop Navigation - Updated for Data Analyst/Web Developer */}
          <nav className="hidden md:flex items-center space-x-6">
            {["Home", "Projects", "Skills", "Experience", "Certifications", "Contact"].map((item) => (
              <motion.button
                key={item}
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  activeSection === item.toLowerCase() ? "text-blue-600" : ""
                }`}
                onClick={() => setActiveSection(item.toLowerCase())}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
              </motion.button>
            ))}
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-transparent"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-transparent"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(true)}>
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <motion.div
          className="fixed inset-0 z-50 lg:hidden bg-black/90 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex flex-col h-full p-6">
            <div className="flex justify-end">
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                <X className="w-6 h-6 text-white" />
              </Button>
            </div>
            <div className="flex flex-col items-center justify-center flex-1 space-y-8 text-white">
              {["Home", "Projects", "Skills", "Experience", "Certifications", "Contact"].map((item) => (
                <motion.button
                  key={item}
                  className="text-2xl font-medium"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay:
                      0.1 * ["Home", "Projects", "Skills", "Experience", "Certifications", "Contact"].indexOf(item),
                  }}
                  onClick={() => {
                    setActiveSection(item.toLowerCase())
                    setIsMenuOpen(false)
                  }}
                >
                  {item}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-8">
          {/* Left Sidebar - Updated for Fresher */}
          <motion.div className="sticky top-24 h-fit space-y-8" initial="hidden" animate="visible" variants={fadeIn}>
            {/* Profile Header */}
            <div className="flex flex-col items-center lg:items-start gap-4">
              <motion.div
                className="relative group"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-300"></div>
                <Avatar className="h-24 w-24 border-4 border-white dark:border-gray-900 relative">
                  <AvatarImage src="/Photo.jpg?height=400&width=400" alt="Profile" />
                  <AvatarFallback>RK</AvatarFallback>
                </Avatar>
              </motion.div>
              <div className="text-center lg:text-left">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ROHIT Kumar.
                </h1>
                <p className="text-gray-600 dark:text-gray-400 font-medium">DATA ANALYST & WEB DEVELOPER</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">Fresh Graduate • Seeking Opportunities</p>
              </div>
            </div>

            {/* Enhanced Bio for Fresher */}
            <motion.div
              className="space-y-6 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Recent Computer Science graduate passionate about turning data into insights and building user-friendly
                web applications. Eager to apply my analytical skills and programming knowledge to solve real-world
                problems.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  Python
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                >
                  SQL
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                >
                  React
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                >
                  Tableau
                </Badge>
              </div>
              <Button
                variant="outline"
                className="w-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 border-0"
              >
                Download Resume
              </Button>
            </motion.div>

            {/* GitHub Stats */}
            <GitHubStats />

            {/* Social Links */}
            <div className="space-y-4">
              <div className="flex justify-center lg:justify-start gap-3">
                {[
                  { icon: Twitter, href: "#", color: "hover:text-blue-400" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/rohit-kumar-99abc99/", color: "hover:text-blue-600" },
                  { icon: Github, href: "https://github.com/DamnX9211", color: "hover:text-gray-800 dark:hover:text-gray-200" },
                ].map((social, i) => (
                  <motion.div key={i} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Link to ${social.icon.displayName || social.icon.name || 'social media'}`}
                    >
                      <Button variant="outline" size="icon" className={`rounded-full transition-colors ${social.color}`}>
                        <social.icon className="w-5 h-5" />
                      </Button>
                    </a>
                  </motion.div>
                ))}
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-sm text-center lg:text-left">
                <p>© 2025 Rohit Kumar. All rights reserved.</p>
                <div className="flex justify-center lg:justify-start gap-4 mt-1">
                  <Link href="#" className="hover:text-blue-600 transition-colors">
                    Privacy
                  </Link>
                  <Link href="#" className="hover:text-blue-600 transition-colors">
                    Terms
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Content */}
          <div className="space-y-12">
            {/* Home/Projects Section */}
            <motion.section
              initial="hidden"
              animate={activeSection === "home" || activeSection === "projects" ? "visible" : "hidden"}
              variants={fadeIn}
              className={activeSection === "home" || activeSection === "projects" ? "block" : "hidden"}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">My Projects</h2>
                <Button
                  variant="ghost"
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-500"
                  onClick={() => router.push("/projects")}
                >
                  View All <ExternalLink className="ml-1 w-4 h-4" />
                </Button>
              </div>

              <Tabs defaultValue="all" className="mb-8">
                <TabsList className="mb-6">
                  <TabsTrigger value="all">All Projects</TabsTrigger>
                  <TabsTrigger value="data-analysis">Data Analysis</TabsTrigger>
                  <TabsTrigger value="web-development">Web Development</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-0">
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                  >
                    {projects.slice(0, 6).map((project, i) => (
                      <motion.div
                        key={i}
                        variants={fadeIn}
                        whileHover={{ y: -10 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Card className="overflow-hidden group h-full flex flex-col hover:shadow-xl transition-all duration-300">
                          <div className="relative aspect-square overflow-hidden">
                            <Image
                              src={project.image || "/placeholder.svg"}
                              alt={project.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute top-4 left-4">
                              <Badge variant="secondary" className="bg-white/90 text-gray-900 capitalize">
                                {project.category.replace("-", " ")}
                              </Badge>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                              <div className="p-4 w-full">
                                <div className="flex gap-2 mb-2">
                                  {project.tags.slice(0, 2).map((tag, j) => (
                                    <Badge key={j} variant="secondary" className="bg-white/20 text-white">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                                <div className="flex gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-white border-white hover:bg-white hover:text-black flex-1 bg-transparent"
                                    asChild
                                  >
                                    <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                                      Demo
                                    </Link>
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-white border-white hover:bg-white hover:text-black bg-transparent"
                                    asChild
                                  >
                                    <Link href={project.github} target="_blank" rel="noopener noreferrer">
                                      <Github className="w-4 h-4 mr-1" /> Code
                                    </Link>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">{project.title}</CardTitle>
                          </CardHeader>
                          <CardContent className="pb-4 flex-grow">
                            <CardDescription className="text-sm">{project.description}</CardDescription>
                            <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4" />
                                {project.stats.stars}
                              </div>
                              <div className="flex items-center gap-1">
                                <GitFork className="w-4 h-4" />
                                {project.stats.forks}
                              </div>
                              <div className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                {project.stats.views}
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="pt-0">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-blue-600 border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 w-full bg-transparent"
                              asChild
                            >
                              <Link href={project.github} target="_blank" rel="noopener noreferrer">
                                <Github className="w-4 h-4 mr-2" /> View Code
                              </Link>
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                </TabsContent>

                <TabsContent value="data-analysis" className="mt-0">
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                  >
                    {projects
                      .filter((p) => p.category === "data-analysis")
                      .map((project, i) => (
                        <motion.div
                          key={i}
                          variants={fadeIn}
                          whileHover={{ y: -10 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Card className="overflow-hidden group h-full flex flex-col hover:shadow-xl transition-all duration-300">
                            <div className="relative aspect-square overflow-hidden">
                              <Image
                                src={project.image || "/placeholder.svg"}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                              <div className="absolute top-4 left-4">
                                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                  Data Analysis
                                </Badge>
                              </div>
                            </div>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">{project.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="pb-4 flex-grow">
                              <CardDescription className="text-sm">{project.description}</CardDescription>
                              <div className="flex flex-wrap gap-1 mt-3">
                                {project.tags.map((tag, j) => (
                                  <Badge key={j} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </CardContent>
                            <CardFooter className="pt-0">
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-blue-600 border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 w-full bg-transparent"
                                asChild
                              >
                                <Link href={project.github} target="_blank" rel="noopener noreferrer">
                                  <Github className="w-4 h-4 mr-2" /> View Analysis
                                </Link>
                              </Button>
                            </CardFooter>
                          </Card>
                        </motion.div>
                      ))}
                  </motion.div>
                </TabsContent>

                <TabsContent value="web-development" className="mt-0">
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                  >
                    {projects
                      .filter((p) => p.category === "web-development")
                      .map((project, i) => (
                        <motion.div
                          key={i}
                          variants={fadeIn}
                          whileHover={{ y: -10 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Card className="overflow-hidden group h-full flex flex-col hover:shadow-xl transition-all duration-300">
                            <div className="relative aspect-square overflow-hidden">
                              <Image
                                src={project.image || "/placeholder.svg"}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                              <div className="absolute top-4 left-4">
                                <Badge variant="secondary" className="bg-green-100 text-green-800">
                                  Web Development
                                </Badge>
                              </div>
                            </div>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">{project.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="pb-4 flex-grow">
                              <CardDescription className="text-sm">{project.description}</CardDescription>
                              <div className="flex flex-wrap gap-1 mt-3">
                                {project.tags.map((tag, j) => (
                                  <Badge key={j} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </CardContent>
                            <CardFooter className="pt-0">
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-blue-600 border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 w-full bg-transparent"
                                asChild
                              >
                                <Link href={project.github} target="_blank" rel="noopener noreferrer">
                                  <Github className="w-4 h-4 mr-2" /> View Code
                                </Link>
                              </Button>
                            </CardFooter>
                          </Card>
                        </motion.div>
                      ))}
                  </motion.div>
                </TabsContent>
              </Tabs>
            </motion.section>

            {/* Skills Section - Updated for Data Analyst/Web Developer */}
            <motion.section
              initial="hidden"
              animate={activeSection === "skills" ? "visible" : "hidden"}
              variants={fadeIn}
              className={activeSection === "skills" ? "block" : "hidden"}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">Technical Skills</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card className="overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="w-5 h-5" />
                      Data Analysis & Visualization
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <SkillChart skill="Python (Pandas, NumPy)" level={85} delay={100} />
                      <SkillChart skill="SQL & Database Design" level={80} delay={200} />
                      <SkillChart skill="Tableau & Power BI" level={75} delay={300} />
                      <SkillChart skill="Excel & Google Sheets" level={90} delay={400} />
                      <SkillChart skill="R & Statistical Analysis" level={70} delay={500} />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code2 className="w-5 h-5" />
                      Web Development
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <SkillChart skill="HTML & CSS" level={90} delay={100} />
                      <SkillChart skill="JavaScript & ES6+" level={80} delay={200} />
                      <SkillChart skill="React & Next.js" level={75} delay={300} />
                      <SkillChart skill="Node.js & Express" level={70} delay={400} />
                      <SkillChart skill="Git & Version Control" level={85} delay={500} />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Tools & Technologies */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Tools & Technologies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { name: "Jupyter", category: "Data Science" },
                      { name: "VS Code", category: "Development" },
                      { name: "Figma", category: "Design" },
                      { name: "MongoDB", category: "Database" },
                      { name: "Firebase", category: "Backend" },
                      { name: "Streamlit", category: "Deployment" },
                      { name: "Vercel", category: "Hosting" },
                      { name: "Postman", category: "API Testing" },
                    ].map((tool, i) => (
                      <motion.div
                        key={i}
                        className="flex flex-col items-center p-3 bg-gray-100 dark:bg-gray-800 rounded-lg"
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: i * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-2 flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{tool.name.charAt(0)}</span>
                        </div>
                        <span className="text-sm font-medium text-center">{tool.name}</span>
                        <span className="text-xs text-gray-500 text-center">{tool.category}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.section>

            {/* Experience Section */}
            <motion.section
              initial="hidden"
              animate={activeSection === "experience" ? "visible" : "hidden"}
              variants={fadeIn}
              className={activeSection === "experience" ? "block" : "hidden"}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">Experience & Education</h2>
              </div>

              <Timeline />
            </motion.section>

            {/* Certifications Section */}
            <motion.section
              initial="hidden"
              animate={activeSection === "certifications" ? "visible" : "hidden"}
              variants={fadeIn}
              className={activeSection === "certifications" ? "block" : "hidden"}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">Certifications & Achievements</h2>
              </div>

              <Certifications />

              {/* Academic Projects */}
              <div className="mt-12">
                <h3 className="text-2xl font-bold mb-6">Academic Achievements</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Final Year Project</CardTitle>
                      <CardDescription>Machine Learning for Predictive Analytics</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Developed a predictive model for student performance using machine learning algorithms. Achieved
                        87% accuracy using Random Forest classifier.
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <Badge variant="secondary">Grade: A+</Badge>
                        <Badge variant="outline">Best Project Award</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Hackathon Winner</CardTitle>
                      <CardDescription>University Tech Fest 2024</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Won first place in 48-hour hackathon by developing a real-time data visualization dashboard for
                        COVID-19 tracking.
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <Badge variant="secondary">1st Place</Badge>
                        <Badge variant="outline">₹50,000 Prize</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Research Publication</CardTitle>
                      <CardDescription>Data Mining Conference 2024</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Co-authored research paper on "Efficient Data Preprocessing Techniques for Large Datasets"
                        published in IEEE conference proceedings.
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <Badge variant="secondary">Published</Badge>
                        <Badge variant="outline">IEEE</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.section>

            {/* Contact Section */}
            <motion.section
              initial="hidden"
              animate={activeSection === "contact" ? "visible" : "hidden"}
              variants={fadeIn}
              className={activeSection === "contact" ? "block" : "hidden"}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">Let's Connect</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Get In Touch</CardTitle>
                    <CardDescription>
                      I'm actively seeking opportunities in data analysis and web development. Let's discuss how I can
                      contribute to your team!
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium">
                            Name
                          </label>
                          <input
                            id="name"
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 transition-all"
                            placeholder="Your name"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium">
                            Email
                          </label>
                          <input
                            id="email"
                            type="email"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 transition-all"
                            placeholder="Your email"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-medium">
                          Subject
                        </label>
                        <input
                          id="subject"
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 transition-all"
                          placeholder="Job Opportunity / Collaboration / General Inquiry"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium">
                          Message
                        </label>
                        <textarea
                          id="message"
                          rows={5}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 transition-all"
                          placeholder="Tell me about the opportunity or how we can work together..."
                        ></textarea>
                      </div>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                          Send Message
                        </Button>
                      </motion.div>
                    </form>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <motion.div className="flex items-center gap-3" whileHover={{ x: 5 }}>
                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                          <Mail className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                          <p className="font-medium">rohitkuumar1995@gmail.com</p>
                        </div>
                      </motion.div>
                      <motion.div className="flex items-center gap-3" whileHover={{ x: 5 }}>
                        <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                          <Github className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">GitHub</p>
                          <p className="font-medium">https://github.com/DamnX9211</p>
                        </div>
                      </motion.div>
                      <motion.div className="flex items-center gap-3" whileHover={{ x: 5 }}>
                        <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                          <Linkedin className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">LinkedIn</p>
                          <p className="font-medium">https://www.linkedin.com/in/rohit-kumar-99abc99/</p>
                        </div>
                      </motion.div>
                    </CardContent>
                  </Card>

                  <motion.div whileHover={{ scale: 1.02 }}>
                    <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                      <CardHeader>
                        <CardTitle>Open to Opportunities</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-4">
                          I'm actively seeking entry-level positions in data analysis, business intelligence, or
                          full-stack web development.
                        </p>
                        <div className="space-y-2 text-sm">
                          <div>✓ Available for immediate start</div>
                          <div>✓ Open to remote/hybrid work</div>
                          <div>✓ Willing to relocate</div>
                        </div>
                        <Button
                          variant="outline"
                          className="w-full mt-4 text-white border-white hover:bg-white hover:text-blue-600 bg-transparent"
                        >
                          Schedule a Call
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  )
}
