import { useResizeDetector } from "react-resize-detector";
import { connect, useSelector } from "react-redux";
import styled from "styled-components";
import { algolia } from "../../../Utils/firebase";

import { ButtonIcon } from "../Button/ButtonIcon";

import {
  handleSearchFilters,
  setLastSearch,
} from "../../../Redux/Reducers/home";

import { resetSearchResult } from "../../../Redux/Reducers/lots";

import { colors } from "../../../Utils/palette";

const ResultMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${({ isOn }) => (isOn ? "28px" : "0px")};
  margin-bottom: ${({ isOn }) => (isOn ? "40px" : "0px")};
  transition: 0.12s linear;
  overflow: hidden;

  .result_message {
    margin-right: 6px;
    font-weight: 800;
    font-size: 22px;
    line-height: 28px;
    text-align: center;
    letter-spacing: -0.56px;
    color: ${colors.fontTitle};
  }
`;

const FilterButton = styled.button`
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width}px;
  height: 40px;
  padding: 0 16px;
  border: 0;
  background-color: transparent;
  cursor: pointer;
  outline: none;

  .filters_btn_title {
    font-weight: 600;
    font-size: 14px;
    line-height: 24px;
    text-align: center;
    letter-spacing: -0.16px;
    color: ${({ active, disabled }) => {
      if (disabled) return colors.fontDisabled;
      return active ? colors.fontTitle : colors.primary;
    }};
  }
`;

const FiltersStyled = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .filter_btns_wrapper {
    display: flex;
    align-items: center;
    width: fit-content;
    height: 72px;
  }
`;

const Wrapper = styled.div`
  margin-bottom: 24px;
`;

const ShapeStyled = styled.svg`
  z-index: -2;
  position: absolute;
  top: 0;
  left: 0;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  fill: ${({ bg }) => bg};
  transition: fill 0.08s linear;
`;

const Shape = ({
  width,
  height,
  icon = null,
  smoothQ = 98,
  radius = 23.33,
  loader = false,
  active = false,
  bg = false,
  disabled = false,
  //   handler = () => console.log("cta empty"),
}) => {
  const colorState = () => {
    if (active) return "#ffffff";
    if (bg) return "#f7f6f8";
    return "transparent";
  };

  const W = width;
  const H = height;
  const R = H / 2 < radius ? H / 2 : radius;
  const S = (0.08 + R * 0.000012) * smoothQ - 4 / smoothQ - 3;
  return (
    <ShapeStyled
      active={active}
      version="1.1"
      width="100%"
      height="100%"
      bg={colorState()}
      shapeRendering="geometricPrecision"
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={`M ${R} 0 H${W - R} C ${W - S} 0 ${W} ${S} ${W} ${R}
          V ${H - R} C ${W} ${H - S} ${W - S} ${H} ${W - R} ${H}
          H ${R} C ${S} ${H} 0 ${H - S} 0 ${H - R}
          V ${R} C 0 ${S} ${S} 0 ${R} 0 Z`}
      ></path>
    </ShapeStyled>
  );
};

const Filters = ({
  isSearching,
  lastSearch,
  filterSelected,
  handleSearchFilters,
  setLastSearch,
  resetSearchResult,
}) => {
  const { icons } = useSelector((state) => state.ui);
  const { width, height, ref } = useResizeDetector();

  const buttons = [
    { name: "desc", title: "Новые объявления", w: 164, h: 40 },
    { name: "asc", title: "Скоро закончатся", w: 164, h: 40 },
  ];

  const filterButtonHandler = (filt) => {
    algolia.setSettings({ customRanking: [`${filt}(expireDate)`] }).then(() => {
      handleSearchFilters(filt);
    });
  };

  const resetSearchHandler = () => {
    resetSearchResult();
    setLastSearch("");
  };

  return (
    <Wrapper>
      <ResultMessage isOn={!!lastSearch && !isSearching}>
        <div className="result_message">Результаты поиска по запросу:</div>
        <div className="result_message" style={{ color: colors.primary }}>
          {lastSearch}
        </div>

        <ButtonIcon
          icon={icons.cancel}
          handler={resetSearchHandler}
          disabled={isSearching}
        />
      </ResultMessage>

      <FiltersStyled>
        {width && height && <Shape width={width + 32} height={height} bg />}

        <div className="filter_btns_wrapper" ref={ref}>
          {buttons.map((btn) => (
            <FilterButton
              key={btn.name}
              active={btn.name === filterSelected}
              onClick={() => filterButtonHandler(btn.name)}
              disabled={isSearching}
            >
              <Shape
                width={btn.w}
                height={btn.h}
                active={btn.name === filterSelected}
                radius={14}
              />

              <div className="filters_btn_title">{btn.title}</div>
            </FilterButton>
          ))}
        </div>
      </FiltersStyled>
    </Wrapper>
  );
};

const mstp = (state) => ({
  isSearching: state.home.isSearching,
  lastSearch: state.home.lastSearch,
  filterSelected: state.home.filterSelected,
});

export const FiltersCont = connect(mstp, {
  handleSearchFilters,
  setLastSearch,
  resetSearchResult,
})(Filters);
