import React, { useState } from "react";
import { connect } from "react-redux";
import { fetchSongs, fetchMoreSongs } from "../redux/actions/songsActions";
import { setTrackIndex, togglePlay } from "../redux/actions/playerActions";
import styled from "styled-components";

const BarWrapper = styled.div`
  width: 100%;
  height: 10vh;
  background: #18829c;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  top: 0;
`;

const SearchBar = props => {
  const [search, setSearch] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (search === props.lastQuery) {
      props.getMoreSongs(search);
    } else {
      props.setTrackIndex(0);
      props.togglePlay(false);
      props.getSongs(search);
    }
    e.target.reset();
    setSearch("");
  };
  const handleChange = e => {
    setSearch(e.target.value);
  };
  return (
    <BarWrapper>
      <p>
        <span role="img" aria-label="music note">
          🎵
        </span>{" "}
        MusicApp
      </p>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} type="text" />
        <button type="submit">search</button>
      </form>
    </BarWrapper>
  );
};
const mapStateToProps = state => {
  return { lastQuery: state.songs.lastQuery };
};

const mapDispatchToProps = dispatch => {
  return {
    getSongs: query => dispatch(fetchSongs(query)),
    getMoreSongs: query => dispatch(fetchMoreSongs(query)),
    setTrackIndex: index => dispatch(setTrackIndex(index)),
    togglePlay: index => dispatch(togglePlay(index))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
