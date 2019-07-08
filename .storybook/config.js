import { configure, addDecorator, addParameters } from '@storybook/react';
import { addReadme } from 'storybook-readme';
import '../themes/default.scss';
import '../stories/style.scss';

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

function loadStories() {
  requireAll(require.context("../stories", true, /\.jsx?$/));
}

addDecorator(addReadme)
addParameters({ 
  options: { panelPosition: 'right' }
})

configure(loadStories, module);
