"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MagnifyingGlassIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  ArrowTopRightOnSquareIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  DocumentTextIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  TagIcon,
  EllipsisVerticalIcon
} from "@heroicons/react/24/outline"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ContentForm } from "@/components/admin/content-form"

type ContentStatus = 'published' | 'draft' | 'pending' | 'rejected'

interface Content {
  id: string
  title: string
  type: 'article' | 'page' | 'post' | 'product'
  status: ContentStatus
  author: string
  category: string
  tags: string[]
  createdAt: string
  updatedAt: string
  publishedAt?: string
  views?: number
  featured: boolean
  excerpt?: string
}

const mockContent: Content[] = [
  {
    id: "1",
    title: "Getting Started with Our Platform",
    type: "article",
    status: "published",
    author: "Sarah Johnson",
    category: "Tutorials",
    tags: ["beginner", "guide", "tutorial"],
    createdAt: "2025-03-10",
    updatedAt: "2025-03-15",
    publishedAt: "2025-03-15",
    views: 1245,
    featured: true,
    excerpt: "A comprehensive guide to help new users get started with our platform."
  },
  {
    id: "2",
    title: "Advanced User Management Techniques",
    type: "article",
    status: "published",
    author: "Michael Chen",
    category: "Administration",
    tags: ["advanced", "user-management", "security"],
    createdAt: "2025-03-12",
    updatedAt: "2025-03-14",
    publishedAt: "2025-03-14",
    views: 876,
    featured: false,
    excerpt: "Learn advanced techniques for managing users and permissions."
  },
  {
    id: "3",
    title: "Upcoming Feature: Enhanced Analytics",
    type: "post",
    status: "draft",
    author: "Jessica Lee",
    category: "Product Updates",
    tags: ["analytics", "features", "upcoming"],
    createdAt: "2025-03-18",
    updatedAt: "2025-03-18",
    featured: false,
    excerpt: "Preview of our upcoming enhanced analytics features."
  },
  {
    id: "4",
    title: "Privacy Policy",
    type: "page",
    status: "published",
    author: "Legal Team",
    category: "Legal",
    tags: ["legal", "privacy", "policy"],
    createdAt: "2025-01-15",
    updatedAt: "2025-03-01",
    publishedAt: "2025-03-01",
    views: 532,
    featured: false
  },
  {
    id: "5",
    title: "New Integration with Third-Party Services",
    type: "post",
    status: "pending",
    author: "David Wilson",
    category: "Integrations",
    tags: ["integration", "api", "third-party"],
    createdAt: "2025-03-19",
    updatedAt: "2025-03-19",
    featured: false,
    excerpt: "Announcing our new integration capabilities with popular third-party services."
  },
  {
    id: "6",
    title: "Premium Plan Features",
    type: "page",
    status: "published",
    author: "Marketing Team",
    category: "Pricing",
    tags: ["premium", "pricing", "features"],
    createdAt: "2025-02-20",
    updatedAt: "2025-03-05",
    publishedAt: "2025-03-05",
    views: 987,
    featured: true
  },
  {
    id: "7",
    title: "Content Moderation Best Practices",
    type: "article",
    status: "rejected",
    author: "Emily Brown",
    category: "Moderation",
    tags: ["moderation", "best-practices", "community"],
    createdAt: "2025-03-16",
    updatedAt: "2025-03-17",
    featured: false,
    excerpt: "Guidelines for effective content moderation and community management."
  },
  {
    id: "8",
    title: "Summer Sale Announcement",
    type: "post",
    status: "draft",
    author: "Marketing Team",
    category: "Promotions",
    tags: ["sale", "promotion", "summer"],
    createdAt: "2025-03-20",
    updatedAt: "2025-03-20",
    featured: true,
    excerpt: "Announcing our upcoming summer sale with exclusive discounts."
  }
]

