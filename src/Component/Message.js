import "../Styles/Message.css";
import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";

export default function Messages() {
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState("");

  const [chats, setChats] = useState([
    {
      id: "chat_1",
      participants: [
        {
          id: "u1",
          name: "You",
          role: "me",
          avatar: "https://i.pravatar.cc/150?img=1",
        },
        {
          id: "u2",
          name: "John Fan",
          role: "fan",
          avatar: "https://i.pravatar.cc/150?img=12",
        },
      ],
      messages: [
        {
          id: "m1",
          senderId: "u2",
          text: "Hey I love your content 🔥",
          timestamp: Date.now() - 1000 * 60 * 60 * 3, // 3 hours ago
        },
        {
          id: "m2",
          senderId: "u1",
          text: "Thanks bro 🙌",
          timestamp: Date.now() - 1000 * 60 * 60 * 2,
        },
      ],
    },
  ]);

  // ✅ WHATSAPP STYLE TIME FORMAT
  const formatChatTime = (timestamp) => {
    if (!timestamp) return "";

    const now = new Date();
    const date = new Date(timestamp);

    const diffDays = Math.floor(
      (now - date) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    if (diffDays === 1) return "Yesterday";

    if (diffDays < 7) {
      return date.toLocaleDateString([], {
        weekday: "short",
      });
    }

    return date.toLocaleDateString([], {
      day: "2-digit",
      month: "short",
    });
  };
const formatTime = (timestamp) => {
  if (!timestamp) return "";

  const date = new Date(timestamp);

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};
  // ✅ SEND MESSAGE (NO MUTATION)
  const sendMessage = () => {
    if (!message.trim() || !activeChat) return;

    const newMessage = {
      id: Date.now(),
      senderId: "u1",
      text: message,
      timestamp: Date.now(),
    };

    const updatedChats = chats.map((chat) => {
      if (chat.id === activeChat.id) {
        return {
          ...chat,
          messages: [...chat.messages, newMessage],
        };
      }
      return chat;
    });

    setChats(updatedChats);

    setActiveChat({
      ...activeChat,
      messages: [...activeChat.messages, newMessage],
    });

    setMessage("");
  };
const handleTextareaChange = (e) => {
  setMessage(e.target.value);

  e.target.style.height = "auto";
  e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
};
  return (
    <div className="messages-container">

      {/* ================= CHAT LIST ================= */}
      {!activeChat && (
        <div className="chat-list">
          <h2>Messages</h2>

          {chats.map((chat) => {
            const otherUser = chat.participants.find(
              (p) => p.role !== "me"
            );

            const lastMsg =
              chat.messages[chat.messages.length - 1];

            return (
              <div
                key={chat.id}
                className="chat-item"
                onClick={() => setActiveChat(chat)}
              >
                <img
                  className="avatar"
                  src={otherUser.avatar}
                  alt="avatar"
                />

                <div className="chat-info">

                  <div className="chat-top">
                    <span className="chat-name">
                      {otherUser.name}
                    </span>

                    <span className="chat-time">
                      {formatChatTime(lastMsg?.timestamp)}
                    </span>
                  </div>

                  <div className="chat-preview">
                    {lastMsg?.text}
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ================= CHAT WINDOW ================= */}
      {activeChat && (
        <div className="chat-window">

          {/* HEADER */}
          {(() => {
            const otherUser = activeChat.participants.find(
              (p) => p.role !== "me"
            );

            return (
              <div  className="chat-header">
                <FiArrowLeft style={{cursor:'pointer'}} onClick={() => setActiveChat(null)}>
                  
                </FiArrowLeft>

                <img
                  className="avatar"
                  src={otherUser.avatar}
                  alt="avatar"
                />

                <span>{otherUser.name}</span>
              </div>
            );
          })()}

          {/* MESSAGES */}
       <div className="chat-messages">
  {activeChat.messages.map((msg) => {
    const isMe = msg.senderId === "u1";

    return (
      <div
        key={msg.id}
        className={`message ${isMe ? "me" : "them"}`}
      >
        <div className="msg-text">{msg.text}</div>

        <div className="msg-time">
          {formatTime(msg.timestamp)}
        </div>
      </div>
    );
  })}
</div>

          {/* INPUT */}
          <div className="chat-input">
           <textarea
  className="chat-textarea"
  value={message}
  onChange={handleTextareaChange}
  placeholder="Type a message..."
  rows={1}
/>

            <button onClick={sendMessage}>
              Send
            </button>
          </div>

        </div>
      )}
    </div>
  );
}