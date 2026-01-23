import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/ui/Header';
import PanicModeButton from '../components/ui/PanicModeButton';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { MessageSquare, Heart, Plus, Send, Users } from 'lucide-react';
import { fetchPosts, addPost, addComment, likePost } from '../slices/communitySlice';

const Community = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { posts, loading } = useSelector(state => state.community);

  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
  });
  const [commentInputs, setCommentInputs] = useState({});

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleCreatePost = async () => {
    if (!newPost.title.trim() || !newPost.content.trim() || !user) return;

    try {
      await dispatch(addPost({
        userId: user.uid,
        postData: {
          title: newPost.title.trim(),
          content: newPost.content.trim(),
        }
      })).unwrap();

      setNewPost({ title: '', content: '' });
      setShowNewPostForm(false);
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  const handleAddComment = async (postId, commentText) => {
    if (!commentText.trim() || !user) return;

    try {
      await dispatch(addComment({
        postId,
        userId: user.uid,
        commentData: {
          content: commentText.trim(),
        }
      })).unwrap();

      setCommentInputs(prev => ({ ...prev, [postId]: '' }));
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  const handleLikePost = async (postId) => {
    if (!user) return;

    try {
      await dispatch(likePost({
        postId,
        userId: user.uid,
      })).unwrap();
    } catch (error) {
      console.error('Failed to like post:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <PanicModeButton />

      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Community Support</h1>
              <p className="mt-2 text-gray-600">
                Connect anonymously with others on their wellness journey
              </p>
            </div>
            <Button onClick={() => setShowNewPostForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Share Your Story
            </Button>
          </div>

          {/* New Post Form */}
          {showNewPostForm && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Share Your Thoughts</CardTitle>
                <CardDescription>
                  Your post will be anonymous. Help others by sharing your experiences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Input
                    placeholder="Post title..."
                    value={newPost.title}
                    onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Share your thoughts, experiences, or questions..."
                    value={newPost.content}
                    onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                    className="w-full h-32 p-3 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleCreatePost} disabled={loading}>
                    <Send className="h-4 w-4 mr-2" />
                    Post
                  </Button>
                  <Button variant="outline" onClick={() => setShowNewPostForm(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Posts */}
          <div className="space-y-6">
            {posts.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                      <CardDescription className="text-sm text-gray-500">
                        Posted {new Date(post.createdAt).toLocaleDateString()} • Anonymous
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLikePost(post.id)}
                      className="flex items-center space-x-1"
                    >
                      <Heart className={`h-4 w-4 ${post.likedBy?.includes(user?.uid) ? 'fill-red-500 text-red-500' : ''}`} />
                      <span>{post.likes || 0}</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4 whitespace-pre-wrap">{post.content}</p>

                  {/* Comments Section */}
                  <div className="border-t pt-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <MessageSquare className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {post.comments?.length || 0} comments
                      </span>
                    </div>

                    {/* Display Comments */}
                    {post.comments && post.comments.length > 0 && (
                      <div className="space-y-3 mb-4">
                        {post.comments.map((comment) => (
                          <div key={comment.id} className="bg-gray-50 p-3 rounded-md">
                            <p className="text-sm text-gray-700">{comment.content}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(comment.createdAt).toLocaleDateString()} • Anonymous
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add Comment */}
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Add a supportive comment..."
                        value={commentInputs[post.id] || ''}
                        onChange={(e) => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleAddComment(post.id, commentInputs[post.id]);
                          }
                        }}
                        className="flex-1"
                      />
                      <Button
                        size="sm"
                        onClick={() => handleAddComment(post.id, commentInputs[post.id])}
                        disabled={!commentInputs[post.id]?.trim()}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {posts.length === 0 && !loading && (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
                <p className="text-gray-500 mb-4">
                  Be the first to share your journey and connect with others.
                </p>
                <Button onClick={() => setShowNewPostForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Start the Conversation
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Community;