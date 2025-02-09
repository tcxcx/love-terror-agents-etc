export type GameState = {
    id: string;
    created_at: string;
    ascii_game: boolean;
    roses_game: boolean;
    guess_game: boolean;
    poem_game: boolean;
    password_auth?: boolean;
    poem_revealed?: boolean;
    nft_minted?: boolean;
    location_revealed?: boolean;
    date_scheduled?: boolean;
  }