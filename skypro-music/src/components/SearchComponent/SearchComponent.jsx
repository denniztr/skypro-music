import * as S from './Search.styles'
import { setValue } from '../../pages/store/playerSlice';
import { useDispatch } from 'react-redux';

export function SearchComponent () {
  const dispatch = useDispatch();
  return (
    <S.CenterblockSearch>
      <S.SearchSvg>
        <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
      </S.SearchSvg>
      <S.SearchText type="search" placeholder="Поиск" name="search" onChange={(event) => dispatch(setValue(event.target.value))}/>
    </S.CenterblockSearch>
  );
};


