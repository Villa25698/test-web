import { useState, useEffect } from 'react';

const useExperiences = () => {
  const [experiences, setExperiences] = useState<string[]>([]);

  useEffect(() => {
    const fetchedExperiences = ["Java", "React", "Cyber Security", "HTML", "CSS"];
    setExperiences(fetchedExperiences);
  }, []);

  return experiences;
};

export default useExperiences;
