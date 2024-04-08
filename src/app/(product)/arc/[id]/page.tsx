"use client";
import { useEffect, useState } from "react";

function Page() {
  const [theInput, setTheInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [task, setTask] = useState();
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Yo dawg, this is your bot! How can I help you today?",
    },
  ]);
  const Submit = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      callGetResponse();
    }
  };
  const callGetResponse = async () => {
    setIsLoading(true);
    let temp = messages;
    temp.push({ role: "user", content: "" });
    setMessages(temp);
    setTheInput("");
    console.log("Calling OpenAI...");

    const response = await fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ messages }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.content);

    setMessages((prevMessages) => [...prevMessages, output]);
    setTask(output.content);
    setIsLoading(false);
  };
  useEffect(() => {
    callGetResponse();
  }, []);
  return <div>{task}</div>;
}

export default Page;
