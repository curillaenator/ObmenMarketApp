import { useResizeDetector } from "react-resize-detector";
import { connect } from "react-redux";
import styled from "styled-components";
import { algolia } from "../../../Utils/firebase";

import { colors } from "../../../Utils/palette";

import { handleSearchFilters } from "../../../Redux/Reducers/home";

const FilterButton = styled.div`
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width}px;
  height: 40px;
  //   margin: 0 16px;
  padding: 0 16px;
  cursor: pointer;

  .filters_btn_title {
    font-weight: 600;
    font-size: 14px;
    line-height: 24px;
    text-align: center;
    letter-spacing: -0.16px;
    color: ${({ active }) => (active ? colors.fontTitle : colors.primary)};
  }
`;

const FiltersStyled = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margn: 8px 0;

  .filter_btns_wrapper {
    display: flex;
    align-items: center;
    width: fit-content;
    height: 72px;
  }
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
  transition = 0.06,
  title = "",
  icon = null,
  smoothQ = 98,
  radius = 23.33,
  loader = false,
  active = false,
  bg = false,
  //   disabled = false,
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
}) => {
  const { width, height, ref } = useResizeDetector();

  const buttons = [
    { name: "desc", title: "Новые объявления", w: 164, h: 40 },
    { name: "asc", title: "Скоро закончатся", w: 164, h: 40 },
  ];

  console.log(algolia);

  return (
    <FiltersStyled>
      {width && height && <Shape width={width + 32} height={height} bg />}

      <div className="filter_btns_wrapper" ref={ref}>
        {buttons.map((btn) => (
          <FilterButton
            key={btn.name}
            active={btn.name === filterSelected}
            onClick={() => handleSearchFilters(btn.name)}
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
  );
};

const mstp = (state) => ({
  isSearching: state.home.isSearching,
  lastSearch: state.home.lastSearch,
  filterSelected: state.home.filterSelected,
});

export const FiltersCont = connect(mstp, { handleSearchFilters })(Filters);
