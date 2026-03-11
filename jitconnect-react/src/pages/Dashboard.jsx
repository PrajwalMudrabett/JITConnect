import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { postsAPI, usersAPI } from '../services/api';

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [postContent, setPostContent] = useState('');
  const [postCategory, setPostCategory] = useState('general');
  const [postImage, setPostImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetchPosts();
    fetchSuggestions();
  }, []);

  const fetchPosts = async () => {
    try {
      const data = await postsAPI.getAllPosts();
      if (Array.isArray(data)) {
        setPosts(data);
      }
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
  };

  const fetchSuggestions = async () => {
    try {
      const data = await usersAPI.getAllUsers();
      if (Array.isArray(data)) {
        setSuggestions(data.slice(0, 4));
      }
    } catch (err) {
      console.error('Error fetching suggestions:', err);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) { // 5MB limit
        alert('Image size should be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPostImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setPostImage('');
  };

  const createPost = async () => {
    if (!postContent.trim()) {
      alert('Please write something to post!');
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log('Creating post with:', { content: postContent, category: postCategory, hasImage: !!postImage });
      
      const newPost = await postsAPI.createPost({
        content: postContent,
        category: postCategory,
        image: postImage
      });

      console.log('Post created:', newPost);

      if (newPost._id) {
        setPosts([newPost, ...posts]);
        setPostContent('');
        setPostCategory('general');
        setPostImage('');
        alert('Post created successfully!');
      } else if (newPost.message) {
        setError(newPost.message);
        alert('Error: ' + newPost.message);
      }
    } catch (err) {
      console.error('Error creating post:', err);
      const errorMsg = err.message || 'Failed to create post. Please try again.';
      setError(errorMsg);
      alert('Error: ' + errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId) => {
    try {
      const updatedPost = await postsAPI.likePost(postId);
      setPosts(posts.map(post => post._id === postId ? updatedPost : post));
    } catch (err) {
      console.error('Error liking post:', err);
    }
  };

  const handleComment = async (postId) => {
    const commentText = prompt('Enter your comment:');
    if (commentText && commentText.trim()) {
      try {
        const updatedPost = await postsAPI.addComment(postId, commentText);
        setPosts(posts.map(post => post._id === postId ? updatedPost : post));
      } catch (err) {
        console.error('Error adding comment:', err);
      }
    }
  };

  const handleConnect = async (userId) => {
    try {
      await usersAPI.sendConnectionRequest(userId);
      alert('Connection request sent!');
    } catch (err) {
      console.error('Error sending connection request:', err);
    }
  };

  return (
    <div className="page-dashboard">
      <div className="background-wrapper">
        <div className="overlay"></div>
      </div>

      <div className="dashboard-container">
        <Sidebar />

        <main className="feed">
          {/* Achievements Banner */}
          <div className="achievements-banner">
            <div className="achievements-content">
              <h2>🏆 JIT EXCELLENCE</h2>
              <div className="achievements-grid">
                <div className="achievement-card">
                  <img src="/assets/jit-images/nirf-raking.png" alt="NIRF Ranking" className="achievement-icon" />
                  <h3>TOP 100</h3>
                  <p>NIRF Ranking 2024</p>
                </div>
                <div className="achievement-card">
                  <img src="/assets/jit-images/NBA-LOGO-JIT.png" alt="NBA Accreditation" className="achievement-icon" />
                  <h3>NBA ACCREDITED</h3>
                  <p>Quality Education</p>
                </div>
                <div className="achievement-card">
                  <div style={{ fontSize: '40px', marginBottom: '10px' }}>🎓</div>
                  <h3>250+ PLACEMENTS</h3>
                  <p>Top Companies 2024</p>
                </div>
                <div className="achievement-card">
                  <div style={{ fontSize: '40px', marginBottom: '10px' }}>🚀</div>
                  <h3>13+ YEARS</h3>
                  <p>Excellence in Education</p>
                </div>
              </div>
            </div>
          </div>

          {/* Create Post */}
          <div className="create-post-card">
            <h3>SHARE YOUR ACHIEVEMENT</h3>
            {error && <div style={{ padding: '12px', marginBottom: '15px', background: 'rgba(220, 0, 0, 0.1)', border: '1px solid rgba(220, 0, 0, 0.3)', color: '#DC0000', fontSize: '14px' }}>{error}</div>}
            <textarea
              className="create-post-textarea"
              placeholder="Share your achievements, thoughts, or updates..."
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            ></textarea>
            
            {/* Image Preview */}
            {postImage && (
              <div style={{ position: 'relative', marginTop: '15px', marginBottom: '15px' }}>
                <img 
                  src={postImage} 
                  alt="Upload preview" 
                  style={{ 
                    width: '100%', 
                    maxHeight: '300px', 
                    objectFit: 'cover',
                    border: '2px solid rgba(220, 0, 0, 0.2)',
                    borderRadius: '4px'
                  }} 
                />
                <button
                  onClick={removeImage}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'var(--ferrari-red)',
                    color: 'white',
                    border: 'none',
                    padding: '8px 12px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '700',
                    borderRadius: '4px'
                  }}
                >
                  ✕ REMOVE
                </button>
              </div>
            )}

            <div className="post-actions">
              <label className="btn-secondary" style={{ cursor: 'pointer', display: 'inline-block' }}>
                📷 Photo
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
              </label>
              <select className="btn-secondary" value={postCategory} onChange={(e) => setPostCategory(e.target.value)}>
                <option value="general">General</option>
                <option value="internship">Internship</option>
                <option value="placement">Placement</option>
                <option value="research">Research</option>
                <option value="event">Event</option>
              </select>
              <button 
                className="btn-primary" 
                style={{ width: 'auto', padding: '12px 40px', margin: 0 }} 
                onClick={createPost}
                disabled={loading}
              >
                {loading ? 'POSTING...' : 'POST'}
              </button>
            </div>
          </div>

          {/* Posts Feed */}
          <div>
            {posts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', background: 'rgba(255, 255, 255, 0.92)', border: '2px solid rgba(220, 0, 0, 0.2)' }}>
                <p>No posts yet. Be the first to post!</p>
              </div>
            ) : (
              posts.map(post => (
                <div key={post._id || post.id} className="post-card">
                  <div className="post-header">
                    <div className="avatar">{(post.user?.name || post.author || 'U').charAt(0).toUpperCase()}</div>
                    <div className="post-author-info">
                      <h4>
                        {post.user?.name || post.author} 
                        <span className={`role-badge ${post.user?.role || post.role}`}>
                          {(post.user?.role || post.role).toUpperCase()}
                        </span>
                      </h4>
                      <p className="post-meta">{new Date(post.createdAt || Date.now()).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="post-content">
                    <p>{post.content}</p>
                    {post.image && <img src={post.image} alt="Post" className="post-image" />}
                  </div>
                  <div className="post-interactions">
                    <button className="interaction-btn" onClick={() => handleLike(post._id || post.id)}>
                      ❤️ {post.likes?.length || post.likes || 0}
                    </button>
                    <button className="interaction-btn" onClick={() => handleComment(post._id || post.id)}>
                      💬 {post.comments?.length || post.comments || 0}
                    </button>
                    <button className="interaction-btn">🔁 SHARE</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>

        {/* Right Panel */}
        <aside className="right-panel">
          <div className="panel-card">
            <h3>SUGGESTED CONNECTIONS</h3>
            {suggestions.length === 0 ? (
              <p style={{ textAlign: 'center', padding: '20px', color: 'rgba(0, 0, 0, 0.6)' }}>No suggestions yet</p>
            ) : (
              suggestions.map((person) => (
                <div key={person._id} className="suggestion-item">
                  <div className="avatar-sm">{person.name.charAt(0).toUpperCase()}</div>
                  <div className="suggestion-info">
                    <h4>{person.name}</h4>
                    <p>{person.role} • {person.branch || person.department || person.company || 'JIT'}</p>
                  </div>
                  <button className="btn-connect" onClick={() => handleConnect(person._id)}>CONNECT</button>
                </div>
              ))
            )}
          </div>

          <div className="panel-card">
            <h3>TRENDING TOPICS</h3>
            <div className="trending-topics">
              <div className="trending-item">#Placements2024</div>
              <div className="trending-item">#TechFest</div>
              <div className="trending-item">#Research</div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Dashboard;
