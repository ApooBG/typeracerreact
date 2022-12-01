import {render, act, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Home from '../Home';
import Try from '../Try';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { shallow } from 'enzyme';

test('test', () => {
    expect(true).toBe(true);
})

it("rendered input", () => {
    const { getByTestId } = render(<Try typeracertext="matti dsad"/>);
    const input = getByTestId("add-word-input");
    expect(input).toBeTruthy();
})

it("get typeracertext", () => {
    const { getByTestId } = render(<Home/>);
    const typeracertext = getByTestId("typeracertext");
    expect(typeracertext.innerHTML).toBe("For the days of my life have vanished like smoke, and my bones are parched like ash, and let all my impurities be as fuel for that fire until nothing remains but the light alone.");
})

/*it("test-input-value-1", async () => {
      const { getByTestId } = render(
        <>
      <Home />
      <Try typeracertext="dsa dsa"/>
      </>
      );
      const input = getByTestId("add-word-input");
      const inputWord = "For";
      userEvent.type(input, 'For')
      const userText = await getByTestId("userText");
      const typeracertext = getByTestId("typeracertext");
      await expect(userText.innerHTML).toBe(inputWord);
    });*/