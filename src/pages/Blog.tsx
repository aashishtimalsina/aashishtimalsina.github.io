
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog: React.FC = () => {
  // Sample blog posts data
  const blogPosts = [
    {
      id: 1,
      title: 'Getting Started with Laravel 10',
      excerpt: 'Learn the fundamentals of Laravel 10 and how to build your first application.',
      date: 'June 15, 2023',
      category: 'Backend',
      slug: 'getting-started-with-laravel-10'
    },
    {
      id: 2,
      title: 'React 18 Performance Optimization Techniques',
      excerpt: 'Discover the latest techniques to optimize your React applications.',
      date: 'August 22, 2023',
      category: 'Frontend',
      slug: 'react-18-performance-optimization'
    },
    {
      id: 3,
      title: 'Flutter vs React Native: Which One to Choose?',
      excerpt: 'A comprehensive comparison between Flutter and React Native for mobile development.',
      date: 'October 10, 2023',
      category: 'Mobile',
      slug: 'flutter-vs-react-native'
    },
    {
      id: 4,
      title: 'Understanding Fast API: A Modern Python Framework',
      excerpt: 'Explore Fast API and learn how to create high-performance APIs with Python.',
      date: 'December 05, 2023',
      category: 'Backend',
      slug: 'understanding-fast-api'
    },
  ];

  return (
    <Layout>
      <section className="section-padding container-padding pt-32 min-h-screen">
        <div className="container mx-auto">
          <div className="mb-8">
            <Link to="/">
              <Button variant="ghost" className="pl-0">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
          
          <div className="flex flex-col items-center mb-16">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-center mb-6">
              My Blog
            </h1>
            <p className="text-lg text-muted-foreground text-center max-w-2xl">
              Thoughts, insights, and tutorials on web development, mobile development, and technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden transition-all hover:shadow-lg">
                <CardHeader className="pb-4">
                  <div className="text-sm text-muted-foreground mb-2">
                    {post.date} • {post.category}
                  </div>
                  <CardTitle className="text-xl font-display">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-4">
                    {post.excerpt}
                  </CardDescription>
                  <Link to={`/blog/${post.slug}`}>
                    <Button variant="outline" className="w-full">
                      Read More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
