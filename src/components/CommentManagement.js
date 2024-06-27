import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Custom function to convert Vietnamese characters to Latin characters
const convertVietnameseToLatin = (text) => {
  text = text.toLowerCase();
  const from = "àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđ";
  const to   = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyd";
  for (let i = 0; i < from.length; i++) {
    text = text.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }
  return text;
};

// Function to convert text to slug format
const convertToSlug = (text) => {
  text = convertVietnameseToLatin(text);
  return text
    .normalize('NFD') // Normalize the string
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritical marks
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace spaces and non-alphanumeric characters with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading and trailing hyphens
};

const CommentsList = () => {
  const [comments, setComments] = useState([]);
  const [mangaName, setMangaName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [totalComments, setTotalComments] = useState(0);

  useEffect(() => {
    const fetchComments = async () => {
      if (mangaName) {
        try {
          const response = await axios.get(`https://itec-mangaapp-ef4733c4d23d.herokuapp.com/api/Comments/comments/${mangaName}`);
          setComments(response.data); // assuming response.data is the array of comments
          setTotalComments(response.data.length); // update total comments count
        } catch (error) {
          console.error('Error fetching comments:', error);
        }
      }
    };

    fetchComments();
  }, [mangaName]);

  const handleSearch = () => {
    const slug = convertToSlug(searchTerm);
    console.log(`Searching for comments in manga "${slug}"`);
    setMangaName(slug);
  };

  return (
    <div>
      <h2>Search Manga Comments</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter manga name"
      />
      <button onClick={handleSearch}>Search</button>
      <h2>Total Comments: {totalComments}</h2>
      <h2>Comments</h2>
      {comments.length === 0 ? (
        <p>No comments</p>
      ) : (
        <ul>
          {comments.map((comment, index) => (
            <li key={comment.commentId}>
              <div>
                <span>{index + 1}. </span>
                <img
                  src={comment.user.avatar}
                  alt={comment.user.userName}
                  style={{ width: '50px', borderRadius: '50%' }}
                />
                <strong>{comment.user.userName}</strong> -{' '}
                {new Date(comment.createdAt).toLocaleString()}
              </div>
              <p>{comment.comment}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
  
};

export default CommentsList;
