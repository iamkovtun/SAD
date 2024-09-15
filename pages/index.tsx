import Image from "next/image";
import localFont from "next/font/local";
import { useState } from "react";
import Typing from 'react-typing-effect';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const steps = [
  {
    name: 'Welcome',
    speech: "You're here... and that's enough. Sometimes, the world feels like it's moving in all directions, but right now... we focus on you. Let's breathe together, and begin this small, gentle journey.",
    audio: '/audios/welcome.mp3',
  },
  {
    name: 'Light',
    speech: "Well… the first thing we need is a touch of light. When everything feels heavy, your space can offer some relief. So, let's brighten things up. Maybe adjust the lighting… or if it's bright outside, why not open the curtains or go to a window?",
    audio: '/audios/light.mp3',
    task: 'Either open the curtains and let in natural light or turn on the lights around you.',
    options: {
      optionOne: 'Done',
      optionTwo: "I'll skip this",
    },
  },
  {
    name: 'Stretching',
    speech: "Now, let’s get the blood flowing. Even a little movement can make a big difference, hmm? Stretch those legs or do a bit of light exercise. It doesn’t have to be much, just enough to warm you up a bit.",
    audio: '/audios/stretching.mp3',
    task: 'Take 5 minutes to stretch or do some light exercise. A timer will help you keep track.',
    options: {
      optionOne: "I've done it",
      optionTwo: "I'll pass",
    },
  },

];

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleAudioPlay = () => {
    const audio = new Audio(steps[currentStep].audio);
    audio.play();
    setPlaying(true);
    audio.onended = () => setPlaying(false);
  };
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 text-center`}
    >
       {/* Top Navigation (Audio Icon, Toggle, and Menu) */}
       <div className="absolute top-4 right-4 flex items-center space-x-4">
        {/* Audio Icon */}
        <button onClick={handleAudioPlay} className="text-gray-500 hover:text-gray-800">
          🔊
        </button>

        {/* Toggle Switch */}
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
        </label>

        {/* Menu Icon */}
        <button className="text-gray-500 hover:text-gray-800">
          ☰
        </button>
      </div>

      {/* Typing Text */}
      <div className="text-center text-gray-700 text-xl font-light">
        <Typing
          text={steps[currentStep].speech}
          speed={50} // Controls the typing speed
          eraseDelay={1000000} // Prevent erasing
        />
      </div>
    </div>
  );
}
