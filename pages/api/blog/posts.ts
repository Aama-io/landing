import { NextApiRequest, NextApiResponse } from 'next';
import { getAllPosts, getPostBySlug } from '@/lib/blogPosts';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get all blog posts
  if (req.method === 'GET') {
    const { slug } = req.query;

    // If slug is provided, return the specific post
    if (slug) {
      const post = getPostBySlug(Array.isArray(slug) ? slug[0] : slug);

      if (!post) {
        return res.status(404).json({ message: 'Blog post not found' });
      }

      return res.status(200).json(post);
    }

    // Return all posts (without the full content to keep the response size smaller)
    return res.status(200).json(getAllPosts());
  }

  // Method not allowed
  return res.status(405).json({ message: 'Method not allowed' });
}
