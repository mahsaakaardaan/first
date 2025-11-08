'use client';
import { create } from 'zustand';

type CommentStoreType = {
  commentData: any;
  setCommentData: (fn: (prev: any) => any) => void;
};

export const useCommentStore = create<CommentStoreType>((set) => ({
  commentData: {},
  setCommentData: (fn) => {
    set((state) => ({
      commentData: fn(state.commentData)
    }));
  }
}));
