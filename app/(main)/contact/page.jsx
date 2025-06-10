import React from "react";
import { Mail, Linkedin, Twitter, Github, Instagram } from "lucide-react";

const Contact = () => {
  return (
    <div>
        <div className="grid-background"></div>
        <div className="py-20 px-4 text-center">
        <h1 className="text-4xl font-bold mb-6 text-foreground">
            Get in{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Touch
            </span>
        </h1>
        <p className="text-muted-foreground mb-10 text-lg">
            Feel free to reach out!!!
        </p>

        <div className="flex justify-center items-center gap-10 flex-nowrap overflow-auto">
            <a
            href="mailto:mentora@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-cyan-400 hover:text-blue-500 transition-colors whitespace-nowrap"
            >
            <Mail className="w-5 h-5" />
            mentora@gmail.com
            </a>

            <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-cyan-400 hover:text-blue-500 transition-colors"
            >
            <Linkedin className="w-5 h-5" />
            LinkedIn
            </a>

            <a
            href="https://twitter.com/yourhandle"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-cyan-400 hover:text-blue-500 transition-colors"
            >
            <Twitter className="w-5 h-5" />
            Twitter
            </a>

            <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-cyan-400 hover:text-blue-500 transition-colors"
            >
            <Github className="w-5 h-5" />
            GitHub
            </a>

            <a
            href="https://instagram.com/yourhandle"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-cyan-400 hover:text-blue-500 transition-colors"
            >
            <Instagram className="w-5 h-5" />
            Instagram
            </a>
        </div>
        </div>
    </div>
    
  );
};

export default Contact;
