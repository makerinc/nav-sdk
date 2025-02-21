import React from 'react';
import './src/types/Window';

window.__MAKER_REACT__ = window.__MAKER_REACT__ || React;

export default window.__MAKER_REACT__;

declare module "react" {
	interface ImgHTMLAttributes<T> extends React.HTMLAttributes<T> {
		fetchpriority?: 'high' | 'low' | 'auto';
	}
}