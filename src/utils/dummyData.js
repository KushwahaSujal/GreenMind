export const demoUser = {
  id: 'user_1',
  name: 'Ava Green',
  email: 'ava@greenmind.local',
  avatarUrl: 'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&s=7b8b5d6a2a6e9f1f6b7e7a1b2c3d4e5f',
  bio: 'Lover of urban gardens. I reduce waste and share tips daily.',
  streak: 18,
  impactPoints: 342,
  badges: [
    {
      title: "Tree Planter",
      desc: "Planted 10 trees in your community",
      icon: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&auto=format&fit=crop&q=60",
      level: "Gold"
    },
    {
      title: "Energy Saver",
      desc: "Reduced carbon footprint by 25%",
      icon: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&auto=format&fit=crop&q=60",
      level: "Silver"
    },
    {
      title: "Zero Waste",
      desc: "30 days of minimal waste lifestyle",
      icon: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&auto=format&fit=crop&q=60",
      level: "Bronze"
    },
    {
      title: "Garden Guru",
      desc: "Created your first organic garden",
      icon: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400&auto=format&fit=crop&q=60",
      level: "Gold"
    },
    {
      title: "Clean Energy",
      desc: "Switched to renewable energy sources",
      icon: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&auto=format&fit=crop&q=60",
      level: "Silver"
    },
    {
      title: "Water Warrior",
      desc: "Saved 1000 gallons of water",
      icon: "https://images.unsplash.com/photo-1589634749000-1e72ec00a13f?w=400&auto=format&fit=crop&q=60",
      level: "Gold"
    },
    {
      title: "Eco Influencer",
      desc: "Inspired 50 people to go green",
      icon: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&auto=format&fit=crop&q=60",
      level: "Bronze"
    },
    {
      title: "Recycling Master",
      desc: "3 months of perfect recycling",
      icon: "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=400&auto=format&fit=crop&q=60",
      level: "Silver"
    }
  ]
}

export const demoHistory = [
  {
    type: 'post',
    title: 'My First Garden Harvest! 🌱',
    date: Date.now() - 1000 * 60 * 60 * 24 * 1,
    impact: 30,
    description: 'So excited to share my first harvest from my organic garden! Growing your own food is incredibly rewarding.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&auto=format&fit=crop&q=60',
    likes: 45,
    comments: 12
  },
  {
    type: 'action',
    title: 'Cycled to work',
    date: Date.now() - 1000 * 60 * 60 * 24 * 2,
    impact: 5,
    description: '40-minute bike commute instead of driving. Every small action counts!',
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&auto=format&fit=crop&q=60',
    likes: 8
  },
  {
    type: 'post',
    title: 'DIY Solar Panel Installation',
    date: Date.now() - 1000 * 60 * 60 * 24 * 3,
    impact: 100,
    description: 'Finally installed solar panels on my roof! Took some work but worth it for sustainable energy.',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&auto=format&fit=crop&q=60',
    likes: 89,
    comments: 23
  },
  {
    type: 'action',
    title: 'Planted a tree',
    date: Date.now() - 1000 * 60 * 60 * 24 * 4,
    impact: 50,
    description: 'Planted a native oak in the community garden. Here\'s to a greener future! 🌳',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&auto=format&fit=crop&q=60',
    likes: 67,
    comments: 15
  },
  {
    type: 'post',
    title: 'Zero Waste Shopping Haul',
    date: Date.now() - 1000 * 60 * 60 * 24 * 5,
    impact: 20,
    description: 'My weekly groceries - all plastic-free! Using reusable bags and containers makes such a difference.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&auto=format&fit=crop&q=60',
    likes: 34,
    comments: 8
  },
  {
    type: 'post',
    title: 'Community Clean-up Success!',
    date: Date.now() - 1000 * 60 * 60 * 24 * 6,
    impact: 75,
    description: 'Amazing turnout at today\'s beach clean-up! Together we collected over 100kg of plastic waste.',
    image: 'https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=400&auto=format&fit=crop&q=60',
    likes: 156,
    comments: 42
  },
  {
    type: 'action',
    title: 'Hosted swap meet',
    date: Date.now() - 1000 * 60 * 60 * 24 * 10,
    impact: 20,
    description: 'Organized local clothes swap to reduce consumption. Great way to refresh your wardrobe sustainably!',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&auto=format&fit=crop&q=60',
    likes: 28,
    comments: 7
  },
  {
    type: 'post',
    title: 'New Composting Setup',
    date: Date.now() - 1000 * 60 * 60 * 24 * 12,
    impact: 15,
    description: 'Started my composting journey! Excited to turn kitchen scraps into garden gold.',
    image: 'https://images.unsplash.com/photo-1580852300654-03c803a14e24?w=400&auto=format&fit=crop&q=60',
    likes: 42,
    comments: 16
  }
]
