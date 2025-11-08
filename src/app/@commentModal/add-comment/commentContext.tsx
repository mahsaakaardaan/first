'use client'
import { createContext, useContext, useState } from 'react';

export const CommentContext = createContext();

export const CommentProvider = ({ children }) => {
  const [commentData, setCommentData] = useState({});

  return (
    <CommentContext.Provider value={{ commentData, setCommentData }}>
      {children}
    </CommentContext.Provider>
  );
};

export const useComment = () => {
  const context = useContext(CommentContext);
  if (!context) {
    throw new Error(
      'useComments must be used inside CommentProvider'
    );
  }
  return context;
};
