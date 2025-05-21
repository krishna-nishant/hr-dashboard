import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BookmarksState {
  bookmarkedIds: number[];
  isBookmarked: (id: number) => boolean;
  toggleBookmark: (id: number) => void;
  addBookmark: (id: number) => void;
  removeBookmark: (id: number) => void;
}

export const useBookmarks = create<BookmarksState>()(
  persist(
    (set, get) => ({
      bookmarkedIds: [],
      
      isBookmarked: (id: number) => {
        return get().bookmarkedIds.includes(id);
      },
      
      toggleBookmark: (id: number) => {
        const { isBookmarked, addBookmark, removeBookmark } = get();
        
        if (isBookmarked(id)) {
          removeBookmark(id);
        } else {
          addBookmark(id);
        }
      },
      
      addBookmark: (id: number) => {
        const { bookmarkedIds, isBookmarked } = get();
        
        if (!isBookmarked(id)) {
          set({ bookmarkedIds: [...bookmarkedIds, id] });
        }
      },
      
      removeBookmark: (id: number) => {
        const { bookmarkedIds } = get();
        
        set({
          bookmarkedIds: bookmarkedIds.filter(bookmarkId => bookmarkId !== id)
        });
      }
    }),
    {
      name: 'hr-dashboard-bookmarks',
    }
  )
); 