export default function ContentPage() {
  const [content, setContent] = useState<Content[]>(mockContent)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedTab, setSelectedTab] = useState<'published' | 'draft' | 'pending' | 'rejected'>('published')
  const [showContentForm, setShowContentForm] = useState(false)
  const [selectedContent, setSelectedContent] = useState<Content | null>(null)

  const filteredContent = content.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    const matchesType = selectedType === 'all' || item.type === selectedType
    return matchesSearch && matchesCategory && matchesType
  })

  const publishedContent = filteredContent.filter(item => item.status === 'published')
  const draftContent = filteredContent.filter(item => item.status === 'draft')
  const pendingContent = filteredContent.filter(item => item.status === 'pending')
  const rejectedContent = filteredContent.filter(item => item.status === 'rejected')

  const handleStatusChange = (contentId: string, newStatus: ContentStatus) => {
    setContent(content.map(item => 
      item.id === contentId ? { 
        ...item, 
        status: newStatus,
        ...(newStatus === 'published' ? {
          publishedAt: new Date().toISOString().split('T')[0]
        } : {})
      } : item
    ))
  }

  const handleDeleteContent = (contentId: string) => {
    setContent(content.filter(item => item.id !== contentId))
  }

  const handleEditContent = (contentItem: Content) => {
    setSelectedContent(contentItem)
    setShowContentForm(true)
  }

  const handleAddContent = () => {
    setSelectedContent(null)
    setShowContentForm(true)
  }

  const handleSaveContent = (contentData: Partial<Content>) => {
    if (selectedContent) {
      // Edit existing content
      setContent(content.map(item => 
        item.id === selectedContent.id ? { ...item, ...contentData } : item
      ))
    } else {
      // Add new content
      const newContent: Content = {
        id: Date.now().toString(),
        title: contentData.title || 'Untitled',
        type: contentData.type || 'post',
        status: 'draft',
        author: contentData.author || 'Admin',
        category: contentData.category || 'Uncategorized',
        tags: contentData.tags || [],
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
        featured: contentData.featured || false,
        excerpt: contentData.excerpt
      }
      setContent([...content, newContent])
    }
    setShowContentForm(false)
  }

  const getStatusColor = (status: ContentStatus) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
      case 'draft':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'rejected':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
    }
  }

  const getStatusIcon = (status: ContentStatus) => {
    switch (status) {
      case 'published':
        return <CheckCircleIcon className="h-4 w-4" />
      case 'draft':
        return <DocumentTextIcon className="h-4 w-4" />
      case 'pending':
        return <ClockIcon className="h-4 w-4" />
      case 'rejected':
        return <XCircleIcon className="h-4 w-4" />
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <DocumentDuplicateIcon className="h-4 w-4" />
      case 'page':
        return <DocumentTextIcon className="h-4 w-4" />
      case 'post':
        return <DocumentTextIcon className="h-4 w-4" />
      case 'product':
        return <FolderIcon className="h-4 w-4" />
      default:
        return <DocumentTextIcon className="h-4 w-4" />
    }
  }

  // Get unique categories and types for filters
  const categories = Array.from(new Set(content.map(item => item.category)))
  const types = Array.from(new Set(content.map(item => item.type)))

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Content Management</h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400">Manage and publish content across your platform</p>
        </div>
        <Button onClick={handleAddContent} className="gap-2">
          <PlusIcon className="h-4 w-4" />
          Create Content
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search content..."
                className="w-full pl-9 pr-4 py-2 border rounded-lg bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 text-sm"
              />
            </div>
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 text-sm"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 text-sm"
              >
                <option value="all">All Types</option>
                {types.map(type => (
                  <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex border dark:border-slate-800 rounded-lg p-1 bg-slate-50 dark:bg-slate-900">
        <button
          onClick={() => setSelectedTab('published')}
          className={`flex-1 flex flex-col items-center px-4 py-3 rounded-md transition-colors ${
            selectedTab === 'published'
              ? 'bg-white dark:bg-slate-800 shadow-sm'
              : 'hover:bg-white/50 dark:hover:bg-slate-800/50'
          }`}
        >
          <span className="text-sm font-medium text-slate-900 dark:text-slate-100">Published</span>
          <span className={`mt-1 text-2xl font-bold ${
            selectedTab === 'published'
              ? 'text-green-600 dark:text-green-500'
              : 'text-slate-900 dark:text-slate-100'
          }`}>
            {publishedContent.length}
          </span>
        </button>

        <button
          onClick={() => setSelectedTab('draft')}
          className={`flex-1 flex flex-col items-center px-4 py-3 rounded-md transition-colors ${
            selectedTab === 'draft'
              ? 'bg-white dark:bg-slate-800 shadow-sm'
              : 'hover:bg-white/50 dark:hover:bg-slate-800/50'
          }`}
        >
          <span className="text-sm font-medium text-slate-900 dark:text-slate-100">Drafts</span>
          <span className={`mt-1 text-2xl font-bold ${
            selectedTab === 'draft'
              ? 'text-blue-600 dark:text-blue-500'
              : 'text-slate-900 dark:text-slate-100'
          }`}>
            {draftContent.length}
          </span>
        </button>

        <button
          onClick={() => setSelectedTab('pending')}
          className={`flex-1 flex flex-col items-center px-4 py-3 rounded-md transition-colors ${
            selectedTab === 'pending'
              ? 'bg-white dark:bg-slate-800 shadow-sm'
              : 'hover:bg-white/50 dark:hover:bg-slate-800/50'
          }`}
        >
          <span className="text-sm font-medium text-slate-900 dark:text-slate-100">Pending</span>
          <span className={`mt-1 text-2xl font-bold ${
            selectedTab === 'pending'
              ? 'text-amber-600 dark:text-amber-500'
              : 'text-slate-900 dark:text-slate-100'
          }`}>
            {pendingContent.length}
          </span>
        </button>

        <button
          onClick={() => setSelectedTab('rejected')}
          className={`flex-1 flex flex-col items-center px-4 py-3 rounded-md transition-colors ${
            selectedTab === 'rejected'
              ? 'bg-white dark:bg-slate-800 shadow-sm'
              : 'hover:bg-white/50 dark:hover:bg-slate-800/50'
          }`}
        >
          <span className="text-sm font-medium text-slate-900 dark:text-slate-100">Rejected</span>
          <span className={`mt-1 text-2xl font-bold ${
            selectedTab === 'rejected'
              ? 'text-red-600 dark:text-red-500'
              : 'text-slate-900 dark:text-slate-100'
          }`}>
            {rejectedContent.length}
          </span>
        </button>
      </div>

      <div className="space-y-4">
        {(selectedTab === 'published' ? publishedContent : 
          selectedTab === 'draft' ? draftContent : 
          selectedTab === 'pending' ? pendingContent :
          rejectedContent).map(item => (
          <Card key={item.id} className="overflow-hidden">
            <div className="flex flex-col sm:flex-row">
              <div className="flex-1 p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="font-normal capitalize">
                        {item.type}
                      </Badge>
                      <Badge className={getStatusColor(item.status)}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </Badge>
                      {item.featured && (
                        <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-1">{item.title}</h2>
                    {item.excerpt && (
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">{item.excerpt}</p>
                    )}
                    <div className="flex flex-wrap gap-2 mb-3">
                      <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                        <FolderIcon className="h-3.5 w-3.5" />
                        <span>{item.category}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                        <TagIcon className="h-3.5 w-3.5" />
                        <span>{item.tags.join(', ')}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                      <span>By {item.author}</span>
                      <span>•</span>
                      <span>Created: {item.createdAt}</span>
                      {item.publishedAt && (
                        <>
                          <span>•</span>
                          <span>Published: {item.publishedAt}</span>
                        </>
                      )}
                      {item.views !== undefined && (
                        <>
                          <span>•</span>
                          <span>{item.views.toLocaleString()} views</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex sm:flex-col justify-end gap-2 p-4 bg-slate-50 dark:bg-slate-800/50 border-t sm:border-t-0 sm:border-l border-slate-200 dark:border-slate-700">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 sm:w-24 gap-2"
                  onClick={() => handleEditContent(item)}
                >
                  <PencilIcon className="h-4 w-4" />
                  <span>Edit</span>
                </Button>
                
                {item.status === 'published' && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 sm:w-24 gap-2"
                  >
                    <EyeIcon className="h-4 w-4" />
                    <span>View</span>
                  </Button>
                )}
                
                {item.status === 'draft' && (
                  <Button
                    variant="default"
                    size="sm"
                    className="flex-1 sm:w-24 gap-2 bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => handleStatusChange(item.id, 'published')}
                  >
                    <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                    <span>Publish</span>
                  </Button>
                )}
                
                {item.status === 'pending' && (
                  <>
                    <Button
                      variant="default"
                      size="sm"
                      className="flex-1 sm:w-24 gap-2 bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => handleStatusChange(item.id, 'published')}
                    >
                      <CheckCircleIcon className="h-4 w-4" />
                      <span>Approve</span>
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      className="flex-1 sm:w-24 gap-2 bg-red-600 hover:bg-red-700 text-white"
                      onClick={() => handleStatusChange(item.id, 'rejected')}
                    >
                      <XCircleIcon className="h-4 w-4" />
                      <span>Reject</span>
                    </Button>
                  </>
                )}
                
                {item.status === 'rejected' && (
                  <Button
                    variant="default"
                    size="sm"
                    className="flex-1 sm:w-24 gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => handleStatusChange(item.id, 'draft')}
                  >
                    <DocumentTextIcon className="h-4 w-4" />
                    <span>To Draft</span>
                  </Button>
                )}
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="h-9 w-9">
                      <EllipsisVerticalIcon className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEditContent(item)}>
                      <PencilIcon className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteContent(item.id)}>
                      <TrashIcon className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </Card>
        ))}
        
        {((selectedTab === 'published' && publishedContent.length === 0) ||
          (selectedTab === 'draft' && draftContent.length === 0) ||
          (selectedTab === 'pending' && pendingContent.length === 0) ||
          (selectedTab === 'rejected' && rejectedContent.length === 0)) && (
          <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <DocumentTextIcon className="h-12 w-12 mx-auto text-slate-400" />
            <h3 className="mt-4 text-lg font-medium text-slate-900 dark:text-slate-100">
              No {selectedTab} content found
            </h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {selectedTab === 'published' 
                ? "You don't have any published content yet." 
                : selectedTab === 'draft'
                ? "You don't have any draft content yet."
                : selectedTab === 'pending'
                ? "There's no content pending review."
                : "You don't have any rejected content."}
            </p>
            <Button className="mt-4" onClick={handleAddContent}>
              <PlusIcon className="h-4 w-4 mr-2" />
              Create New Content
            </Button>
          </div>
        )}
      </div>

      {/* Content Form Modal */}
      {showContentForm && (
        <ContentForm 
          content={selectedContent}
          onClose={() => setShowContentForm(false)}
          onSave={handleSaveContent}
          categories={categories}
        />
      )}
    </div>
  )
}