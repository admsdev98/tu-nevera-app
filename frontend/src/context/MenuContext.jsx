import { createContext, useState } from 'react';

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [currentMenu, setCurrentMenu] = useState(null);
  const [menuHistory, setMenuHistory] = useState([]);
  const [generating, setGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState('');

  const startGeneration = () => {
    setGenerating(true);
    setGenerationStep('Iniciando...');
  };

  const updateGenerationStep = (step) => {
    setGenerationStep(step);
  };

  const completeGeneration = (menu) => {
    setCurrentMenu(menu);
    setMenuHistory((prev) => [menu, ...prev]);
    setGenerating(false);
    setGenerationStep('');
  };

  const failGeneration = () => {
    setGenerating(false);
    setGenerationStep('');
  };

  const clearCurrentMenu = () => {
    setCurrentMenu(null);
  };

  const value = {
    currentMenu,
    menuHistory,
    generating,
    generationStep,
    startGeneration,
    updateGenerationStep,
    completeGeneration,
    failGeneration,
    clearCurrentMenu,
    setMenuHistory,
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};
