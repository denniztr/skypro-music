import React, { useState, useEffect } from 'react';
import LoadingComponent from '../LoadingComponent/LoadingComponent'
import * as S from './Playlist.styles'

export default function PlayListComponent () {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loading = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(loading)

  }, []);

  return (
    <S.SidebarList>
      <S.SidebarItem>
        <S.SidebarLink href="#">
          {isLoading ? (
            <LoadingComponent/> 
          ) : (
            <S.SidebarImg
            src="./img/playlist01.png"
            alt="day's playlist"
          />
          )}
        </S.SidebarLink>
      </S.SidebarItem>
      <S.SidebarItem>
        <S.SidebarLink href="#">
        {isLoading ? (
            <LoadingComponent/> 
          ) : (
            <S.SidebarImg
            src="./img/playlist02.png"
            alt="day's playlist"
          />
          )}
        </S.SidebarLink>
      </S.SidebarItem>
      <S.SidebarItem>
      <S.SidebarLink href="#">
      {isLoading ? (
            <LoadingComponent/> 
          ) : (
            <S.SidebarImg
            src="./img/playlist03.png"
            alt="day's playlist"
          />
          )}
        </S.SidebarLink>
      </S.SidebarItem>
    </S.SidebarList>
  );
};
