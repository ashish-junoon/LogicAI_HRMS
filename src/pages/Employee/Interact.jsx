import React, { useState } from 'react';
import Button from '../../components/utils/Button';
import {
  Paperclip,
  Heart,
  MessageCircle,
  Send,
  CalendarDays,
  Briefcase,
  Gift,
  Cake,
  Podcast,
} from 'lucide-react';
import { motion } from "framer-motion";
import FilterCard from '../../components/FilterCard';

const posts = [
  {
    id: 1,
    type: 'birthday',
    author: 'Mr. XYZ',
    role: 'Human resouce',
    time: 'moments ago',
    content:
      '🎉 Wishing *Ravi* a very Happy Birthday!',
    profile:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300',
    postImage:
      'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=1200',
    likes: 24,
    comments: 8,
  },
  {
    id: 2,
    type: 'birthday',
    author: 'Sarah Johnson',
    role: 'UI/UX Designer',
    time: '2h ago',
    content:
      '🎉 Wishing Sarah a very Happy Birthday! Have an amazing year ahead.',
    profile:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300',
    postImage:
      'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=1200',
    likes: 24,
    comments: 8,
  },
];


function Interact() {
  const [showCreate, setShowCreate] = useState(false);
  return (
    <div className="flex h-full bg-gray-50">
      <div className="flex-1 overflow-y-auto p-6">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Interact
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Stay connected
            </p>
          </div>

          <Button
            icon={Paperclip}
            iconRight
            onClick={() => { setShowCreate(!showCreate) }}
          >
            Create Post
          </Button>
        </div>

        <div className='flex justify-between'>
          <div className='flex-1'>
            {/* Create Post Card */}
            {showCreate && <motion.div
              initial={{
                opacity: 0,
                y: -20,
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              //  exit={{opacity:0}}
              transition={{
                duration: 0.3,
              }}
              className="mb-6 rounded-xl border border-gray-200 bg-white p-5 pb-4 shadow-sm mx-12">

              <div className="flex items-center gap-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-700">
                  JS
                </div>

                <button className="flex-1 rounded-2xl bg-gray-100 px-5 py-3 text-left text-sm text-gray-500 transition hover:bg-gray-200">
                  Share an update with your team...
                </button>
              </div>

              <div className="mt-4 flex items-center gap-2 border-t border-gray-100 pt-3">

                <button className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100">
                  <Paperclip size={16} />
                  Attachment
                </button>

                <button className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100">
                  <Gift size={16} />
                  Celebration
                </button>

                <button className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100">
                  <Podcast size={16} />
                  Announcement
                </button>
              </div>
            </motion.div>}

            {/* Feed */}
            <div className="space-y-5 sm:mx-20">

              {posts.map((post) => (
                <div
                  key={post.id}
                  className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                >

                  {/* Top */}
                  <div className="mb-3 flex items-start justify-between">

                    <div className="flex items-center gap-3">

                      {post.image ? (
                        <img
                          src={post.image}
                          alt={post.author}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-700">
                          HR
                        </div>
                      )}

                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {post.author}
                        </h3>



                        <p className="text-sm text-gray-500">
                          {post.role} • {post.time}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold capitalize text-gray-600">
                      {post.type}
                    </div>
                  </div>

                  {/* Content */}
                  <p className="mb-3 leading-7 text-gray-700">
                    {post.content}
                  </p>

                  {/* Post Image */}
                  {post.postImage && (
                    <div className="mb-5 mx-5 overflow-hidden rounded-2xl border border-gray-100">
                      <img
                        src={post.postImage}
                        alt="post"
                        className="max-h-64 w-full object-cover mx-auto"
                      />
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-6 border-t border-gray-100 pt-4">

                    <button className="flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-red-500">
                      <Heart size={18} />
                      {post.likes}
                    </button>

                    <button className="flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-blue-500">
                      <MessageCircle size={18} />
                      {post.comments}
                    </button>

                    <button className="flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-green-600">
                      <Send size={18} />
                      Share
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <FilterCard />
        </div>
      </div>
    </div>
  );
}

export default Interact;