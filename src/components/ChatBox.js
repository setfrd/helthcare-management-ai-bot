// src/components/ChatBox.js

// Import necessary hooks and axios
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import ProfileSidebar from './ProfileSidebar';

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [userProfile, setUserProfile] = useState({}); // State for user profile
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Dependency array includes messages

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Profile data:', response.data);
      setUserProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);
  
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user's question to the chat
    const newUserMessage = { text: inputValue, sender: 'user' };
    setMessages(messages => [...messages, newUserMessage]);

    try {
        // Call OpenAI API for a response
        const token = localStorage.getItem('token');
        const profile = await axios.get('/api/profile', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!profile) {
            throw new Error('User profile not found');
        }
        console.log("Profile:", profile);
        const response = await axios.post('/api/openai', {
          userProfile: userProfile, 
          userQuestion: inputValue,
          messages: messages.map(message => ({
              role: message.sender === 'user' ? 'user' : 'assistant',
              content: message.text
          }))
      });
      
        console.log("OpenAI Response:", response);

        if (response.data.choices && response.data.choices.length > 0) {
            const aiResponse = response.data.choices[0].message.content.trim();
            console.log("AI Response:", aiResponse);

            // Add GPT response to the chat
            const newAiMessage = { text: aiResponse, sender: 'ai' };
            setMessages(messages => [...messages, newAiMessage]);
        } else {
            console.error('No AI response found in the OpenAI API response.');
        }
    } catch (error) {
        console.error('Error in OpenAI API call:', error);
        if (axios.isAxiosError(error) && error.response) {
            console.error('Error response data:', error.response.data);
            console.error('Error response status:', error.response.status);
            console.error('Error response headers:', error.response.headers);
        } else {
            console.error('Error message:', error.message);
        }
    }

    setInputValue('');
};


  const handleLogout = async () => {
      localStorage.removeItem('token');
      // Redirect to login page or home page
      window.location.href = '/';
    };

  return (
    <div className="flex h-full">
      <ProfileSidebar onLogout={handleLogout} />
      <div className="flex flex-col flex-grow">
        {/* Chat Messages Container */}
        <div className="flex-grow overflow-auto p-4">
          {messages.map((message, index) => (
            <div 
              key={index}
              className={`rounded-lg p-2 max-w-xs mx-2 my-1 shadow ${message.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 ml-auto'}`}
            >
              {message.text}
            </div>
          ))}
          {/* <div ref={messagesEndRef} /> */}
        </div>
  
        {/* Chat Input Form */}
        <form onSubmit={handleSendMessage} className="flex p-4 bg-white border-t-2 border-gray-300"> 
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 rounded-full p-2 border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 transition duration-300"
            aria-label="Message Input"
          />
          <button type="submit" className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 ease-in-out" aria-label="Send Message">Send</button>
        </form>
      </div>
    </div>
  );
    
}