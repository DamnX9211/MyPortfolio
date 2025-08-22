"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Github, ExternalLink, ArrowLeft, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

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

  // Web development projects
  const allProjects = [
        {
          title: "E-commerce Platform",
          description: "Full-stack e-commerce site built with Next.js, Stripe, and MongoDB",
          image: "/ecommerce-platform.webp?height=400&width=400",
          tags: ["Next.js", "MongoDB", "Stripe"],
          category: "fullstack",
          github: "https://github.com/tonyb/ecommerce-platform",
          date: "2023-05-15",
        },
    {
      title: "SpeakGenie",
      description: "React-based voice assistant application",
      image: "/speak-genie.webp?height=400&width=400",
      tags: ["NEXT", "AI", "LLM"],
      category: "Web Development",
      github: "https://github.com/DamnX9211/SpeakGenie",
      date: "2025-08-10",
    },
    {
      title: "Weather Dashboard",
      description: "Interactive weather dashboard using OpenWeather API and Chart.js",
      image: "/placeholder.svg?height=400&width=400",
      tags: ["JavaScript", "API", "Chart.js"],
      category: "frontend",
      github: "https://github.com/tonyb/weather-dashboard",
      date: "2022-11-20",
    },
    {
      title: "Blog CMS",
      description: "Content management system for blogs with markdown support",
      image: "/placeholder.svg?height=400&width=400",
      tags: ["Node.js", "Express", "MongoDB"],
      category: "backend",
      github: "https://github.com/tonyb/blog-cms",
      date: "2022-09-05",
    },
    {
      title: "Real-time Chat",
      description: "Real-time chat application using Socket.io and React",
      image: "/placeholder.svg?height=400&width=400",
      tags: ["React", "Socket.io", "Node.js"],
      category: "fullstack",
      github: "https://github.com/tonyb/realtime-chat",
      date: "2022-07-12",
    },
    {
      title: "Portfolio Template",
      description: "Customizable portfolio template for developers",
      image: "/placeholder.svg?height=400&width=400",
      tags: ["Next.js", "Tailwind", "Framer"],
      category: "frontend",
      github: "https://github.com/tonyb/portfolio-template",
      date: "2022-04-30",
    },
    {
      title: "API Gateway",
      description: "Microservice API gateway with authentication and rate limiting",
      image: "/placeholder.svg?height=400&width=400",
      tags: ["Node.js", "Express", "JWT"],
      category: "backend",
      github: "https://github.com/tonyb/api-gateway",
      date: "2022-03-15",
    },
    {
      title: "DevOps Dashboard",
      description: "Dashboard for monitoring CI/CD pipelines and deployments",
      image: "/placeholder.svg?height=400&width=400",
      tags: ["React", "GraphQL", "Docker"],
      category: "fullstack",
      github: "https://github.com/tonyb/devops-dashboard",
      date: "2022-01-20",
    },
    {
      title: "Social Media Analytics",
      description: "Analytics platform for social media performance tracking",
      image: "/placeholder.svg?height=400&width=400",
      tags: ["Next.js", "D3.js", "Firebase"],
      category: "frontend",
      github: "https://github.com/tonyb/social-analytics",
      date: "2021-11-05",
    },
    {
      title: "Inventory Management",
      description: "Inventory management system with barcode scanning",
      image: "/placeholder.svg?height=400&width=400",
      tags: ["React Native", "Node.js", "MongoDB"],
      category: "fullstack",
      github: "https://github.com/tonyb/inventory-system",
      date: "2021-09-10",
    },
    {
      title: "Authentication Service",
      description: "Secure authentication service with OAuth and MFA support",
      image: "/placeholder.svg?height=400&width=400",
      tags: ["Node.js", "Express", "OAuth"],
      category: "backend",
      github: "https://github.com/tonyb/auth-service",
      date: "2021-07-22",
    },
    {
      title: "Data Visualization Tool",
      description: "Interactive data visualization tool for complex datasets",
      image: "/placeholder.svg?height=400&width=400",
      tags: ["React", "D3.js", "TypeScript"],
      category: "frontend",
      github: "https://github.com/tonyb/data-viz",
      date: "2021-05-15",
    },
  ]

  // Filter and sort projects
  const filteredProjects = allProjects
    .filter((project) => {
      // Filter by search query
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      // Filter by category
      const matchesCategory = selectedCategory === "all" || project.category === selectedCategory

      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      // Sort projects
      if (sortBy === "newest") {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      } else if (sortBy === "oldest") {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      } else if (sortBy === "a-z") {
        return a.title.localeCompare(b.title)
      } else if (sortBy === "z-a") {
        return b.title.localeCompare(a.title)
      }
      return 0
    })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-pink-600 hover:text-pink-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </Link>
          <h1 className="text-4xl font-bold mb-2">My Projects</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
            A collection of my web development projects, including frontend, backend, and full-stack applications.
            Browse through my work and check out the code on GitHub.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 mb-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search projects..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="text-gray-400 h-4 w-4" />
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="frontend">Frontend</SelectItem>
                  <SelectItem value="backend">Backend</SelectItem>
                  <SelectItem value="fullstack">Full-Stack</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="a-z">A-Z</SelectItem>
                  <SelectItem value="z-a">Z-A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, i) => (
              <motion.div key={i} variants={fadeIn}>
                <Card className="overflow-hidden group h-full flex flex-col hover:shadow-md transition-shadow">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-4 w-full">
                        <div className="flex gap-2 mb-2">
                          {project.tags.map((tag, j) => (
                            <Badge key={j} variant="secondary" className="bg-white/20 text-white">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-white border-white hover:bg-white hover:text-black flex-1"
                          >
                            Demo
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-white border-white hover:bg-white hover:text-black"
                            asChild
                          >
                            <Link href={project.github} target="_blank" rel="noopener noreferrer">
                              <Github className="w-4 h-4 mr-1" /> GitHub
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle>{project.title}</CardTitle>
                      <Badge variant="outline" className="capitalize">
                        {project.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-4 flex-grow">
                    <CardDescription>{project.description}</CardDescription>
                  </CardContent>
                  <CardFooter className="pt-0 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-pink-600 border-pink-600 hover:bg-pink-50 dark:hover:bg-pink-950 flex-1"
                      asChild
                    >
                      <Link href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" /> View Code
                      </Link>
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white flex-1"
                    >
                      Live Demo <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-xl font-medium mb-2">No projects found</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">Try adjusting your search or filter criteria</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("all")
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
