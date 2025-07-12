import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiChevronRight } = FiIcons;

const QuestionStep = ({ question, onAnswer, currentAnswers = [] }) => {
  const [selectedOptions, setSelectedOptions] = useState(currentAnswers);

  const handleOptionToggle = (option) => {
    let newSelection;
    
    if (question.type === 'limited') {
      if (selectedOptions.includes(option)) {
        newSelection = selectedOptions.filter(item => item !== option);
      } else if (selectedOptions.length < question.limit) {
        newSelection = [...selectedOptions, option];
      } else {
        return; // Don't allow more than limit
      }
    } else {
      if (selectedOptions.includes(option)) {
        newSelection = selectedOptions.filter(item => item !== option);
      } else {
        newSelection = [...selectedOptions, option];
      }
    }
    
    setSelectedOptions(newSelection);
  };

  const handleContinue = () => {
    onAnswer(question.id, selectedOptions);
  };

  const canContinue = selectedOptions.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
    >
      {/* Question Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-full mb-4">
          <SafeIcon icon={question.icon} className="w-8 h-8 text-purple-300" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">
          {question.title}
        </h2>
        <p className="text-purple-200">
          {question.subtitle}
          {question.type === 'limited' && (
            <span className="block text-sm text-purple-300 mt-1">
              ({selectedOptions.length}/{question.limit} selected)
            </span>
          )}
        </p>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {question.options.map((option, index) => {
          const isSelected = selectedOptions.includes(option);
          const isDisabled = question.type === 'limited' && 
                           !isSelected && 
                           selectedOptions.length >= question.limit;
          
          return (
            <motion.button
              key={option}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleOptionToggle(option)}
              disabled={isDisabled}
              className={`
                p-4 rounded-xl border-2 transition-all duration-200 text-left
                ${isSelected
                  ? 'bg-purple-500/30 border-purple-400 text-white'
                  : isDisabled
                    ? 'bg-gray-500/10 border-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-purple-300'
                }
              `}
              whileHover={!isDisabled ? { scale: 1.02 } : {}}
              whileTap={!isDisabled ? { scale: 0.98 } : {}}
            >
              <div className="font-medium">{option}</div>
            </motion.button>
          );
        })}
      </div>

      {/* Continue Button */}
      <div className="text-center">
        <motion.button
          onClick={handleContinue}
          disabled={!canContinue}
          className={`
            inline-flex items-center space-x-2 px-8 py-3 rounded-full font-medium transition-all duration-200
            ${canContinue
              ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }
          `}
          whileHover={canContinue ? { scale: 1.05 } : {}}
          whileTap={canContinue ? { scale: 0.95 } : {}}
        >
          <span>Continue</span>
          <SafeIcon icon={FiChevronRight} className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default QuestionStep;