// Dummy posts with user interactions
export const demoPosts = [
  {
    id: 'p1',
    author: {
      id: 'u2',
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200'
    },
    date: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
    content: 'Just finished setting up my balcony garden! 🌿 Growing herbs and cherry tomatoes in recycled containers. Small space, big impact! #UrbanGardening',
    image: 'https://images.unsplash.com/photo-1524247108137-732e0f642303?q=80&w=600',
    likes: 24,
    comments: [
      { id: 'c1', author: 'Alex Kim', content: 'Love the recycled containers idea! What herbs are you growing?', date: Date.now() - 1000 * 60 * 30 },
      { id: 'c2', author: 'Maria Garcia', content: 'This is inspiring! I need to start my own balcony garden.', date: Date.now() - 1000 * 60 * 15 }
    ],
    saves: 5,
    shares: 3,
    tags: ['urbangardening', 'sustainable', 'zerowaste']
  },
  {
    id: 'p2',
    author: {
      id: 'u3',
      name: 'Marcus Johnson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200'
    },
    date: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
    content: 'Monthly waste audit complete! 📊 Reduced plastic waste by 40% compared to last month. Key changes: bulk shopping, reusable produce bags, and making our own cleaning products.',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=600',
    likes: 45,
    comments: [
      { id: 'c3', author: 'Ava Green', content: 'Amazing progress! Would love to know your cleaning product recipes.', date: Date.now() - 1000 * 60 * 60 * 12 }
    ],
    saves: 12,
    shares: 8,
    tags: ['zerowaste', 'sustainability', 'plasticfree']
  },
  {
    id: 'p3',
    author: {
      id: 'u4',
      name: 'Elena Torres',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200'
    },
    date: Date.now() - 1000 * 60 * 60 * 48, // 2 days ago
    content: 'Community cleanup day success! 🌊 Removed 50kg of plastic from our local beach. Join us next month! #OceanCleanup',
    image: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?q=80&w=600',
    likes: 89,
    comments: [
      { id: 'c4', author: 'Tom Wilson', content: 'Count me in for next month! 🙌', date: Date.now() - 1000 * 60 * 60 * 36 },
      { id: 'c5', author: 'Lisa Chen', content: 'This is incredible work! What time do you usually meet?', date: Date.now() - 1000 * 60 * 60 * 24 }
    ],
    saves: 15,
    shares: 12,
    tags: ['beachcleanup', 'community', 'savetheocean']
  }
]
