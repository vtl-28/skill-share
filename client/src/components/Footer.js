import React from "react";
import {
  FaFacebookSquare,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="px-24 py-8 xs:px-2 md:px-24">
      <div className="flex justify-between xs:w-full md:w-75">
        <div className="flex flex-col">
          <h1 className="text-white mb-2">Your account</h1>
          <ul>
            <li className="text-zinc-400  mb-2">Sign up</li>
            <li className="text-zinc-400 mb-2">Log in</li>
            <li className="text-zinc-400 mb-2">Help</li>
            <li className="text-zinc-400">Become an affiliate</li>
          </ul>
        </div>
        <div className="flex flex-col">
          <h1 className="text-white mb-2">Discover</h1>
          <ul>
            <li
              className="text-zinc-400  mb-2"
              style={{ textColor: "#F6F7F8" }}
            >
              Groups
            </li>
            <li
              className="text-zinc-400  mb-2"
              style={{ textColor: "#F6F7F8" }}
            >
              Calender
            </li>
            <li className="text-zinc-400 mb-2" style={{ textColor: "#F6F7F8" }}>
              Topics
            </li>
            <li
              className="text-zinc-400  mb-2"
              style={{ textColor: "#F6F7F8" }}
            >
              Cities
            </li>
            <li
              className="text-zinc-400  mb-2"
              style={{ textColor: "#F6F7F8" }}
            >
              Online events
            </li>
            <li
              className="text-zinc-400  mb-2"
              style={{ textColor: "#F6F7F8" }}
            >
              Local guides
            </li>
          </ul>
        </div>
        <div className="flex flex-col">
          <h1 className="text-white mb-2">Talk Host</h1>
          <ul>
            <li
              className="text-zinc-400  mb-2"
              style={{ textColor: "#F6F7F8" }}
            >
              About
            </li>
            <li
              className="text-zinc-400  mb-2"
              style={{ textColor: "#F6F7F8" }}
            >
              Blog
            </li>
            <li
              className="text-zinc-400  mb-2"
              style={{ textColor: "#F6F7F8" }}
            >
              Careers
            </li>
            <li
              className="text-zinc-400  mb-2"
              style={{ textColor: "#F6F7F8" }}
            >
              Apps
            </li>
            <li
              className="text-zinc-400  mb-2"
              style={{ textColor: "#F6F7F8" }}
            >
              Podcast
            </li>
          </ul>
        </div>
      </div>

      <div className="flex justify-between mt-4 footer-style xs:flex-col md:flex-row">
        <div className="flex flex-col w-25 xs:mb-4">
          <h1 className="text-white mb-3">Follow us</h1>
          <div className="flex justify-between">
            <a href="#" className="text-white text-3xl">
              <FaFacebookSquare />
            </a>
            <a href="#" className="text-white text-3xl">
              <FaTwitter />
            </a>
            <a href="#" className="text-white text-3xl">
              <FaLinkedin />
            </a>
            <a href="#" className="text-white text-3xl">
              <FaYoutube />
            </a>
          </div>
        </div>
        <div className="flex align-items-end">
          <a href="#" className="mr-5">
            <img alt="download on playstore" src="http://res.cloudinary.com/dd1jqwp94/image/upload/v1679806455/qgjvt2vkgsixanuiihzp.png" />
          </a>
          <a href="#">
            <img  alt="download on istore" src="http://res.cloudinary.com/dd1jqwp94/image/upload/v1678597472/rq4fmagcxlkwpl6qgybu.png" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
