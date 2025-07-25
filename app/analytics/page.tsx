"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, TrendingUp, Users, Eye, Clock, Smartphone, Monitor, Tablet } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock analytics data
const analyticsData = {
  overview: {
    totalVisitors: 12547,
    pageViews: 28934,
    avgSessionDuration: "3m 42s",
    bounceRate: 32.5,
    topPages: [
      { page: "/", views: 8234, percentage: 28.5 },
      { page: "/projects", views: 6789, percentage: 23.4 },
      { page: "/blog", views: 4521, percentage: 15.6 },
      { page: "/contact", views: 3890, percentage: 13.4 },
      { page: "/about", views: 2500, percentage: 8.6 },
    ],
  },
  devices: [
    { type: "Desktop", percentage: 65, icon: Monitor },
    { type: "Mobile", percentage: 28, icon: Smartphone },
    { type: "Tablet", percentage: 7, icon: Tablet },
  ],
  countries: [
    { country: "United States", percentage: 35, flag: "🇺🇸" },
    { country: "India", percentage: 22, flag: "🇮🇳" },
    { country: "United Kingdom", percentage: 15, flag: "🇬🇧" },
    { country: "Germany", percentage: 12, flag: "🇩🇪" },
    { country: "Canada", percentage: 8, flag: "🇨🇦" },
    { country: "Others", percentage: 8, flag: "🌍" },
  ],
  performance: {
    loadTime: 1.2,
    firstContentfulPaint: 0.8,
    largestContentfulPaint: 1.5,
    cumulativeLayoutShift: 0.05,
  },
}

const MetricCard = ({ title, value, description, icon: Icon, trend }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">
          {trend && (
            <span className={`inline-flex items-center ${trend > 0 ? "text-green-600" : "text-red-600"}`}>
              <TrendingUp className="w-3 h-3 mr-1" />
              {trend > 0 ? "+" : ""}
              {trend}%
            </span>
          )}
          {description}
        </p>
      </CardContent>
    </Card>
  </motion.div>
)

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("30d")

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-pink-600 hover:text-pink-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </Link>
          <h1 className="text-4xl font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Portfolio performance metrics and visitor insights.</p>
        </div>

        {/* Overview Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Visitors"
            value={analyticsData.overview.totalVisitors.toLocaleString()}
            description="from last month"
            icon={Users}
            trend={12.5}
          />
          <MetricCard
            title="Page Views"
            value={analyticsData.overview.pageViews.toLocaleString()}
            description="total page views"
            icon={Eye}
            trend={8.3}
          />
          <MetricCard
            title="Avg. Session Duration"
            value={analyticsData.overview.avgSessionDuration}
            description="time on site"
            icon={Clock}
            trend={-2.1}
          />
          <MetricCard
            title="Bounce Rate"
            value={`${analyticsData.overview.bounceRate}%`}
            description="visitors who left"
            icon={TrendingUp}
            trend={-5.2}
          />
        </div>

        <Tabs defaultValue="pages" className="space-y-6">
          <TabsList>
            <TabsTrigger value="pages">Top Pages</TabsTrigger>
            <TabsTrigger value="devices">Devices</TabsTrigger>
            <TabsTrigger value="locations">Locations</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="pages">
            <Card>
              <CardHeader>
                <CardTitle>Most Visited Pages</CardTitle>
                <CardDescription>Pages with the highest traffic in the last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.overview.topPages.map((page, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center justify-between"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                    >
                      <div className="flex-1">
                        <div className="font-medium">{page.page}</div>
                        <div className="text-sm text-gray-500">{page.views.toLocaleString()} views</div>
                      </div>
                      <div className="flex items-center gap-4 min-w-[120px]">
                        <Progress value={page.percentage} className="flex-1" />
                        <span className="text-sm font-medium">{page.percentage}%</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="devices">
            <Card>
              <CardHeader>
                <CardTitle>Device Breakdown</CardTitle>
                <CardDescription>Visitor device preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {analyticsData.devices.map((device, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-4"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                    >
                      <div className="w-12 h-12 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
                        <device.icon className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{device.type}</div>
                        <div className="flex items-center gap-4 mt-2">
                          <Progress value={device.percentage} className="flex-1" />
                          <span className="text-sm font-medium">{device.percentage}%</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="locations">
            <Card>
              <CardHeader>
                <CardTitle>Visitor Locations</CardTitle>
                <CardDescription>Geographic distribution of visitors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.countries.map((country, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                    >
                      <div className="text-2xl">{country.flag}</div>
                      <div className="flex-1">
                        <div className="font-medium">{country.country}</div>
                        <div className="flex items-center gap-4 mt-2">
                          <Progress value={country.percentage} className="flex-1" />
                          <span className="text-sm font-medium">{country.percentage}%</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Core Web Vitals</CardTitle>
                  <CardDescription>Performance metrics that matter</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">First Contentful Paint</span>
                        <span className="text-sm text-green-600">
                          {analyticsData.performance.firstContentfulPaint}s
                        </span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Largest Contentful Paint</span>
                        <span className="text-sm text-green-600">
                          {analyticsData.performance.largestContentfulPaint}s
                        </span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Cumulative Layout Shift</span>
                        <span className="text-sm text-green-600">
                          {analyticsData.performance.cumulativeLayoutShift}
                        </span>
                      </div>
                      <Progress value={95} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Load Time Analysis</CardTitle>
                  <CardDescription>Average page load performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">{analyticsData.performance.loadTime}s</div>
                    <div className="text-sm text-gray-500 mb-4">Average Load Time</div>
                    <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg">
                      <div className="text-sm font-medium text-green-800 dark:text-green-200">
                        Excellent Performance
                      </div>
                      <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                        Your site loads faster than 85% of websites
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
