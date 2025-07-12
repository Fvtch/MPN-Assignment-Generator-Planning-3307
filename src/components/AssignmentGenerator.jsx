import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QuestionStep from './QuestionStep';
import AssignmentResult from './AssignmentResult';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiMusic, FiZap, FiTarget } = FiIcons;

const AssignmentGenerator = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    creativeArchetypes: [],
    technicalArchetypes: [],
    favoriteGenres: []
  });
  const [assignment, setAssignment] = useState('');

  const questions = [
    {
      id: 'creativeArchetypes',
      title: 'Creative Archetype',
      subtitle: 'Select all that apply to your creative identity',
      type: 'multiple',
      icon: FiMusic,
      options: [
        'Musician', 'Singer', 'Songwriter', 'Rapper', 'Electronic Musician',
        'Beatmaker', 'Singer-Songwriter', 'Musician-Songwriter', 'Lyricist',
        'Composer', 'Sound Designer'
      ]
    },
    {
      id: 'technicalArchetypes',
      title: 'Technical Archetype',
      subtitle: 'Select all that apply to your technical skills',
      type: 'multiple',
      icon: FiZap,
      options: [
        'Producer', 'Audio Engineer', 'Mix Engineer', 'Mastering Engineer'
      ]
    },
    {
      id: 'favoriteGenres',
      title: 'Favorite Genres',
      subtitle: 'Choose up to 2 genres that inspire you',
      type: 'limited',
      limit: 2,
      icon: FiTarget,
      options: [
        'Pop', 'Rock', 'Hip-Hop', 'EDM', 'House', 'Dubstep', 'Trap',
        'Jazz', 'Indie', 'Lo-fi', 'Ambient', 'R&B', 'Funk', 'Soul', 'Classical'
      ]
    }
  ];

  const generateAssignment = (finalAnswers) => {
    const { creativeArchetypes, technicalArchetypes, favoriteGenres } = finalAnswers;
    
    // Default to Pop and Electronic if no genres selected
    const selectedGenres = favoriteGenres.length > 0 ? favoriteGenres : ['Pop', 'Electronic'];
    const genre1 = selectedGenres[0];
    const genre2 = selectedGenres[1] || selectedGenres[0];
    
    // Random creative and technical selections
    const creativeRole = creativeArchetypes[Math.floor(Math.random() * creativeArchetypes.length)] || 'Musician';
    const technicalRole = technicalArchetypes[Math.floor(Math.random() * technicalArchetypes.length)] || 'Producer';
    
    // Production techniques based on genre and role
    const productionTechniques = {
      'Pop': ['catchy melody', 'vocal harmony', 'polished arrangement'],
      'Rock': ['power chord progression', 'driving drum pattern', 'guitar riff'],
      'Hip-Hop': ['rhythmic beat', 'vocal sample', 'bass-heavy groove'],
      'EDM': ['synth lead', 'build-up section', 'drop sequence'],
      'House': ['four-on-the-floor beat', 'filtered bassline', 'vocal loop'],
      'Dubstep': ['wobble bass', 'syncopated rhythm', 'heavy drop'],
      'Trap': ['hi-hat pattern', '808 kick', 'snare roll'],
      'Jazz': ['chord progression', 'improvised section', 'swing rhythm'],
      'Indie': ['atmospheric texture', 'dreamy melody', 'vintage sound'],
      'Lo-fi': ['vinyl crackle texture', 'mellow chord progression', 'tape saturation'],
      'Ambient': ['evolving soundscape', 'ethereal pad', 'spatial reverb'],
      'R&B': ['smooth groove', 'vocal run', 'soulful progression'],
      'Funk': ['syncopated bassline', 'tight groove', 'rhythmic guitar'],
      'Soul': ['emotional vocal', 'warm arrangement', 'dynamic build'],
      'Classical': ['orchestral arrangement', 'melodic theme', 'harmonic progression']
    };
    
    const technicalSkills = {
      'Producer': ['layering techniques', 'arrangement skills', 'sound selection'],
      'Audio Engineer': ['recording techniques', 'microphone placement', 'signal processing'],
      'Mix Engineer': ['EQ and compression', 'spatial positioning', 'dynamic processing'],
      'Mastering Engineer': ['frequency balancing', 'stereo enhancement', 'loudness optimization']
    };
    
    const finishingActions = [
      'mixing with reverb and EQ techniques',
      'adding final polish and effects',
      'mastering for streaming platforms',
      'creating a professional mix',
      'applying creative processing',
      'balancing all elements perfectly'
    ];
    
    const technique = productionTechniques[genre1]?.[Math.floor(Math.random() * productionTechniques[genre1].length)] || 'musical arrangement';
    const skill = technicalSkills[technicalRole]?.[Math.floor(Math.random() * technicalSkills[technicalRole].length)] || 'production techniques';
    const action = finishingActions[Math.floor(Math.random() * finishingActions.length)];
    
    return `Create a ${technique} in the style of ${genre1}, using your skills as a ${creativeRole}. Then, apply ${skill} as a ${technicalRole}, and finish your assignment by ${action} in the style of ${genre2}.`;
  };

  const handleAnswer = (questionId, value) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Generate assignment
      const generatedAssignment = generateAssignment(newAnswers);
      setAssignment(generatedAssignment);
      setCurrentStep(currentStep + 1);
    }
  };

  const resetGenerator = () => {
    setCurrentStep(0);
    setAnswers({
      creativeArchetypes: [],
      technicalArchetypes: [],
      favoriteGenres: []
    });
    setAssignment('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            MPN Assignment Generator
          </h1>
          <p className="text-xl text-purple-200">
            Discover your personalized music production quest
          </p>
        </motion.div>

        {/* Progress Bar */}
        {currentStep < questions.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <div className="flex justify-center mb-4">
              <div className="flex space-x-2">
                {questions.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                      index <= currentStep
                        ? 'bg-purple-400'
                        : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="text-center text-purple-200">
              Step {currentStep + 1} of {questions.length}
            </div>
          </motion.div>
        )}

        {/* Content */}
        <AnimatePresence mode="wait">
          {currentStep < questions.length ? (
            <QuestionStep
              key={currentStep}
              question={questions[currentStep]}
              onAnswer={handleAnswer}
              currentAnswers={answers[questions[currentStep].id]}
            />
          ) : (
            <AssignmentResult
              key="result"
              assignment={assignment}
              onReset={resetGenerator}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AssignmentGenerator;