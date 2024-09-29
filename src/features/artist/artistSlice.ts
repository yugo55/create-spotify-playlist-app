import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Image {
  url: string;
  height: number;
  width: number;
}

interface Artist {
  id: string;
  name: string;
  images: Image[];
}

interface ArtistState {
  artists: Artist[];
}

const initialState: ArtistState = {
  artists: [],
}

const artistSlice = createSlice({
  name: "artist",
  initialState,
  reducers: {
    setArtists: (state, action: PayloadAction<Artist[]>) => {
      state.artists = action.payload;
    },
  },
});

export const { setArtists } = artistSlice.actions;
export default artistSlice.reducer;
