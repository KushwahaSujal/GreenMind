export const demoUser = {
  id: 'user_1',
  name: 'Ava Green',
  email: 'ava@greenmind.local',
  avatarUrl: 'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&s=7b8b5d6a2a6e9f1f6b7e7a1b2c3d4e5f',
  bio: 'Lover of urban gardens. I reduce waste and share tips daily.',
  streak: 18,
  impactPoints: 342,
  badges: [
    { title: 'Composter', desc: 'Composted 30 times', icon: 'https://via.placeholder.com/64?text=C' },
    { title: 'Rider', desc: 'Used bike 50 times', icon: 'https://via.placeholder.com/64?text=R' },
    { title: 'Recycler', desc: 'Recycled 100 items', icon: 'https://via.placeholder.com/64?text=Re' },
    { title: 'Saver', desc: 'Saved 100L water', icon: 'https://via.placeholder.com/64?text=S' }
  ]
}

export const demoHistory = [
  { title: 'Planted a tree', date: Date.now() - 1000 * 60 * 60 * 24 * 3, impact: 50, description: 'Planted a native oak in the community garden.' },
  { title: 'Cycled to work', date: Date.now() - 1000 * 60 * 60 * 24 * 2, impact: 5, description: '40-minute bike commute instead of driving.' },
  { title: 'Hosted swap meet', date: Date.now() - 1000 * 60 * 60 * 24 * 10, impact: 20, description: 'Organized local clothes swap to reduce consumption.' }
]
