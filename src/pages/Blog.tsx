import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { ChevronRight, Calendar, User, Clock, Search } from "lucide-react";
import { Helmet } from "react-helmet";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  publishDate: string;
  readTime: string;
  tags: string[];
}

const Blog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Modern Frontend Development Practices in 2025",
      slug: "modern-frontend-development-practices-2025",
      excerpt:
        "Explore the latest trends and best practices in frontend development, including performance optimization techniques and modern framework approaches.",
      content: "Full content here...",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
      category: "Web Development",
      author: "Aashish Timalsina",
      publishDate: "April 28, 2025",
      readTime: "5 min read",
      tags: ["React", "Frontend", "Web Performance", "JavaScript"],
    },
    {
      id: 2,
      title: "Building Scalable Backend Systems with Laravel",
      slug: "building-scalable-backend-systems-laravel",
      excerpt:
        "Learn how to architect robust backend systems using Laravel that can scale to handle millions of requests efficiently.",
      content: "Full content here...",
      image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd",
      category: "Backend Development",
      author: "Aashish Timalsina",
      publishDate: "April 15, 2025",
      readTime: "8 min read",
      tags: ["Laravel", "PHP", "Backend", "Scalability"],
    },
    {
      id: 3,
      title: "Mobile App Development Best Practices with Flutter",
      slug: "mobile-app-development-best-practices-flutter",
      excerpt:
        "Discover how to build cross-platform mobile applications that deliver native-like performance using Flutter framework.",
      content: "Full content here...",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c",
      category: "Mobile Development",
      author: "Aashish Timalsina",
      publishDate: "March 22, 2025",
      readTime: "6 min read",
      tags: ["Flutter", "Mobile", "Dart", "Cross-platform"],
    },
  ];

  useEffect(() => {
    setFilteredPosts(blogPosts);
  }, []);

  useEffect(() => {
    const results = blogPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
    setFilteredPosts(results);
  }, [searchQuery]);

  return (
    <Layout>
      <Helmet>
        <title>Blog | Aashish Timalsina - Full Stack Developer</title>
        <meta
          name="description"
          content="Articles and insights on web development, mobile app development, and software engineering by Aashish Timalsina."
        />
        <meta
          property="og:title"
          content="Blog | Aashish Timalsina - Full Stack Developer"
        />
        <meta
          property="og:description"
          content="Articles and insights on web development, mobile app development, and software engineering by Aashish Timalsina."
        />
        <link rel="canonical" href="https://www.aashishtimalsina.com.np/blog" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Blog",
              "name": "Aashish Timalsina's Blog",
              "url": "https://www.aashishtimalsina.com.np/blog",
              "description": "Articles and insights on web development, mobile app development, and software engineering by Aashish Timalsina.",
              "publisher": {
                "@type": "Person",
                "name": "Aashish Timalsina",
                "url": "https://www.aashishtimalsina.com.np/"
              }
            }
          `}
        </script>
      </Helmet>

      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Blog & Insights
            </h1>
            <p className="text-xl text-muted-foreground">
              Articles and insights on web development, mobile app development,
              and software engineering.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                aria-label="Search blog posts"
              />
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
            </div>
          </div>

          {/* Blog Posts */}
          <div className="max-w-6xl mx-auto">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  No blog posts found matching your search query.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <article
                    key={post.id}
                    className="group bg-card border border-border rounded-lg overflow-hidden transition-all hover:shadow-lg"
                    itemScope
                    itemType="https://schema.org/BlogPosting"
                  >
                    <meta itemProp="author" content={post.author} />
                    <meta itemProp="datePublished" content={post.publishDate} />
                    <meta itemProp="keywords" content={post.tags.join(", ")} />
                    <link
                      itemProp="url"
                      href={`https://www.aashishtimalsina.com.np/blog/${post.slug}`}
                    />

                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover object-center transition-transform group-hover:scale-105"
                        itemProp="image"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full">
                          {post.category}
                        </span>
                      </div>
                      <h2
                        className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors"
                        itemProp="headline"
                      >
                        {post.title}
                      </h2>
                      <p
                        className="text-muted-foreground mb-6 line-clamp-3"
                        itemProp="abstract"
                      >
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-2 border-t border-border">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{post.publishDate}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <a
                        href={`/blog/${post.slug}`}
                        className="mt-4 inline-flex items-center text-primary hover:underline"
                        aria-label={`Read more about ${post.title}`}
                      >
                        Read More <ChevronRight className="h-4 w-4 ml-1" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
