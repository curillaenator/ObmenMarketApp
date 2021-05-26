import { Form, Field } from "react-final-form";
import styled from "styled-components";
import { useState } from "react";

import { colors } from "../../../Utils/palette";

const FormStyled = styled.form`
  width: 100%;
  height: 56px;
  position: relative;

  & > input {
    width: 100%;
    height: 100%;
    padding-right: 130px;
    border: 0;
    border-bottom: 1px solid #d8d8d8;
    background-color: transparent;
    text-align: left;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: -0.576px;
    color: ${colors.fontGrey};
    outline: none;
  }

  .searchButton {
    display: flex;
    align-items: center;
    position: absolute;
    height: 56px;
    top: 50%;
    left: ${({ isFocused }) => (isFocused ? "calc(100% - 120px)" : 0)};
    padding: ${({ isFocused }) => (isFocused ? "0 16px" : "0px")};
    border: none;
    background-color: transparent;

    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 20px;
    letter-spacing: -0.32px;
    color: ${colors.fontTitle};

    transform: translateY(-50%);
    transition: 0.16s ease-in-out;
    cursor: pointer;
    outline: none;
    z-index: ${({ isFocused }) => (isFocused ? "1" : "-1")};

    & > svg {
      fill: ${colors.fontTitle};
      margin-left: 8px;
    }
    &:hover {
      color: ${colors.primary};
    }
    &:hover > svg {
      fill: ${colors.primary};
    }
    &:active {
      color: ${colors.fontTitle};
    }
    &:active > svg {
      fill: ${colors.fontTitle};
    }
  }
`;

export const Search = ({ icon, ctaSearch }) => {
  const [isFocused, setFocus] = useState(false);

  const onSubmit = (searchData) => ctaSearch({ query: searchData.search });

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form, values }) => {
        const findHandler = (e) => {
          e.preventDefault();
          form.submit();
          form.reset();
          // setFocus(false);
        };

        return (
          <FormStyled onSubmit={handleSubmit} isFocused={isFocused}>
            <Field
              name="search"
              component="input"
              onFocus={() => setFocus(true)}
              onBlur={() => !values.search && setFocus(false)}
            />

            <button
              className="searchButton"
              disabled={!values.search}
              // style={searchButtonPresent}
              onClick={findHandler}
            >
              {isFocused ? "найти" : "Поиск"}
              {isFocused && icon}
            </button>
          </FormStyled>
        );
      }}
    />
  );
};
