import React from 'react'
import { useAuth } from '../context/AuthContext'

export default function Dashboard(){
  const { user, history } = useAuth()

  return (
    <div className="space-y-6">
      <div className="card flex items-center gap-6">
        <img src={user.avatarUrl} alt="avatar" className="w-24 h-24 rounded-full border-2 border-[var(--color-primary)] object-cover" />
        <div>
          <h1 className="text-2xl font-semibold text-[var(--color-primary)]">{user.name}</h1>
          <p className="text-muted">{user.email}</p>
          <p className="mt-2 text-sm text-slate-700">{user.bio}</p>
          <div className="mt-3 flex items-center gap-3">
            <div className="chip">Streak: <span className="font-semibold">{user.streak}d</span></div>
            <div className="chip">Impact: <span className="font-semibold">{user.impactPoints}</span></div>
          </div>
        </div>
      </div>

      <section className="card">
        <h2 className="text-xl font-semibold">Badges</h2>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          {user.badges.map((b, i)=> (
            <div key={i} className="flex items-center gap-3 p-3 border rounded-lg">
              <img src={b.icon} alt={b.title} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <div className="font-medium">{b.title}</div>
                <div className="text-xs text-muted">{b.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="card">
        <h2 className="text-xl font-semibold">Past Activity</h2>
        <p className="text-sm text-muted mt-1">Recent eco-actions and posts</p>
        <div className="mt-4 space-y-3">
          {history.map((h, idx)=> (
            <div key={idx} className="p-3 border rounded-lg flex justify-between items-start">
              <div>
                <div className="font-medium">{h.title}</div>
                <div className="text-xs text-muted">{new Date(h.date).toLocaleString()}</div>
                <p className="mt-2 text-sm text-slate-700">{h.description}</p>
              </div>
              <div className="text-sm text-[var(--color-accent)] font-semibold">+{h.impact}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
