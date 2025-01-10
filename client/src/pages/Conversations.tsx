import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Import ShadCN Input
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MdChat } from "react-icons/md"; // Assuming you want a chat icon for the room

type Room = {
  id: number;
  name: string;
};

type Message = {
  id: number;
  text: string;
};

const Conversations = () => {
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState<string>("");

  // Define the rooms
  const rooms: Room[] = [
    { id: 1, name: "Room 1" },
    { id: 2, name: "Room 2" },
    { id: 3, name: "Room 3" },
    { id: 4, name: "Room 4" },
  ];

  // Define messages for each room
  const messages: Record<number, Message[]> = {
    1: [
      { id: 1, text: "Hello from Room 1!" },
      { id: 2, text: "How are you?" },
    ],
    2: [
      { id: 1, text: "Welcome to Room 2" },
      { id: 2, text: "Let's start chatting!" },
    ],
    3: [
      { id: 1, text: "Room 3 is active!" },
      { id: 2, text: "Join the conversation." },
    ],
    4: [
      { id: 1, text: "This is Room 4" },
      { id: 2, text: "Feel free to talk!" },
    ],
  };

  // Handle sending a new message
  const handleMessageSend = () => {
    if (newMessage.trim() && selectedRoom !== null) {
      messages[selectedRoom].push({
        id: messages[selectedRoom].length + 1,
        text: newMessage,
      });
      setNewMessage(""); // Reset input after sending
    }
  };

  return (
    <div className="flex flex-col w-full space-y-4">
      <h1 className="text-2xl font-bold mb-4">Conversations</h1>

      {/* Rooms Section */}
      <div className="flex space-x-4">
        {rooms.map((room) => (
          <Card
            key={room.id}
            className="cursor-pointer hover:bg-gray-200 transition-colors"
            onClick={() => setSelectedRoom(room.id)}
          >
            <CardHeader>
              <CardTitle>{room.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className="w-full">
                    <MdChat className="mr-2" />
                    Join Room
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <p className="text-sm">Click to join the conversation.</p>
                </PopoverContent>
              </Popover>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Messages in Selected Room */}
      {selectedRoom && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            Messages in {rooms.find((room) => room.id === selectedRoom)?.name}
          </h2>
          <div className="space-y-2 bg-gray-100 p-4 rounded-md">
            {messages[selectedRoom]?.map((message) => (
              <div key={message.id} className="p-2 bg-white rounded-md">
                {message.text}
              </div>
            ))}
          </div>

          {/* New Message Section with ShadCN Input */}
          <div className="mt-4">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="w-full p-2 mb-2"
              placeholder="Type a new message"
            />
            <Button
              onClick={handleMessageSend}
              className="w-full"
              disabled={!newMessage.trim()}
            >
              Send Message
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Conversations;
