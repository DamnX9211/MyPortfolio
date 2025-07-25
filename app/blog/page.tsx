"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const blogPosts = [
    {
      title: "Building Scalable React Applications",
      excerpt: "Learn how to structure and build React applications that can grow with your team and requirements.",
      image: "/placeholder.svg?height=300&width=500",
      category: "React",
      date: "2024-01-15",
      readTime: "8 min read",
      tags: ["React", "Architecture", "Best Practices"],
      slug: "building-scalable-react-applications",
    },
    {
      title: "Advanced TypeScript Patterns",
      excerpt: "Explore advanced TypeScript patterns and techniques to write more robust and maintainable code.",
      image: "/placeholder.svg?height=300&width=500",
      category: "TypeScript",
      date: "2024-01-10",
      readTime: "12 min read",
      tags: ["TypeScript", "Patterns", "Advanced"],
      slug: "advanced-typescript-patterns",
    },
    {
      title: "Optimizing Next.js Performance",
      excerpt: "Discover techniques to optimize your Next.js applications for better performance and user experience.",
      image: "/placeholder.svg?height=300&width=500",
      category: "Next.js",
      date: "2024-01-05",
      readTime: "10 min read",
      tags: ["Next.js", "Performance", "Optimization"],
      slug: "optimizing-nextjs-performance",
    },
    {
      title: "Modern CSS Techniques",
      excerpt: "Explore modern CSS features and techniques that will improve your styling workflow.",
      image: "/placeholder.svg?height=300&width=500",
      category: "CSS",
      date: "2023-12-28",
      readTime: "6 min read",
      tags: ["CSS", "Modern", "Techniques"],
      slug: "modern-css-techniques",
    },
    {
      title: "Node.js Best Practices",
      excerpt: "Learn the best practices for building robust and scalable Node.js applications.",
      image: "/placeholder.svg?height=300&width=500",
      category: "Node.js",
      date: "2023-12-20",
      readTime: "15 min read",
      tags: ["Node.js", "Backend", "Best Practices"],
      slug: "nodejs-best-practices",
    },
    {
      title: "Database Design Principles",
      excerpt: "Understanding fundamental database design principles for better application architecture.",
      image: "/placeholder.svg?height=300&width=500",
      category: "Database",
      date: "2023-12-15",
      readTime: "11 min read",
      tags: ["Database", "Design", "Architecture"],
      slug: "database-design-principles",
    },
  ]

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory

    return matchesSearch && matchesCategory
  })

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-pink-600 hover:text-pink-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </Link>
          <h1 className="text-4xl font-bold mb-2">Blog</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
            Thoughts, tutorials, and insights about web development, programming, and technology.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 mb-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search articles..."
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
                  <SelectItem value="React">React</SelectItem>
                  <SelectItem value="TypeScript">TypeScript</SelectItem>
                  <SelectItem value="Next.js">Next.js</SelectItem>
                  <SelectItem value="CSS">CSS</SelectItem>
                  <SelectItem value="Node.js">Node.js</SelectItem>
                  <SelectItem value="Database">Database</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {filteredPosts.map((post, i) => (
            <motion.div key={i} variants={fadeIn}>
              <Card className="overflow-hidden group h-full flex flex-col hover:shadow-md transition-shadow">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-white/90 text-gray-900">
                      {post.category}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="line-clamp-2 group-hover:text-pink-600 transition-colors">
                    {post.title}
                  </CardTitle>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-4 flex-grow">
                  <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {post.tags.slice(0, 3).map((tag, j) => (
                      <Badge key={j} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button
                    variant="outline"
                    className="w-full text-pink-600 border-pink-600 hover:bg-pink-50 dark:hover:bg-pink-950 bg-transparent"
                    asChild
                  >
                    <Link href={`/blog/${post.slug}`}>Read More</Link>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-xl font-medium mb-2">No articles found</h3>
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
      </div>
    </div>
  )
}
